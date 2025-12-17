import { useParams, useNavigate } from "react-router-dom";

const MemoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const saved = JSON.parse(localStorage.getItem("abi_memories")) || [];
  const memory = saved.find(m => m.id === parseInt(id));

  if (!memory) return <div className="p-10 md:p-20 text-center font-serif text-stone-500">Album not found.</div>;

  return (
    <div className="animate-in fade-in duration-1000 max-w-6xl mx-auto px-6 py-10 md:pb-20">
      {/* Navigation - Better touch target on mobile */}
      <button 
        onClick={() => navigate("/app/diary")} 
        className="mb-6 md:mb-10 text-stone-400 hover:text-rose-500 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold transition-colors"
      >
        ← Back to Archives
      </button>

      <header className="mb-10 md:mb-16 space-y-4 md:space-y-6">
        <span className="text-rose-400 font-bold uppercase text-[10px] md:text-xs tracking-[0.2em]">
          {memory.date}
        </span>
        
        {/* Dynamic Text Scaling: 4xl on mobile, 6xl on desktop */}
        <h2 className="text-4xl md:text-6xl font-serif italic text-stone-800 leading-tight">
          {memory.title}
        </h2>
        
        <div className="h-[1px] w-16 md:w-24 bg-rose-200" />
        
        {/* Adjusted content size for readability */}
        <p className="text-stone-600 text-lg md:text-xl font-serif italic max-w-2xl leading-relaxed">
          "{memory.content}"
        </p>
      </header>

      {/* MULTI-PHOTO GRID - Improved Masonry Spacing */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
        {memory.images && memory.images.map((img, index) => (
          <div 
            key={index} 
            className="break-inside-avoid rounded-2xl md:rounded-[2rem] overflow-hidden border-4 md:border-8 border-white shadow-lg md:shadow-xl transition-transform hover:scale-[1.02] duration-500"
          >
            <img 
              src={img} 
              className="w-full h-auto object-cover" 
              alt={`Memory ${index}`} 
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryDetails;