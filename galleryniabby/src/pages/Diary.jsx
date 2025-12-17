import React, { useState, useEffect } from "react";
import localforage from "localforage";
import MemoryCard from "../components/MemoryCard";

const Diary = () => {
  const [entries, setEntries] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("moment");
  const [images, setImages] = useState([]);

  const profileImage = "/Abby.jpeg"; 

  useEffect(() => {
    const initLoad = async () => {
      const saved = await localforage.getItem("abi_memories");
      if (saved) setEntries(saved);
    };
    initLoad();
  }, []);

  useEffect(() => {
    localforage.setItem("abi_memories", entries);
  }, [entries]);

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1000; 
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.6);
          setImages(prev => [...prev, compressedDataUrl]);
        };
      };
    });
  };

  const saveEntry = (e) => {
    e.preventDefault();
    const newEntry = { id: Date.now(), title, content, images, tag, date: new Date().toLocaleDateString() };
    setEntries(prev => [newEntry, ...prev]);
    setTitle(""); setContent(""); setImages([]); setTag("moment"); setIsAdding(false);
  };

  const deleteEntry = (id) => {
    if(window.confirm("Delete this memory?")) {
        setEntries(prev => prev.filter(e => e.id !== id));
    }
  };

  const filteredEntries = entries.filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-10">
      
      {/* HEADER SECTION - Responsive Stacking */}
      <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-4 md:gap-6 mb-8 md:mb-12">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img src={profileImage} alt="Abigail" className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-3xl md:text-5xl font-serif italic text-stone-800">Moments.</h2>
          <p className="text-stone-400 mt-1 uppercase tracking-widest text-[10px] md:text-xs">Curated by Abigail</p>
        </div>
      </div>

      {/* SEARCH & ADD BAR - Stacks on Mobile */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-stone-50 p-3 md:p-4 rounded-2xl md:rounded-3xl border border-stone-100">
        <input 
          type="text" 
          placeholder="Search archives..." 
          className="bg-transparent px-4 py-2 text-sm outline-none italic w-full sm:w-64 border-b sm:border-none border-stone-200" 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <button 
          onClick={() => setIsAdding(true)} 
          className="w-full sm:w-auto bg-stone-800 text-white px-8 py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-md hover:bg-rose-500 transition-all active:scale-95"
        >
          + New Album
        </button>
      </div>

      {/* GRID DISPLAY - 1, 2, or 3 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {filteredEntries.map(entry => (
          <MemoryCard 
            key={entry.id} 
            memory={entry} 
            onDelete={deleteEntry} 
            onView={(m) => setSelectedMemory(m)} 
          />
        ))}
        {filteredEntries.length === 0 && (
            <div className="col-span-full py-20 text-center text-stone-400 font-serif italic">
                No memories found in the archive.
            </div>
        )}
      </div>

      {/* --- ADD NEW MEMORY MODAL --- */}
      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-in fade-in">
          <form onSubmit={saveEntry} className="bg-white w-full max-w-2xl p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] space-y-4 md:space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <span className="font-serif italic text-stone-500 text-sm md:text-base">New Memory Entry</span>
              <button type="button" onClick={() => setIsAdding(false)} className="text-stone-300 hover:text-stone-800 p-2">✕</button>
            </div>
            
            <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6">
              <input className="text-xl md:text-2xl font-serif outline-none border-b border-stone-100 py-1" placeholder="Album Title" value={title} onChange={e => setTitle(e.target.value)} required />
              <select value={tag} onChange={e => setTag(e.target.value)} className="bg-stone-50 p-2.5 rounded-xl text-xs md:text-sm font-medium outline-none border border-stone-100">
                <option value="moment">🌸 Moment</option>
                <option value="feeling">💭 Feeling</option>
                <option value="gift">🎁 Gift</option>
              </select>
            </div>

            <textarea className="w-full h-32 outline-none text-stone-600 italic bg-stone-50/30 p-4 rounded-2xl border border-stone-100 text-sm md:text-base" placeholder="What happened today?" value={content} onChange={e => setContent(e.target.value)} required />
            
            <div className="bg-rose-50/30 p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 border-dashed border-rose-100">
                <label className="inline-block bg-white border border-rose-100 px-4 py-2 rounded-full text-[9px] md:text-[10px] font-bold uppercase cursor-pointer hover:bg-rose-50 transition-colors">
                    Upload Photos 
                    <input type="file" multiple onChange={handleImages} className="hidden" />
                </label>
                <div className="flex gap-3 overflow-x-auto mt-4 pb-2 scrollbar-hide">
                   {images.map((img, i) => (<img key={i} src={img} className="h-16 w-16 md:h-20 md:w-20 shrink-0 object-cover rounded-xl border-2 border-white shadow-sm" alt="" />))}
                </div>
            </div>
            
            <button type="submit" className="w-full bg-stone-800 text-white py-4 rounded-2xl text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-rose-600 transition-colors active:scale-[0.98]">
                Archive Memory
            </button>
          </form>
        </div>
      )}

      {/* --- VIEW FULL ALBUM MODAL --- */}
      {selectedMemory && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-4 bg-stone-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[95vh] md:max-h-[85vh]">
            
            {/* Left: Image Gallery */}
            <div className="w-full md:w-1/2 bg-stone-100 h-64 sm:h-80 md:h-auto overflow-y-auto p-3 md:p-4 space-y-4">
              {selectedMemory.images.map((img, i) => (
                <img key={i} src={img} className="w-full rounded-xl md:rounded-2xl shadow-sm" alt="" />
              ))}
              {selectedMemory.images.length === 0 && <div className="h-full min-h-[200px] flex items-center justify-center text-stone-400 italic text-sm">No photos in this album</div>}
            </div>

            {/* Right: Description */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col relative bg-white overflow-y-auto">
              <button 
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 md:top-6 md:right-8 text-stone-300 hover:text-stone-800 text-xl md:text-2xl p-2"
              >✕</button>
              
              <div className="mt-4">
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-rose-400 bg-rose-50 px-4 py-1.5 rounded-full">
                  {selectedMemory.tag}
                </span>
                <h2 className="text-2xl md:text-4xl font-serif italic text-stone-800 mt-4 md:mt-6 leading-tight">
                  {selectedMemory.title}
                </h2>
                <p className="text-stone-400 text-[10px] md:text-xs mt-2 uppercase tracking-widest">
                  Archived on {selectedMemory.date}
                </p>
                <div className="h-px w-10 md:w-12 bg-rose-200 my-6 md:my-8"></div>
                <p className="text-stone-600 leading-relaxed font-serif italic text-base md:text-lg whitespace-pre-wrap">
                  "{selectedMemory.content}"
                </p>
              </div>

              <button 
                onClick={() => setSelectedMemory(null)}
                className="mt-8 md:mt-auto w-full border border-stone-100 py-3 md:py-4 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:bg-stone-50 transition-colors active:bg-stone-100"
              >
                Close Gallery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Diary;