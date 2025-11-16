import React, { useState } from "react";
import { User, Bookmark, CheckSquare, Settings, Menu, X } from "lucide-react";
import ThemeModal from "./themeModal";
import { useTheme } from "../context/ThemeContext";
import Account from "./account";
import { useTracker } from "../context/Context";
import { useEffect } from "react";
import InsightsModal from "./insightsModal";

const SidebarHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showthemeModal, setshowthemeModal] = useState(false);
  const [showaccountModal, setshowaccountModal] = useState(false);
  const [showinsightsModal, setshowinsightsModal] = useState(false);
  const {username, setUsername, primaryUse, setPrimaryUse} = useTracker()


const handleSave = () => {
  const accountData = {
    username,
    primaryUse,
  };

  localStorage.setItem("accountInfo", JSON.stringify(accountData));
  // console.log("Account Saved:", accountData);
  onClose();
};

const onClose =() =>{
 setshowaccountModal(false)
}

useEffect(() => {
  const saved = localStorage.getItem("accountInfo");
  if (saved) {
    const data = JSON.parse(saved);
    if (data.username) setUsername(data.username);
    if (data.primaryUse) setPrimaryUse(data.primaryUse);
  }
}, []);


  const toggleSidebar = () => setIsOpen(!isOpen);
  const { setTheme } = useTheme();

const themeClick = () => {
  setshowthemeModal((prev) => !prev);
  console.log("theme modal opened")
};

const accountClick = () => {
  setshowaccountModal((prev) => !prev);
};

const insightsClick = () => {
  setshowinsightsModal((prev) => !prev);
};


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
      `}
                      style={{ boxShadow: `0 0 10px ${setTheme.accent}` }}
      >
        <div style={{ color: setTheme.text }}>
          <div className="flex items-center gap-3 mb-8" >
            <img
              src="/profile_.png"
              alt="Profile"
              className="w-10 h-10 rounded-full border border-gray-700"
            />
            <div>
              <h3 className="text-lg font-semibold" style={{ color: setTheme.text }}>{username} </h3>
            </div>
          </div>

          <nav className="flex flex-col gap-3" style={{ color: setTheme.text }} >
            <button className="flex items-center gap-2 hover:text-white"  onClick={themeClick} style={{ color: setTheme.text }}>
              <CheckSquare className="w-4 h-4" /> Themes
            </button>
            <button  className="flex items-center gap-2 hover:text-white" onClick={insightsClick} >
              <Bookmark className="w-4 h-4" /> Insights
            </button>
            <button className="flex items-center gap-2 hover:text-white" onClick={accountClick}>
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

{showthemeModal && <ThemeModal onClose={() => setshowthemeModal(false)} setTheme={setTheme}/>}
{showaccountModal && <Account  handleSave={handleSave} setUsername={setUsername} setPrimaryUse={setPrimaryUse} username={username} primaryUse={primaryUse}/>}
{showinsightsModal && (
  <InsightsModal onClose={() => setshowinsightsModal(false)} />
)}


    </>
  );
};

export default SidebarHome;