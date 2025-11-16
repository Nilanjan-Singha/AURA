import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      // Ensure proper JSON parsing
      return saved && saved.startsWith("{")
        ? JSON.parse(saved)
        : {
            gradient: "bg-gradient-to-br from-[#1E1E1E] to-[#252526]",
            accent: "#0A84FF",
            text: "#FFFFFF",
          };
    } catch (e) {
      console.error("Failed to parse theme from localStorage:", e);
      return {
        gradient: "bg-gradient-to-br from-[#1E1E1E] to-[#252526]",
        accent: "#0A84FF",
        text: "#FFFFFF",
      };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("theme", JSON.stringify(theme));
    } catch (e) {
      console.error("Failed to save theme:", e);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
