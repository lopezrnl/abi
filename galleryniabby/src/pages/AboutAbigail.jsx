import React, { useState } from "react";
import ScrollReveal from "../components/ScrollReveal"; // Ensure this import matches your file path

const AboutAbigail = () => {
  const [hoveredImage, setHoveredImage] = useState("/1.jpg");

  const stats = [
    { label: "Location", value: "Dalig, Balayan, Batangas" },
    { label: "Focus", value: "ka sa'kin" },
    { label: "Vibe", value: "With me please" },
  ];

  const favorites = [
    { label: "Color", value: "Mint Green", img: "https://images.unsplash.com/photo-1678245687839-231ed039a18b?q=80&w=1935&auto=format&fit=crop" },
    { label: "Flower", value: "White Tulips", img: "https://plus.unsplash.com/premium_photo-1676117272892-785c4e6294d2?q=80&w=687&auto=format&fit=crop" },
    { label: "Food", value: "Matcha Crepes", img: "https://images.unsplash.com/photo-1515516089376-88db1e267f6a?q=80&w=500&auto=format&fit=crop" },
    { label: "Movie", value: "Little Women", img: "https://images.unsplash.com/photo-1543840911-35f994792798?q=80&w=500&auto=format&fit=crop" },
    { label: "Anime", value: "Spy x Family", img: "https://images.unsplash.com/photo-1620070081033-500609f30b91?q=80&w=500&auto=format&fit=crop" },
    { label: "Hobby", value: "Writing Stories", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500&auto=format&fit=crop" },
    { label: "ML Hero", value: "Floryn", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=500&auto=format&fit=crop" },
    { label: "Place", value: "Sanpiro", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=500&auto=format&fit=crop" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-24 my-12">
      
      {/* --- HERO SECTION --- */}
      <ScrollReveal>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="aspect-[4/5] bg-stone-200 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/27.jpeg" 
                alt="Abigail"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-rose-100 rounded-full -z-10"></div>
          </div>

          <div className="space-y-8">
            <header>
              <h2 className="text-6xl font-serif italic text-stone-800">Abigail</h2>
              <div className="h-1 w-20 bg-rose-400 mt-2"></div>
            </header>
            <p className="text-stone-600 font-serif text-xl leading-relaxed">
              I believe that every day holds a story worth telling. This digital space is my way of slowing down time.
            </p>
            <div className="space-y-4 pt-4">
              {stats.map((s) => (
                <div key={s.label} className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">{s.label}</span>
                  <span className="text-stone-800 italic font-serif">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* --- HOVER FAVORITES SECTION --- */}
      <ScrollReveal>
        <div className="grid md:grid-cols-2 gap-12 bg-stone-50 rounded-[3rem] p-12 border border-stone-100 items-center">
          <div className="space-y-2">
            <h3 className="text-2xl font-serif italic text-stone-800 mb-8">Curated Favorites</h3>
            {favorites.map((fav) => (
              <div 
                key={fav.label}
                onMouseEnter={() => setHoveredImage(fav.img)}
                onMouseLeave={() => setHoveredImage("/Abby.jpeg")}
                className="flex justify-between items-center py-3 px-4 rounded-xl hover:bg-white hover:shadow-sm transition-all cursor-crosshair group"
              >
                <span className="text-[10px] uppercase tracking-widest text-stone-400 group-hover:text-rose-400 transition-colors">
                  {fav.label}
                </span>
                <span className="text-stone-800 font-serif italic text-lg group-hover:translate-x-[-10px] transition-transform">
                  {fav.value}
                </span>
              </div>
            ))}
          </div>

          <div className="relative aspect-square md:aspect-[3/4] overflow-hidden rounded-2xl shadow-xl bg-stone-200">
            <img 
              key={hoveredImage} 
              src={hoveredImage} 
              alt="Preview"
              className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-500"
            />
            <div className="absolute inset-0 bg-stone-900/10 pointer-events-none"></div>
          </div>
        </div>
      </ScrollReveal>

    </div>
  );
};

export default AboutAbigail;