import React, { useState } from "react";
import { X } from "lucide-react";

const Account = ({onClose, handleSave, setPrimaryUse, setUsername, username, primaryUse}) => {

    // Future: Save to context or backend here

  return (
<div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-black/90 border border-gray-700 shadow-xl p-6 rounded-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <X
          className="h-6 w-6 absolute top-4 right-4 cursor-pointer hover:text-red-500"
          onClick={onClose}
        />

        <h2 className="text-xl font-semibold mb-6 text-white text-center">
          Account Setup
        </h2>

        {/* Username */}
        <label className="text-sm text-gray-300">Account Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 mt-1 mb-4 bg-black/50 border border-gray-600 rounded-lg text-white 
          focus:outline-none focus:border-blue-400"
          placeholder="Enter your name..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Primary Use */}
        <label className="text-sm text-gray-300">Primary Use</label>
        <select
          className="w-full px-3 py-2 mt-1 mb-6 bg-black/50 border border-gray-600 rounded-lg text-white 
          focus:outline-none focus:border-blue-400"
          value={primaryUse}
          onChange={(e) => setPrimaryUse(e.target.value)}
        >
          <option value="">Choose...</option>
          <option value="media">Media</option>
          <option value="utility">Utility</option>
          <option value="personal">Personal</option>
        </select>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Account;
