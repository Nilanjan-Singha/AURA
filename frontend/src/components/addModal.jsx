import React, { useState } from "react";
import { X, Search, Plus } from "lucide-react";
import { useAPI } from "../context/ApiContext";
import { useTheme } from "../context/ThemeContext";

const AddModal = ({ type, handleClose, handleAddItem }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const {theme} = useTheme();

  const { searchMovies, getMovieDetails, searchAnime, searchManga , searchBooks, searchGames} = useAPI();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      let res = [];
      if (type === "movie") res = await searchMovies(query);
      if (type === "anime") res = await searchAnime(query);
      if (type === "manga") res = await searchManga(query);
      if (type === "books") res = await searchBooks(query);
      if (type === "games") res = await searchGames(query);
      setResults(res);
      // console.log("Search results:", res);
    } catch (err) {
      console.error("Search failed:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

const handleSelect = async (item) => {
  let newItem = {};

  if (type === "movie") {
    const full = await getMovieDetails(item.imdbID);
    newItem = {
      id: full.imdbID,
      title: full.Title,
      poster: full.Poster !== "N/A" ? full.Poster : "/placeholder.png",
      rating: parseFloat(full.imdbRating) || 0,
      genres: full.Genre ? full.Genre.split(",").map(g => g.trim()) : [],
      year: full.Year,
      status: "Upcoming",
      favourite: false,
    };
  } else if (type === "anime" || type === "manga") {
    newItem = {
      id: item.node.id,
      title: item.node.title,
      poster: item.node.main_picture?.medium || "/placeholder.png",
      rating: item.node.mean || 0,
      genres: Array.isArray(item.node.genres)
        ? item.node.genres.map(g => g.name)
        : [],
      status: "Upcoming",
      favourite: false,
    };
  } else if (type === "books") {
    newItem = {
      id: item.id,
      title: item.volumeInfo.title,
      poster: item.volumeInfo.imageLinks?.thumbnail || "/placeholder.png",
      rating: item.volumeInfo.averageRating || 0,
      genres: item.volumeInfo.categories || [],
      authors: item.volumeInfo.authors,
      publishedDate: item.volumeInfo.publishedDate,
      description: item.volumeInfo.description,
      status: "Upcoming",
      favourite: false,
    };
  } else if (type === "games") {
    newItem = {
      id: item.id,
      title: item.name,
      poster: item.background_image || "/placeholder.png",
      rating: item.rating || 0,
      genres: item.genres?.map(g => g.name) || [],
      releaseDate: item.released,
      platforms: item.platforms?.map(p => p.platform.name) || [],
      status: "Upcoming",
      favourite: false,
    };
  }

  handleAddItem(newItem);
  handleClose();
};

// Custom form submit
const handleCustomSubmit = (e) => {
  e.preventDefault();
  const title = e.target.title.value.trim();
  const poster = e.target.poster.value.trim();
  const rating = parseFloat(e.target.rating.value) || 0;

  if (!title) return;

  handleAddItem({
    id: Date.now(),
    title,
    poster: poster || "/placeholder.png",
    rating,
    genres: ["Custom"],
    status: "Upcoming",
    favourite: false,
  });
  handleClose();
};


  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50" >
<div className="relative border border-gray-700 shadow-xl p-6 rounded-2xl w-full max-w-md" style={{ background: theme.gradient }}
>
        <X className="h-6 w-6 absolute top-4 right-4 cursor-pointer hover:text-red-500" onClick={handleClose} />
        <h2 className="text-xl font-semibold mb-4 text-white">Add New {type}</h2>

        <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${type}...`}
              className="w-full border border-gray-700 bg-black/70 focus:ring-2 focus:ring-blue-400 p-2 rounded-lg outline-none text-white"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Search</button>
        </form>

        {loading && <p className="text-gray-400 mb-3">Searching...</p>}

        {results.length > 0 && (
          <ul className="rounded-lg max-h-48 overflow-y-auto mb-4 bg-black/60 border border-gray-700">
            {results.map((item, i) => (
               <li
    key={type === "movie" ? item.imdbID : (type === "books" ? item.id : (type === "games" ? item.id : item.node.id))}
    onClick={() => handleSelect(item)}
    className="p-2 flex items-center gap-3 hover:bg-gray-800 cursor-pointer transition-colors"
  >
    <img
      src={
        type === "movie" 
          ? (item.Poster !== "N/A" ? item.Poster : "/placeholder.png")
          : type === "books"
          ? (item.volumeInfo.imageLinks?.thumbnail || "/placeholder.png")
          : type === "games"
          ? (item.background_image || "/placeholder.png")
          : (item.node.main_picture?.medium || "/placeholder.png")
      }
      alt={
        type === "movie" 
          ? item.Title 
          : type === "books"
          ? item.volumeInfo.title
          : type === "games"
          ? item.name
          : item.node.title
      }
      className="w-8 h-10 object-cover rounded"
    />
    <div>
      <p className="font-medium text-white">
        {type === "movie" 
          ? item.Title 
          : type === "books"
          ? item.volumeInfo.title
          : type === "games"
          ? item.name
          : item.node.title}
      </p>
      <p className="text-sm text-gray-400">
        {type === "books" && item.volumeInfo.authors 
          ? item.volumeInfo.authors.join(', ')
          : type === "movie"
          ? item.Year
          : type === "games"
          ? item.released : ""}
      </p>
    </div>
  </li>

            ))}
          </ul>
        )}

        {!showCustomForm && (
          <button
            onClick={() => setShowCustomForm(true)}
            className="flex items-center gap-2 mt-3 text-blue-400 font-medium hover:text-blue-500"
          >
            <Plus className="w-4 h-4" /> Add Custom {type}
          </button>
        )}

        {showCustomForm && (
          <form onSubmit={handleCustomSubmit} className="flex flex-col gap-3 mt-4">
            <input name="title" type="text" placeholder={`${type} Title`} className="border border-gray-700 bg-black/70 p-2 rounded-lg text-white" />
            <input name="poster" type="text" placeholder="Poster URL" className="border border-gray-700 bg-black/70 p-2 rounded-lg text-white" />
            <input name="rating" type="number" placeholder="Rating (0-10)" className="border border-gray-700 bg-black/70 p-2 rounded-lg text-white" />
            <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">Add Custom {type}</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddModal;
