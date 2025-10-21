import React from "react";
import { useState, useRef, useEffect } from "react";

const Card = ( {item, onSetStatus, onToggleFavourite}) => {
  const { id, title, poster, rating, favourite } = item;
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);

    // show custom context menu
  const handleContextMenu = (e) => {
    e.preventDefault();
    // notify other cards so they can close their menus
    window.dispatchEvent(new CustomEvent('open-context-menu', { detail: { id } }));
    setMenuPos({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
  };

  // close when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuVisible(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const handleAction = (action) => {
    setMenuVisible(false);
    if (action === "Favourite") {
      onToggleFavourite?.(id);
    } else {
      onSetStatus?.(id, action);
    }
  };

   // listen for other cards opening — close this menu if another card opened
  useEffect(() => {
    const handleOpenEvent = (e) => {
      if (!e?.detail) return;
      if (e.detail.id !== id) {
        setMenuVisible(false);
      }
    };
    window.addEventListener('open-context-menu', handleOpenEvent);
    return () => window.removeEventListener('open-context-menu', handleOpenEvent);
  }, [id]);

  return (
    <div className="group relative w-auto border border-gray-500 rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer" onContextMenu={handleContextMenu}>
      {/* Movie Image */}
      <div className="absolute top-2 left-2 bg-white/80 text-black text-xs px-2 py-1 rounded">
  {item.status}
</div>
      <img
        src={poster}
        alt={title}
        className="w-full h-auto sm:h-60 object-cover rounded-xl"
      />

      {/* Hover Overlay */}
      <div
        className="
          absolute inset-0 
          flex flex-col items-center justify-center
          bg-black/0 
          group-hover:bg-black/60 
          transition-colors duration-300
        "
      >
        <div
          className="
            text-white text-center 
            opacity-0 group-hover:opacity-100 
            transition-opacity duration-300
          "
        >
          <h3 className="font-semibold text-lg">{title}</h3>
          <div className="mt-2 flex justify-center items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1">{rating}</span>
          </div>
        </div>
      </div>

      {/* Custom Context Menu */}
      {menuVisible && (
        <div
          ref={menuRef}
          style={{ top: menuPos.y, left: menuPos.x }}
          className="fixed z-50 bg-white text-black rounded shadow-md overflow-hidden"
        >
          <button className="block px-4 py-2 w-full text-left hover:bg-gray-100" onClick={() => handleAction('Watching')}>Set Watching</button>
          <button className="block px-4 py-2 w-full text-left hover:bg-gray-100" onClick={() => handleAction('Upcoming')}>Set Upcoming</button>
          <button className="block px-4 py-2 w-full text-left hover:bg-gray-100" onClick={() => handleAction('Completed')}>Set Completed</button>
          <button className="block px-4 py-2 w-full text-left hover:bg-gray-100" onClick={() => handleAction('Favourite')}>{favourite ? 'Unfavourite' : 'Mark Favourite'}</button>
        </div>
      )}

    </div>
  );
};

export default Card;
