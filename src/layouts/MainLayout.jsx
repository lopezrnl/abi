import { Outlet, Link, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();

  const menuItems = [
    { name: "My Diary", path: "/app/diary", icon: "✍️" },
    { name: "Gallery", path: "/app/gallery", icon: "📸" },
    { name: "About Me", path: "/app/about", icon: "✨" },
  ];

  return (
    // Changed h-screen to min-h-screen for better mobile scrolling and flex direction to column on mobile
    <div className="flex flex-col md:flex-row min-h-screen bg-[#faf9f6] text-stone-800 font-sans">
      
      {/* SIDEBAR / MOBILE HEADER */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-stone-200 flex flex-col shrink-0">
        <div className="p-6 md:p-8 flex md:block justify-between items-center">
          <div>
            <h1 className="text-xl md:text-2xl font-serif italic font-bold text-rose-500">Abigail.</h1>
            <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-stone-400 mt-1">Digital Journal</p>
          </div>
          
          {/* Mobile Logout Link (only shows on small screens next to logo) */}
          <Link to="/" className="md:hidden text-[10px] text-stone-400 uppercase tracking-widest">
            Logout
          </Link>
        </div>

        {/* NAVIGATION - Becomes a horizontal scroll/flex row on mobile */}
        <nav className="flex flex-row md:flex-col flex-1 px-4 md:space-y-1 pb-4 md:pb-0 overflow-x-auto md:overflow-x-visible">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                location.pathname === item.path 
                ? "bg-rose-50 text-rose-600" 
                : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
              }`}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Logout - Hidden on mobile */}
        <div className="hidden md:block p-6 border-t border-stone-100">
          <Link to="/" className="text-xs text-stone-400 hover:text-rose-500 transition-colors uppercase tracking-widest">
            Logout
          </Link>
        </div>
      </aside>

      {/* MAIN PAGE CONTENT */}
      <main className="flex-1 overflow-y-auto">
        {/* Adjusted padding: p-6 on mobile, p-12 on desktop */}
        <div className="max-w-5xl mx-auto p-6 md:p-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;