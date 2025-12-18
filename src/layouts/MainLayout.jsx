import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const MainLayout = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu automatically when user clicks a link (path changes)
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const menuItems = [
    { name: "My Diary", path: "/app/diary" },
    { name: "Gallery", path: "/app/gallery" },
    { name: "About Me", path: "/app/about" },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#faf9f6] text-stone-800 font-sans overflow-hidden">
      
      {/* MOBILE TOP BAR */}
      <header className="md:hidden flex justify-between items-center p-5 bg-white border-b border-stone-200 z-50">
        <div>
          <h1 className="text-xl font-serif italic font-bold text-rose-500">Abigail.</h1>
        </div>
        
        {/* Burger Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-stone-600 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between relative">
            <span className={`w-full h-0.5 bg-stone-600 rounded-full transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`w-full h-0.5 bg-stone-600 rounded-full transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}></span>
            <span className={`w-full h-0.5 bg-stone-600 rounded-full transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </div>
        </button>
      </header>

      {/* SIDEBAR (Desktop) & SLIDE-OUT MENU (Mobile) */}
      <aside className={`
        fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out bg-white 
        md:relative md:translate-x-0 md:flex md:w-64 md:border-r border-stone-200 flex-col
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        {/* Brand Header (Desktop Only) */}
        <div className="hidden md:block p-8">
          <h1 className="text-2xl font-serif italic font-bold text-rose-500">Abigail.</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mt-1 font-bold">Digital Journal</p>
        </div>

        {/* Mobile Spacer (for the top bar height) */}
        <div className="h-20 md:hidden"></div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 px-6 md:px-4 space-y-2 pt-10 md:pt-0">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm md:text-sm font-medium transition-all ${
                location.pathname === item.path 
                ? "bg-rose-50 text-rose-600 shadow-sm shadow-rose-100" 
                : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Logout Section */}
        <div className="p-8 border-t border-stone-100">
          <Link to="/" className="text-xs text-stone-400 hover:text-rose-500 transition-colors uppercase tracking-widest font-bold">
            Logout
          </Link>
        </div>
      </aside>

      {/* OVERLAY (Mobile only - closes menu when clicking background) */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* MAIN PAGE CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6 md:p-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;