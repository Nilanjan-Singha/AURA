import { createContext, useContext, useState, useEffect } from "react";
import { movieGenres, animeGenres, mangaGenres, bookGenres, gameGenres, contactFilters, financeFilters, subscriptionFilters, applicationFilters, passwordFilters } from "../data/genres";

export const TrackerContext = createContext();

export const TrackerProvider = ({ children }) => {

  // account personalising
    const [username, setUsername] = useState("");
    const [primaryUse, setPrimaryUse] = useState("");
  
  // trackers
  const [trackers, setTrackers] = useState({
    // media
    movies: [],
    anime: [],
    games: [],
    manga: [],
    books: [],
    podcasts: [],
    // utilities
    contacts:[],
    finance:[],
    subscriptions:[],
    applications:[],
    passwords:[]
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
            contacts: Array.isArray(parsed.contacts) ? parsed.contacts : [],
            finance: Array.isArray(parsed.finance) ? parsed.finance : [],
            subscriptions: Array.isArray(parsed.subscriptions) ? parsed.subscriptions : [],
            applications: Array.isArray(parsed.applications) ? parsed.applications : [],
            passwords: Array.isArray(parsed.passwords) ? parsed.passwords : [],
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
    // always store genres as an array
    genres: Array.isArray(item.genres)
      ? item.genres
      : item.genre
      ? item.genre.split(",").map(g => g.trim())
      : // fallback for utilities:
        item.category
        ? [item.category]
        : [],
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
      case "contacts":
        return contactFilters;
      case "finance":
        return financeFilters;
      case "subscriptions":
        return subscriptionFilters;
      case "applications":
        return applicationFilters;
      case "passwords":
        return passwordFilters;
      default:
        return [];
    }
  };
  // filtering by genres
    const [selectedGenres, setSelectedGenres] = useState([]);

  return (
    <TrackerContext.Provider
      value={{
        username,
        primaryUse,
        setUsername,
        setPrimaryUse,
        trackers,
        addItem,
        getGenres,
        updateItemStatus,
        toggleFavourite,
        selectedGenres,
        setSelectedGenres
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
};

export const useTracker = () => useContext(TrackerContext);
