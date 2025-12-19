import { useState, useEffect } from "react";
import { neon } from "@neondatabase/serverless";
import { upload } from "@vercel/blob/client";

const sql = neon(import.meta.env.VITE_DATABASE_URL);

const Gallery = () => {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState("all"); // Tracks: all, diary, gallery
  const [isUploading, setIsUploading] = useState(false);

  const loadData = async () => {
    try {
      // Fetch all memories to allow filtering on the frontend
      const rows = await sql`SELECT * FROM memories ORDER BY id DESC`;
      setEntries(rows);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const downloadImage = (base64String, title) => {
    const timestamp = new Date().getTime();
    const fileName = title.replace(/\s+/g, '_').toLowerCase();
    const link = document.createElement("a");
    const isDataUri = base64String.startsWith('data:');
    link.href = isDataUri ? base64String : `data:image/jpeg;base64,${base64String}`;
    link.download = `Abi_${fileName}_${timestamp}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteVisual = async (entryId, imageUrls) => {
    if (window.confirm("Are you sure you want to delete this visual?")) {
      try {
        // Delete from Vercel Blob first
        for (const url of imageUrls) {
          await fetch('/api/upload', {
            method: 'DELETE',
            body: JSON.stringify({ url })
          });
        }
        // Then delete from Database
        await sql`DELETE FROM memories WHERE id = ${entryId}`;
        setEntries((prev) => prev.filter((e) => e.id !== entryId));
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  const handleQuickUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      for (const file of files) {
        // Upload to Vercel Blob
        const blob = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/upload',
        });

        // Save entry to Neon with source 'gallery'
        await sql`
          INSERT INTO memories (title, content, tag, images, date, source)
          VALUES ('Quick Snapshot', 'Added from Gallery', 'moment', ${[blob.url]}, ${new Date().toLocaleDateString()}, 'gallery')
        `;
      }
      loadData(); // Refresh list
      alert("Visuals added to cloud!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Filter logic based on the 'source' column
  const filteredImages = entries.filter((entry) => {
    if (filter === "diary") return entry.source === "diary";
    if (filter === "gallery") return entry.source === "gallery";
    return true;
  });

  const allImages = filteredImages.filter((entry) => entry.images && entry.images.length > 0);

  return (
    <div className="animate-in fade-in duration-1000 p-4 sm:p-6 lg:p-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8 md:mb-12">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-stone-800">Visuals.</h2>
          <p className="text-stone-400 mt-1 md:mt-2 italic text-sm md:text-base">A collection of captured light.</p>
          
          {/* Category Filter Buttons */}
          <div className="flex gap-4 mt-6">
            {["all", "diary", "gallery"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[10px] uppercase tracking-widest font-bold ${filter === cat ? 'text-rose-500' : 'text-stone-400'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <label className={`w-full sm:w-auto text-center bg-stone-800 text-white px-6 py-3 md:px-8 md:py-3.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all shadow-md hover:bg-rose-500 cursor-pointer ${isUploading ? 'opacity-50' : 'active:scale-95'}`}>
          {isUploading ? "Uploading..." : "+ Add Visual"}
          <input type="file" multiple className="hidden" onChange={handleQuickUpload} accept="image/*" disabled={isUploading} />
        </label>
      </div>

      {allImages.length === 0 ? (
        <div className="h-64 border-2 border-dashed border-stone-200 rounded-3xl flex items-center justify-center text-stone-400 italic font-serif px-4 text-center">
          No photos found in this category.
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          {allImages.map((item) =>
            item.images.map((imgUrl, index) => (
              <div
                key={`${item.id}-${index}`}
                className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-sm transition-all hover:shadow-xl"
              >
                <img
                  src={imgUrl}
                  alt={item.title}
                  className="w-full h-auto grayscale sm:group-hover:grayscale-0 transition-all duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 md:p-6">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => downloadImage(imgUrl, item.title)}
                      className="bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white hover:text-stone-800 transition-all active:scale-90"
                      title="Download"
                    >
                      <svg width="18" height="18" className="md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </button>

                    <button
                      onClick={() => deleteVisual(item.id, item.images)}
                      className="bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-rose-500 transition-all active:scale-90"
                      title="Delete"
                    >
                      <svg width="18" height="18" className="md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>

                  <div className="translate-y-2 sm:translate-y-4 sm:group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white font-serif italic text-base md:text-lg">
                      {item.title === "Quick Snapshot" ? "Moment" : item.title}
                    </p>
                    <p className="text-white/70 text-[9px] md:text-[10px] uppercase tracking-widest">
                      {item.date} {item.source === 'diary' && "(Diary Entry)"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Gallery;