// src/App.jsx
import React, { useState } from "react";
import LeftNav from "./components/LeftNav";
import Feed from "./components/Feed";
import RightRail from "./components/RightRail";
import Placeholder from "./components/Placeholder";
import Profile from "./components/Profile";
import Experience from "./components/Experience";
import AI from "./components/AI";
import { MessageSquarePlus } from "lucide-react";

function DMButton() {
  return (
    <button
      className="fixed bottom-5 right-5 z-20 rounded-full bg-sky-500 p-4 text-white shadow-lg hover:bg-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
      aria-label="Messages"
    >
      <MessageSquarePlus className="h-5 w-5" />
    </button>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("Profile");

  const renderCenter = () => {
    if (activeTab === "Home") return <Feed />;
    if (activeTab === "Profile") return <Profile />;
    if (activeTab === "Experience") return <Experience />;
    if (activeTab === "AI") return <AI />;
    return <Placeholder title={activeTab} />;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-[1265px] flex gap-0 sm:gap-3">
        <LeftNav activeTab={activeTab} onSelect={setActiveTab} />
        {renderCenter()}
        {/* Conditionally render the RightRail */}
        {activeTab !== "AI" && <RightRail trends={[]} who={[]} />}
      </div>
      <DMButton />
    </div>
  );
}