import React, { useState, useContext } from "react";
import { Menu, X, Star, BarChart2, List, Settings } from "lucide-react";
import { TrackerContext } from "../context/Context";

const Sidebar = ({ type }) => {
  const { getGenres } = useContext(TrackerContext);
  const genres = getGenres(type);

  const [open, setOpen] = useState(false);

  const colorMap = {
    movie: "bg-blue-400",
    anime: "bg-green-400",
    manga: "bg-red-400",
    books: "bg-yellow-400",
    games: "bg-purple-400",
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setOpen(true)}
        className="sm:hidden fixed top-4 left-4 z-50 bg-black/70 text-white p-2 rounded-md backdrop-blur-sm"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 sm:hidden"
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
      >
        {/* Close button (mobile) */}
        <div className="flex justify-between items-center sm:hidden p-4 border-b border-gray-700">
          <h1 className="text-lg font-semibold capitalize">{type} Genres</h1>
          <X className="h-6 w-6 cursor-pointer" onClick={() => setOpen(false)} />
        </div>

        {/* Sidebar Content */}
        <div className="p-4 sm:p-0">
          <h1 className="text-lg font-semibold mb-2 hidden sm:block">Genres</h1>
          <hr className="border-gray-700 mb-4 hidden sm:block" />

          <ul className="space-y-1">
            {genres.map((genre) => (
              <li
                key={genre}
                className="flex items-center gap-2 py-2 px-2  sm:bg-auto rounded hover:bg-white sm:hover:bg-gray-800 cursor-pointer transition-colors"
              >
                <span className={`w-3 h-3 rounded-full ${colorMap[type]}`} />
                {genre}
              </li>
            ))}
          </ul>

          {/* Personal Section */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Personal</h2>
            <hr className="border-gray-700 mb-3" />
            <ul className="space-y-1">
              <li className="flex items-center gap-2 py-2 px-2 rounded hover:bg-gray-800 cursor-pointer">
                <Star className="w-4 h-4 text-yellow-400" /> Favourites
              </li>
              <li className="flex items-center gap-2 py-2 px-2 rounded hover:bg-gray-800 cursor-pointer">
                <BarChart2 className="w-4 h-4 text-blue-400" /> Stats
              </li>
              <li className="flex items-center gap-2 py-2 px-2 rounded hover:bg-gray-800 cursor-pointer">
                <List className="w-4 h-4 text-green-400" /> Watchlist
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Settings */}
        <div className="flex items-center gap-2 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors p-4 sm:p-0">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
