import React from "react";
import { X } from "lucide-react";

const themes = [
  {
    name: "Dark+",
    gradient: "bg-gradient-to-br from-[#1E1E1E] to-[#252526]",
    accent: "#0A84FF",
    text: "#FFFFFF",
  },
  {
    name: "Emerald Drift", // Greenish
    gradient: "bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]",
    accent: "#00FF9C",
    text: "#E8FDF5",
  },
  {
    name: "Neo Terminal", // Hacker/Terminal vibe
    gradient: "bg-gradient-to-br from-[#000000] to-[#1A1A1A]",
    accent: "#00FF00",
    text: "#E0FFE0",
  },
  {
    name: "Crimson Void", // Deep muted red
    gradient: "bg-gradient-to-br from-[#1A0000] to-[#3C0000]",
    accent: "#FF3B3B",
    text: "#FDECEC",
  },
  {
    name: "Rosette Bloom", // Dusty rose & mauve dark mode
    gradient: "bg-gradient-to-br from-[#2B0E1C] to-[#4B1A2F]",
    accent: "#FF69B4",
    text: "#F9D6E5",
  },
  {
    name: "Abyssal Tide", // Deep ocean
    gradient: "bg-gradient-to-br from-[#00111A] to-[#002B36]",
    accent: "#00C8FF",
    text: "#DFF8FF",
  },
  {
    name: "Violet Eclipse", // Elegant dark purple
    gradient: "bg-gradient-to-br from-[#1A102B] to-[#2A0C3C]",
    accent: "#C58CFF",
    text: "#F0E8FF",
  },
  {
    name: "Solar Ember", // Burnt orange + deep charcoal
    gradient: "bg-gradient-to-br from-[#1F0A00] to-[#3C1A00]",
    accent: "#FFB347",
    text: "#FFF3E2",
  },

  {
    name: "Dracula",
    gradient: "bg-gradient-to-br from-[#282A36] to-[#44475A]",
    accent: "#BD93F9",
    text: "#F8F8F2",
  },
  {
    name: "One Dark Pro",
    gradient: "bg-gradient-to-br from-[#282C34] to-[#21252B]",
    accent: "#61AFEF",
    text: "#ABB2BF",
  },
  {
    name: "Monokai",
    gradient: "bg-gradient-to-br from-[#272822] to-[#3E3D32]",
    accent: "#F92672",
    text: "#F8F8F2",
  },
  {
    name: "Night Owl",
    gradient: "bg-gradient-to-br from-[#011627] to-[#0B2942]",
    accent: "#82AAFF",
    text: "#D6DEEB",
  },
  {
    name: "SynthWave '84",
    gradient: "bg-gradient-to-br from-[#2B213A] to-[#3A1C71]",
    accent: "#FF6EC7",
    text: "#E5E5E5",
  },
];


const ThemeModal = ({ onClose, setTheme }) => {
  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-black/90 border border-gray-700 shadow-xl p-6 rounded-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <X
          className="h-6 w-6 absolute top-4 right-4 cursor-pointer hover:text-red-500"
          onClick={onClose}
        />
        <h2 className="text-xl font-semibold mb-6 text-white text-center">Choose Your Theme</h2>

        <div className="grid grid-cols-3 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => {
                setTheme(theme);
                onClose();
              }}
              className={`relative flex flex-col items-center gap-2`}
            >
                            <div
                className={`w-16 h-16 rounded-full ${theme.gradient} border-2 border-white/20 shadow-md hover:scale-110 transition-transform`}
                style={{ boxShadow: `0 0 10px ${theme.accent}` }}
              />
              <span
                className="text-sm font-medium"
                style={{ color: theme.text }}
              >
                {theme.name}
              </span>

            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeModal;
