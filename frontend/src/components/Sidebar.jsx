import React, { useState, useContext } from "react";
import { Menu, X, Star, BarChart2, List, Settings } from "lucide-react";
import { TrackerContext } from "../context/Context";
import { useTheme } from "../context/ThemeContext";
import { useEffect } from "react";

const Sidebar = ({ type, handleStatModal }) => {
  const { getGenres, selectedGenres, setSelectedGenres } = useContext(TrackerContext);
  const genres = getGenres(type);

  const [open, setOpen] = useState(false);
  const {theme} = useTheme()

  const colorMap = {
    movie: "bg-blue-400",
    anime: "bg-green-400",
    manga: "bg-red-400",
    books: "bg-yellow-400",
    games: "bg-purple-400",
  };

    useEffect(() => {
    console.log("Sidebar → selectedGenres updated:", selectedGenres);
  }, [selectedGenres]);


  const handleGenreClick = (g) => {
  if (selectedGenres.includes(g)) {
    setSelectedGenres(selectedGenres.filter(x => x !== g));
  } else {
    setSelectedGenres([...selectedGenres, g]);
  }
};


  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setOpen(true)}
        className="sm:hidden fixed top-4 left-4 z-50 bg-black/70 text-white p-2 rounded-md backdrop-blur-sm" style={{ color: theme.text }}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 sm:hidden" style={{ color: theme.text }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 p-8 sm:p-0 mt-8 sm:mt-0 text-white z-50 transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          sm:static sm:translate-x-0 sm:w-1/5 sm:border-r sm:h-auto sm:flex sm:flex-col sm:justify-between sm:p-4
        `}
        style={{ color: theme.text } } 
      >
        {/* Close button (mobile) */}
        <div className="flex justify-between items-center sm:hidden p-4 border-b border-gray-700">
          <h1 className="text-lg font-semibold capitalize">{type} Genres</h1>
          <X className="h-6 w-6 cursor-pointer" onClick={() => setOpen(false)} />
        </div>

        {/* Sidebar Content */}
        <div className="p-4 sm:p-0" style={{ color: theme.text }}>
          <h1 className="text-lg font-semibold mb-2 hidden sm:block">Genres</h1>
          <hr className="border-gray-700 mb-4 hidden sm:block" />

          <ul className="space-y-1">
{genres.map((genre) => {
  const active = selectedGenres.includes(genre);

  return (
    <li
      key={genre}
      onClick={() => handleGenreClick(genre)}
      className={`flex items-center gap-2 py-2 px-2 rounded cursor-pointer transition-colors
        ${active ? "bg-gray-900 text-white font-medium" : "hover:bg-gray-800"}
      `}
    >
      <span
        className={`w-3 h-3 rounded-full transition-all
          ${active ? colorMap[type] : "bg-gray-500"}
        `}
      />
      {genre}
    </li>
  );
})}

          </ul>

          {/* Personal Section */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Personal</h2>
            <hr className="border-gray-700 mb-3" />
            <ul className="space-y-1">
              <li className="flex items-center gap-2 py-2 px-2 rounded hover:bg-gray-800 cursor-pointer">
                <Star className="w-4 h-4 text-yellow-400"  /> Favourites
              </li>
              <li className="flex items-center gap-2 py-2 px-2 rounded hover:bg-gray-800 cursor-pointer"  onClick={() => handleStatModal(type)} >
                <BarChart2 className="w-4 h-4 text-blue-400"/> Stats
              </li>
              <li className="flex items-center gap-2 py-2 px-2 rounded hover:bg-gray-800 cursor-pointer">
                <List className="w-4 h-4 text-green-400" /> Watchlist
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Settings */}
        <div className="flex items-center mt-20 gap-2 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors p-4 sm:p-0">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
