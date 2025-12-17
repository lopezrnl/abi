import React from "react";

const MemoryCard = ({ memory, onDelete, onView }) => {
  const hasImage = memory.images && memory.images.length > 0;
  const imageSource = hasImage ? memory.images[0] : null;

  return (
    <div 
      onClick={() => onView(memory)}
      className="group bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-sm border border-stone-100 flex flex-col h-full transition-all hover:shadow-xl md:hover:-translate-y-1 cursor-pointer"
    >
      {/* IMAGE SECTION */}
      <div className="h-48 sm:h-56 md:h-64 w-full bg-stone-100 relative overflow-hidden">
        {imageSource ? (
          <img 
            src={imageSource} 
            alt={memory.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-300 text-[10px] uppercase tracking-widest">
            No Photos
          </div>
        )}
        
        {/* Hover Overlay - Hidden on touch devices via 'hidden md:flex' or use group-hover */}
        <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px] opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center">
          <span className="bg-white text-stone-800 px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            View Album
          </span>
        </div>

        {/* Mobile-only Indicator (Optional: small hint that it's clickable) */}
        <div className="absolute bottom-3 right-3 md:hidden bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm">
           <div className="w-1 h-1 bg-stone-400 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3 md:mb-4">
          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-rose-500 bg-rose-50 px-2 md:px-3 py-1 rounded-full">
            {memory.tag}
          </span>
          {/* Prevent Delete from triggering View */}
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              onDelete(memory.id); 
            }} 
            className="p-1 -mr-1 text-stone-300 hover:text-rose-500 transition-colors focus:outline-none"
            aria-label="Delete memory"
          >
            <span className="text-lg leading-none">×</span>
          </button>
        </div>
        
        <h3 className="text-lg md:text-xl font-serif text-stone-800 leading-tight mb-2">
          {memory.title}
        </h3>
        
        <p className="text-stone-500 text-xs md:text-sm italic line-clamp-2 mb-4 leading-relaxed">
          {memory.content}
        </p>
        
        <div className="mt-auto flex justify-between items-center">
          <p className="text-stone-300 text-[9px] md:text-[10px] uppercase tracking-widest">
            {memory.date}
          </p>
          {/* Mobile "Tap to View" hint */}
          <span className="md:hidden text-rose-300 text-[9px] font-bold uppercase tracking-widest">
            View →
          </span>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;