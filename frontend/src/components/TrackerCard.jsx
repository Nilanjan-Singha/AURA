import React from "react";

const TrackerCard = ({ tracker, onClick }) => (
  <div
    onClick={() => onClick(tracker.id)}
    className={`cursor-pointer h-45  rounded-2xl  p-4 bg-gradient-to-br ${tracker.color} border border-gray-700 hover:border-blue-400 hover:scale-105 transition-transform duration-300`}
  >
    <div className="text-4xl mb-3">{tracker.emoji}</div>
    <h2 className="text-lg font-semibold">{tracker.name}</h2>
    <p className="text-gray-400 text-sm mt-1">
      Track your {tracker.id} progress ✨
    </p>
  </div>
);

export default TrackerCard;
