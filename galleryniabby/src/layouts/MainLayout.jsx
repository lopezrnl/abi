import { Outlet, Link, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();

  const menuItems = [
    { name: "My Diary", path: "/app/diary", icon: "✍️" },
    { name: "Gallery", path: "/app/gallery", icon: "📸" },
    { name: "About Me", path: "/app/about", icon: "✨" },
  ];

  return (
    <div className="flex h-screen bg-[#faf9f6] text-stone-800 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-stone-200 flex flex-col">
        <div className="p-8">
          <h1 className="text-2xl font-serif italic font-bold text-rose-500">Abigail.</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mt-1">Digital Journal</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
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

        <div className="p-6 border-t border-stone-100">
          <Link to="/" className="text-xs text-stone-400 hover:text-rose-500 transition-colors uppercase tracking-widest">
            Logout
          </Link>
        </div>
      </aside>

      {/* MAIN PAGE CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;