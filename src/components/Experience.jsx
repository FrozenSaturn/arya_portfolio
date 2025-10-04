// src/components/Experience.jsx
import React from "react";
import { Briefcase, Calendar, Building, Zap, Code } from "lucide-react";

const experienceData = [
  {
    role: "AI Intern",
    company: "Santiniketan Enterprises(SantEnt)",
    duration: "July 2025 – Present",
    description: [
      "Automated 50% of the manual work with the use of agentic AI frameworks.",
      "Developed a chatbot where users can upload complex PDFs in a Streamlit UI, and it logs into a Spreadsheet.",
      "Deployed everything using Google Cloud Platform.",
    ],
    tags: ["Python", "N8N", "LangChain", "LangGraph", "Gemini API", "Docling", "LlamaIndex"],
  },
  {
    role: "AI Intern",
    company: "CollegeTips.in",
    duration: "May 2025 – June 2025",
    description: [
      "Deployed an AI chatbot for a digital literacy initiative, resulting in the onboarding of 50+ elderly individuals.",
      "Leveraged React Native for mobile app development. Utilised Google TTS API for text-to-speech.",
      "Created a full-stack website for a pet-friendly city campaign, gaining and handling 100+ users in a week.",
    ],
    tags: ["React", "Node.js", "MongoDB", "REST API", "OpenAI API"],
  },
  {
    role: "Lead Developer",
    company: "Academic Research & Development",
    duration: "Jan 2025 – Apr 2025",
    description: [
      "Led the development of a sentiment-aware reinforcement learning trading agent in a span of a college semester.",
      "Finetuned FinBERT for better sentiment analysis and achieved a 24% and 34% improvement in the Sharpe Ratio and Sortino Ratio.",
      "Prepared a comprehensive 50-page documentation and analytical insights that serve as a reference for future research.",
    ],
    tags: ["FinBERT", "Streamlit", "yFinance", "Random Forest", "scikit-learn"],
  },
];

const ExperienceCard = ({ role, company, duration, description, tags }) => (
  <div className="relative pl-8 sm:pl-12 py-6 group">
    {/* Vertical line */}
    <div className="absolute top-0 left-0 h-full w-0.5 bg-zinc-700/50 group-hover:bg-sky-500 transition-colors duration-300"></div>
    {/* Dot */}
    <div className="absolute top-8 -left-[9px] h-5 w-5 rounded-full bg-zinc-800 border-2 border-zinc-600 group-hover:border-sky-500 transition-colors duration-300"></div>

    <div className="p-4 rounded-lg bg-zinc-900/50 border border-transparent group-hover:border-sky-500/30 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <Building className="h-5 w-5 text-sky-400" />
        <h3 className="text-lg font-bold text-white">{role}</h3>
      </div>
      <div className="mt-1 flex items-center gap-4 text-sm text-zinc-400">
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          <span>{company}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{duration}</span>
        </div>
      </div>
      <ul className="mt-4 space-y-2 list-disc list-inside text-zinc-300">
        {description.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs font-semibold rounded-full bg-sky-500/10 text-sky-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default function Experience() {
  return (
    <main className="min-w-0 flex-1 border-x border-white/10">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 backdrop-blur bg-zinc-950/80 border-b border-white/10">
        <div className="px-4 py-3 text-xl font-extrabold flex items-center gap-3">
          <Zap className="h-6 w-6 text-sky-400" />
          <span>My Experience</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="p-4 sm:p-6">
        {experienceData.map((exp, index) => (
          <ExperienceCard key={index} {...exp} />
        ))}
      </div>
    </main>
  );
}