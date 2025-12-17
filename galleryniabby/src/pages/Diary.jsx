import React, { useState, useEffect } from "react";
import localforage from "localforage";
import MemoryCard from "../components/MemoryCard";

const Diary = () => {
  const [entries, setEntries] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState(null); // For the View Modal
  const [searchQuery, setSearchQuery] = useState("");
  
  // Form State
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
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const filteredEntries = entries.filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* HEADER & SEARCH BAR (Same as before) */}
      <div className="flex items-center gap-6 mb-12">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img src={profileImage} alt="Abigail" className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-5xl font-serif italic text-stone-800">Moments.</h2>
          <p className="text-stone-400 mt-1 uppercase tracking-widest text-xs">Curated by Abigail</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8 bg-stone-50 p-4 rounded-3xl border border-stone-100">
        <input type="text" placeholder="Search archives..." className="bg-transparent px-4 py-2 text-sm outline-none italic w-64" onChange={(e) => setSearchQuery(e.target.value)} />
        <button onClick={() => setIsAdding(true)} className="bg-stone-800 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-md hover:bg-rose-500 transition-all">+ New Album</button>
      </div>

      {/* GRID DISPLAY */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredEntries.map(entry => (
          <MemoryCard 
            key={entry.id} 
            memory={entry} 
            onDelete={deleteEntry} 
            onView={(m) => setSelectedMemory(m)} // Trigger the view modal
          />
        ))}
      </div>

      {/* --- ADD NEW MEMORY MODAL --- */}
      {isAdding && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-in fade-in">
          <form onSubmit={saveEntry} className="bg-white w-full max-w-2xl p-8 rounded-[2rem] space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <span className="font-serif italic text-stone-500">New Memory Entry</span>
              <button type="button" onClick={() => setIsAdding(false)} className="text-stone-300 hover:text-stone-800">✕</button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <input className="text-2xl font-serif outline-none border-b border-stone-100" placeholder="Album Title" value={title} onChange={e => setTitle(e.target.value)} required />
              <select value={tag} onChange={e => setTag(e.target.value)} className="bg-stone-50 p-2 rounded-xl text-sm font-medium outline-none">
                <option value="moment">🌸 Moment</option>
                <option value="feeling">💭 Feeling</option>
                <option value="gift">🎁 Gift</option>
              </select>
            </div>
            <textarea className="w-full h-32 outline-none text-stone-600 italic bg-stone-50/30 p-4 rounded-2xl border border-stone-50" placeholder="What happened today?" value={content} onChange={e => setContent(e.target.value)} required />
            <div className="bg-rose-50/30 p-6 rounded-3xl border-2 border-dashed border-rose-100">
               <label className="bg-white border px-4 py-2 rounded-full text-[10px] font-bold uppercase cursor-pointer">Upload Photos <input type="file" multiple onChange={handleImages} className="hidden" /></label>
               <div className="flex gap-3 overflow-x-auto mt-4">
                  {images.map((img, i) => (<img key={i} src={img} className="h-20 w-20 object-cover rounded-xl border-2 border-white shadow-md" alt="" />))}
               </div>
            </div>
            <button type="submit" className="w-full bg-stone-800 text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest shadow-lg">Archive Memory</button>
          </form>
        </div>
      )}

      {/* --- VIEW FULL ALBUM MODAL --- */}
      {selectedMemory && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            
            {/* Left: Image Gallery */}
            <div className="w-full md:w-1/2 bg-stone-100 h-80 md:h-auto overflow-y-auto p-4 space-y-4">
              {selectedMemory.images.map((img, i) => (
                <img key={i} src={img} className="w-full rounded-2xl shadow-sm" alt="" />
              ))}
              {selectedMemory.images.length === 0 && <div className="h-full flex items-center justify-center text-stone-400 italic">No photos in this album</div>}
            </div>

            {/* Right: Description */}
            <div className="w-full md:w-1/2 p-10 flex flex-col relative bg-white">
              <button 
                onClick={() => setSelectedMemory(null)}
                className="absolute top-6 right-8 text-stone-300 hover:text-stone-800 text-xl"
              >✕</button>
              
              <div className="mt-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-400 bg-rose-50 px-4 py-1.5 rounded-full">
                  {selectedMemory.tag}
                </span>
                <h2 className="text-4xl font-serif italic text-stone-800 mt-6 leading-tight">
                  {selectedMemory.title}
                </h2>
                <p className="text-stone-400 text-xs mt-2 uppercase tracking-widest">
                  Archived on {selectedMemory.date}
                </p>
                <div className="h-px w-12 bg-rose-200 my-8"></div>
                <p className="text-stone-600 leading-relaxed font-serif italic text-lg whitespace-pre-wrap">
                  "{selectedMemory.content}"
                </p>
              </div>

              <button 
                onClick={() => setSelectedMemory(null)}
                className="mt-auto w-full border border-stone-100 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-stone-50 transition-colors"
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