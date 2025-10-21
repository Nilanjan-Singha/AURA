import { createContext, useContext, useState, useEffect } from "react";
import { movieGenres, animeGenres, mangaGenres, bookGenres, gameGenres } from "../data/genres";

export const TrackerContext = createContext();

export const TrackerProvider = ({ children }) => {
  const [trackers, setTrackers] = useState({
    movie: [],
    anime: [],
    games: [],
    manga: [],
    books: [],
    podcasts: [],
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("trackers");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          setTrackers({
            movie: Array.isArray(parsed.movie) ? parsed.movie : [],
            anime: Array.isArray(parsed.anime) ? parsed.anime : [],
            games: Array.isArray(parsed.games) ? parsed.games : [],
            manga: Array.isArray(parsed.manga) ? parsed.manga : [],
            books: Array.isArray(parsed.books) ? parsed.books : [],
            podcasts: Array.isArray(parsed.podcasts) ? parsed.podcasts : [],
          });
        }
      }
    } catch (e) {
      console.error("Failed to parse trackers:", e);
    }
  }, []);

  // Save to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem("trackers", JSON.stringify(trackers));
    } catch (e) {
      console.error("Failed to save trackers:", e);
    }
  }, [trackers]);

  // Add new item
  const addItem = (type, item) => {
    const newItem = {
      ...item,
      id: item.id ?? Date.now(),
      status: item.status ?? "Upcoming",
      favourite: typeof item.favourite === "boolean" ? item.favourite : false,
    };

    setTrackers((prev) => ({
      ...prev,
      [type]: [...(Array.isArray(prev[type]) ? prev[type] : []), newItem],
    }));
  };

  
const updateItemStatus = (type, id, newStatus) => {
  setTrackers(prev => {
    const updated = {
      ...prev,
      [type]: prev[type].map(item =>
        item.id === id ? { ...item, status: newStatus } : item
      ),
    };
    localStorage.setItem("trackers", JSON.stringify(updated));
    return updated;
  });
};

const toggleFavourite = (type, id) => {
  setTrackers(prev => {
    const updated = {
      ...prev,
      [type]: prev[type].map(item =>
        item.id === id ? { ...item, favourite: !item.favourite } : item
      ),
    };
    localStorage.setItem("trackers", JSON.stringify(updated));
    return updated;
  });
};

  // Get genres by tracker type
  const getGenres = (type) => {
    switch (type) {
      case "movie":
        return movieGenres;
      case "anime":
        return animeGenres;
      case "manga":
        return mangaGenres;
      case "books":
        return bookGenres;
      case "games":
        return gameGenres;
      default:
        return [];
    }
  };

  return (
    <TrackerContext.Provider
      value={{
        trackers,
        addItem,
        getGenres,
        updateItemStatus,
        toggleFavourite,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
};

export const useTracker = () => useContext(TrackerContext);
