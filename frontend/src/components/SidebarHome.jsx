import React, { useState } from "react";
import { User, Bookmark, CheckSquare, Settings, Menu, X } from "lucide-react";

const SidebarHome = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Menu Icon for mobile */}
      <button 
        onClick={toggleSidebar} 
        className="lg:hidden fixed top-4 left-4 z-50 text-white hover:text-gray-300"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* /* Overlay for mobile */} 
        {isOpen && (
          <div 
            className="fixed max-w-lg inset-0 backdrop-blur-sm bg-black/50 z-40 lg:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
      <aside className={`
        fixed lg:relative
        w-64  backdrop-blur-sm border-r border-gray-800 
        h-screen p-6 flex flex-col justify-between
        z-50 transition-all duration-300 ease-in-out
        ${isOpen ? 'left-0' : '-left-64'} 
        lg:left-0
      `}>
        <div>
          <div className="flex items-center gap-3 mb-8">
            <img
              src="/profile_.png"
              alt="Profile"
              className="w-10 h-10 rounded-full border border-gray-700"
            />
            <div>
              <h3 className="text-lg font-semibold text-white">Nilanjan </h3>
            </div>
          </div>

          <nav className="flex flex-col gap-3 text-gray-300">
            <button className="flex items-center gap-2 hover:text-white">
              <CheckSquare className="w-4 h-4" /> Themes
            </button>
            <button className="flex items-center gap-2 hover:text-white">
              <Bookmark className="w-4 h-4" /> Insights
            </button>
            <button className="flex items-center gap-2 hover:text-white">
              <User className="w-4 h-4" /> Account
            </button>
            <button className="flex items-center gap-2 hover:text-white">
              <Settings className="w-4 h-4" /> Settings
            </button>
          </nav>
        </div>

        <p className="text-xs text-gray-500 text-center">
          ✨ Aura v1 — Built with love
        </p>
      </aside>
    </>
  );
};

export default SidebarHome;