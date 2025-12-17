import React, { useState, useEffect } from "react";
import { neon } from "@neondatabase/serverless";
import MemoryCard from "../components/MemoryCard";

// Initialize Neon Client
const sql = neon(import.meta.env.VITE_DATABASE_URL);

const Diary = () => {
  const [entries, setEntries] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("moment");
  const [imageFiles, setImageFiles] = useState([]);

  const profileImage = "/Abby.jpeg"; 

  // 1. Fetch Memories from Neon
  const fetchMemories = async () => {
    try {
      const rows = await sql`SELECT * FROM memories ORDER BY id DESC`;
      setEntries(rows);
    } catch (error) {
      console.error("Error fetching from Neon:", error);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(prev => [...prev, ...files]);
  };

  // 3. Save Entry - Using PUT Fetch to fix CORS and 405 errors
  const saveEntry = async (e) => {
    e.preventDefault();
    if (imageFiles.length === 0) return alert("Please select at least one photo.");
    
    setIsUploading(true);

    try {
      const uploadedUrls = [];

      // A. Upload to Vercel Blob via standard PUT fetch
      for (const file of imageFiles) {
        // We add a random suffix manually to the filename to prevent overwriting
        const fileName = `${Date.now()}-${file.name}`;
        
        const response = await fetch(
          `https://blob.vercel-storage.com/${fileName}`,
          {
            method: 'PUT',
            body: file,
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_BLOB_READ_WRITE_TOKEN}`,
              'x-api-version': '6',
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Upload failed: ${errorText}`);
        }

        const result = await response.json();
        uploadedUrls.push(result.url);
      }

      // B. Save metadata to NEON
      await sql`
        INSERT INTO memories (title, content, tag, images, date)
        VALUES (${title}, ${content}, ${tag}, ${uploadedUrls}, ${new Date().toLocaleDateString()})
      `;

      await fetchMemories();
      
      // Reset Form
      setTitle(""); 
      setContent(""); 
      setImageFiles([]); 
      setTag("moment"); 
      setIsAdding(false);
      
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Error saving memory: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const deleteEntry = async (id) => {
    if(window.confirm("Delete this memory?")) {
        try {
            await sql`DELETE FROM memories WHERE id = ${id}`;
            fetchMemories();
        } catch (error) {
            console.error("Delete error:", error);
        }
    }
  };

  const filteredEntries = entries.filter(e => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-4 md:gap-6 mb-8 md:mb-12">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img src={profileImage} alt="Abigail" className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-3xl md:text-5xl font-serif italic text-stone-800">Moments.</h2>
          <p className="text-stone-400 mt-1 uppercase tracking-widest text-[10px] md:text-xs">Curated by Abigail</p>
        </div>
      </div>

      {/* SEARCH & ADD BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-stone-50 p-3 md:p-4 rounded-2xl md:rounded-3xl border border-stone-100">
        <input 
          type="text" 
          placeholder="Search archives..." 
          className="bg-transparent px-4 py-2 text-sm outline-none italic w-full sm:w-64 border-b sm:border-none border-stone-200" 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <button 
          onClick={() => setIsAdding(true)} 
          className="w-full sm:w-auto bg-stone-800 text-white px-8 py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-rose-500 transition-all active:scale-95"
        >
          + New Album
        </button>
      </div>

      {/* GRID */}
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

      {/* MODAL: ADD NEW */}
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
                <p className="mt-2 text-[10px] text-stone-400 italic">{imageFiles.length} photos selected</p>
            </div>
            
            <button 
              type="submit" 
              disabled={isUploading}
              className="w-full bg-stone-800 text-white py-4 rounded-2xl text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-rose-600 transition-colors disabled:bg-stone-400"
            >
                {isUploading ? "Syncing to Cloud..." : "Archive Memory"}
            </button>
          </form>
        </div>
      )}

      {/* MODAL: VIEW FULL ALBUM */}
      {selectedMemory && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-4 bg-stone-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[95vh] md:max-h-[85vh]">
            
            <div className="w-full md:w-1/2 bg-stone-100 h-64 sm:h-80 md:h-auto overflow-y-auto p-3 md:p-4 space-y-4">
              {selectedMemory.images?.map((img, i) => (
                <img key={i} src={img} className="w-full rounded-xl md:rounded-2xl shadow-sm" alt="" />
              ))}
            </div>

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