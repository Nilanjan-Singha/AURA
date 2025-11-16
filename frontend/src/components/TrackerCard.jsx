import React from "react";
import { useTheme } from "../context/ThemeContext";

const TrackerCard = ({ tracker, onClick }) => {
  const { theme } = useTheme();

  return (
    <div
      onClick={() => onClick(tracker.id)}
      className={`cursor-pointer h-45 rounded-2xl p-4 
        bg-gradient-to-br ${tracker.color} 
        border border-gray-700 
        hover:border-[${theme.accent}] 
        hover:scale-105 
        transition-transform duration-300`}
      style={{
        color: theme.text,
        boxShadow: `0 4px 10px ${theme.accent}33`,
      }}
    >
      <div className="text-4xl mb-3">{tracker.emoji}</div>
      <h2
        className="text-lg font-semibold"
        style={{ color: theme.accent }}
      >
        {tracker.name}
      </h2>
      <p className="text-sm mt-1 opacity-80">
        Track your {tracker.id} progress ✨
      </p>
    </div>
  );
};

export default TrackerCard;
