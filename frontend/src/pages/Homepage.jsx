import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import SidebarHome from "../components/SidebarHome";
import TrackerCard from "../components/TrackerCard";

const trackers = [
  { id: "movie", name: "Movies", emoji: "🎬", color: "from-blue-500/30 to-blue-700/20" },
  { id: "anime", name: "Anime", emoji: "🌀", color: "from-purple-500/30 to-purple-700/20" },
  { id: "manga", name: "Manga", emoji: "📚", color: "from-green-500/30 to-green-700/20" },
  { id: "books", name: "Books", emoji: "📖", color: "from-yellow-500/30 to-yellow-700/20" },
  {id: "games", name: "Games", emoji: "🎮", color: "from-orange-500/30 to-orange-700/20" },
  { id: "podcasts", name: "Podcasts", emoji: "🎧", color: "from-pink-500/30 to-pink-700/20" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const handleOpenTracker = (type) => navigate(`/tracker/${type}`);

  return (
    <div className="home m-0 sm:m-8 flex bg-[rgba(255, 255, 255, 0.87)] w-auto text-white min-h-screen">
      <SidebarHome />

      <main className="flex-1 overflow-y-auto">
        {/* Banner */}
        <div className="relative w-full h-40 sm:h-60 rounded-lg">
          <img
            src="/banner1.jpg"
            alt="Banner"
            className="w-full h-full object-cover opacity-70 rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-[rgba(255, 255, 255, 0.87)]">
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">NILANJAN SINGHA</h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl md:text-2xl font-semibold">Your Trackers</h2>
            <button className="flex items-center gap-2 bg-black/10 px-4 py-2 rounded-xl hover:bg-blue-700 transition">
              <Plus className="w-4 h-4" /> Add New
            </button>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trackers.map((tracker) => (
              <TrackerCard
                key={tracker.id}
                tracker={tracker}
                onClick={handleOpenTracker}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
