import React, { useState, useEffect } from "react";
import localforage from "localforage";

const Gallery = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const saved = await localforage.getItem("abi_memories");
      if (saved) setEntries(saved);
    };
    loadData();
  }, []);

  useEffect(() => {
    localforage.setItem("abi_memories", entries);
  }, [entries]);

  const downloadImage = (base64String, title) => {
    const timestamp = new Date().getTime();
    const fileName = title.replace(/\s+/g, '_').toLowerCase();
    const link = document.createElement("a");
    link.href = base64String;
    link.download = `Abi_${fileName}_${timestamp}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteVisual = (entryId) => {
    if (window.confirm("Are you sure you want to delete this visual?")) {
      setEntries((prev) => prev.filter((e) => e.id !== entryId));
    }
  };

  const handleQuickUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1200;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);

          const newEntry = {
            id: Date.now() + Math.random(),
            title: "Quick Snapshot",
            content: "Added from Gallery",
            images: [compressedDataUrl],
            tag: "moment",
            date: new Date().toLocaleDateString(),
          };
          setEntries((prev) => [newEntry, ...prev]);
        };
      };
    });
  };

  const allImages = entries.filter((entry) => entry.images && entry.images.length > 0);

  return (
    <div className="animate-in fade-in duration-1000 p-4 sm:p-6 lg:p-10">
      {/* HEADER SECTION - Responsive Flex */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8 md:mb-12">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-stone-800">Visuals.</h2>
          <p className="text-stone-400 mt-1 md:mt-2 italic text-sm md:text-base">A collection of captured light.</p>
        </div>

        <label className="w-full sm:w-auto text-center bg-stone-800 text-white px-6 py-3 md:px-8 md:py-3.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all shadow-md hover:bg-rose-500 cursor-pointer active:scale-95">
          + Add Visual
          <input type="file" multiple className="hidden" onChange={handleQuickUpload} accept="image/*" />
        </label>
      </div>

      {allImages.length === 0 ? (
        <div className="h-64 border-2 border-dashed border-stone-200 rounded-3xl flex items-center justify-center text-stone-400 italic font-serif px-4 text-center">
          No photos archived yet.
        </div>
      ) : (
        /* MASONRY GRID - Responsive Columns */
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

                {/* OVERLAY - Mobile vs Desktop behavior */}
                {/* On mobile, icons are always visible slightly, on desktop they appear on hover */}
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
                      onClick={() => deleteVisual(item.id)}
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
                      {item.date}
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