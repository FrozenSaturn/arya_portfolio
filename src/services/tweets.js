import { supabase } from '../lib/supabaseClient';

function shortDate(iso) {
  if (!iso) return 'now';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function fmtViews(n) {
  if (n == null) return '0';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return String(n);
}

function mapRow(r) {
  return {
    id: r.id,
    author: {
      name: r.author_name,
      handle: r.author_handle,
      verified: r.author_verified
    },
    time: shortDate(r.created_at),
    text: r.text,
    media: r.media_kind ? { kind: r.media_kind, src: r.media_src } : null,
    stats: {
      replies: r.replies_count ?? 0,
      reposts: r.reposts_count ?? 0,
      likes: r.likes_count ?? 0,
      views: fmtViews(r.views_count ?? 0)
    },
    links: (r.tweet_links || []).map(l => ({
      title: l.title,
      url: l.url,
      desc: l.desc,
      domain: l.domain
    }))
  };
}

const baseSelect =
  'id, created_at, author_name, author_handle, author_verified, text, media_kind, media_src, likes_count, replies_count, reposts_count, views_count, tweet_links (title, url, desc, domain)';

async function fetchTweetById(id) {
  const { data, error } = await supabase
    .from('tweets')
    .select(baseSelect)
    .eq('id', id)
    .single();
  if (error) throw error;
  return mapRow(data);
}

export async function fetchTweets() {
  const { data, error } = await supabase
    .from('tweets')
    .select(baseSelect)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('fetchTweets error', error);
    return [];
  }
  return (data || []).map(mapRow);
}

export async function createTweet(text, profile) {
  const payload = {
    author_name: profile.name,
    author_handle: profile.handle,
    author_verified: !!profile.verified,
    text
  };

  const { data, error } = await supabase
    .from('tweets')
    .insert([payload])
    .select('id, created_at, author_name, author_handle, author_verified, text, media_kind, media_src, likes_count, replies_count, reposts_count, views_count')
    .single();

  if (error) {
    console.error('createTweet error', error);
    throw error;
  }
  return mapRow({ ...data, tweet_links: [] });
}

export async function likeTweet(id, delta = 1) {
  const { error } = await supabase.rpc('increment_likes', {
    p_tweet_id: id,
    p_step: delta
  });
  if (error) throw error;
  return fetchTweetById(id);
}

export async function repostTweet(id, delta = 1) {
  const { error } = await supabase.rpc('increment_reposts', {
    p_tweet_id: id,
    p_step: delta
  });
  if (error) throw error;
  return fetchTweetById(id);
}

export async function incrementView(id, delta = 1) {
  const { error } = await supabase.rpc('increment_views', {
    p_tweet_id: id,
    p_step: delta
  });
  if (error) throw error;
  return fetchTweetById(id);
}

export async function addComment(tweetId, text, profile) {
  const payload = {
    tweet_id: tweetId,
    author_name: profile.name,
    author_handle: profile.handle,
    author_verified: !!profile.verified,
    text
  };
  const { error } = await supabase.from('comments').insert([payload]);
  if (error) {
    console.error('addComment error', error);
    throw error;
  }
  // trigger updates replies_count; fetch updated tweet
  return fetchTweetById(tweetId);
}