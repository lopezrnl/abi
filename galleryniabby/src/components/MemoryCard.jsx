import React from "react";

const MemoryCard = ({ memory, onDelete, onView }) => {
  const hasImage = memory.images && memory.images.length > 0;
  const imageSource = hasImage ? memory.images[0] : null;

  return (
    <div className="group bg-white rounded-[2rem] overflow-hidden shadow-sm border border-stone-100 flex flex-col h-full transition-all hover:shadow-xl hover:-translate-y-1">
      {/* IMAGE SECTION WITH HOVER OVERLAY */}
      <div className="h-64 w-full bg-stone-100 relative overflow-hidden">
        {imageSource ? (
          <img src={imageSource} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-300 text-[10px] uppercase tracking-widest">No Photos</div>
        )}
        
        {/* Hover Overlay */}
        <div 
          onClick={() => onView(memory)}
          className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
        >
          <span className="bg-white text-stone-800 px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            View Album
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-rose-500 bg-rose-50 px-3 py-1 rounded-full">
            {memory.tag}
          </span>
          <button onClick={(e) => { e.stopPropagation(); onDelete(memory.id); }} className="text-stone-300 hover:text-rose-500 transition-colors">✕</button>
        </div>
        
        <h3 className="text-xl font-serif text-stone-800 leading-tight mb-2">{memory.title}</h3>
        <p className="text-stone-500 text-sm italic line-clamp-2 mb-4">{memory.content}</p>
        <p className="text-stone-300 text-[10px] uppercase tracking-widest mt-auto">{memory.date}</p>
      </div>
    </div>
  );
};

export default MemoryCard;