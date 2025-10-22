import React, { createContext, useContext } from "react";

const APIContext = createContext();

export const useAPI = () => useContext(APIContext);

export const APIProvider = ({ children }) => {
  const BASE_URL = process.env.NODE_ENV === "production"
  ? "https://aura-kl34.onrender.com"
  : "http://localhost:4000";

  // 🔹 Movie search (OMDb)
  const searchMovies = async (query) => {
    if (!query) return [];
    const res = await fetch(`${BASE_URL}/movies?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.Search || [];
  };

  // 🔹 Movie details (OMDb)
  const getMovieDetails = async (id) => {
    const res = await fetch(`${BASE_URL}/movies/${id}`);
    return await res.json();
  };

  // 🔹 Anime search (MyAnimeList)
  const searchAnime = async (query, limit = 10) => {
    if (!query) return [];
    const res = await fetch(`${BASE_URL}/anime?q=${encodeURIComponent(query)}&limit=${limit}`);
    const data = await res.json();
    return data.data || [];
  };

  // 🔹 Manga search (MyAnimeList)
  const searchManga = async (query, limit = 10) => {
    if (!query) return [];
    const res = await fetch(`${BASE_URL}/manga?q=${encodeURIComponent(query)}&limit=${limit}`);
    const data = await res.json();
    return data.data || [];
  };

 // 🔹 Book search (Google Books)
  const searchBooks = async (query) => {
    if (!query) return [];
    try {
      const response = await fetch(
        `${BASE_URL}/books?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Failed to search books:', error);
      return [];
    }
  };

// Game Search (RAWG)
const searchGames = async (query) => {
  if (!query) return [];
  try {
    const response = await fetch(
      `${BASE_URL}/games?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error("Failed to fetch games");
    const data = await response.json();
    console.log("searchGames data:", data); // debug
    return data || []; // RAWG backend returns array directly
  } catch (error) {
    console.error('Failed to search games:', error);
    return [];
  }
};


  return (
    <APIContext.Provider
      value={{
        searchMovies,
        getMovieDetails,
        searchAnime,
        searchManga,
        searchBooks,
        searchGames,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};
