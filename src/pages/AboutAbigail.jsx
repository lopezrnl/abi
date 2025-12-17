import React, { useState } from "react";
import ScrollReveal from "../components/ScrollReveal";

const AboutAbigail = () => {
  const [hoveredImage, setHoveredImage] = useState("/Abby.jpeg");

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24 my-8 md:my-12">
      
      {/* --- HERO SECTION --- */}
      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Image Container */}
          <div className="relative group order-1 md:order-none">
            <div className="aspect-[4/5] bg-stone-200 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl">
              <img 
                src="/27.jpeg" 
                alt="Abigail"
                className="w-full h-full object-cover grayscale md:group-hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            {/* Decorative circle - hidden on very small screens to avoid overflow */}
            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 w-24 h-24 md:w-32 md:h-32 bg-rose-100 rounded-full -z-10 hidden xs:block"></div>
          </div>

          {/* Text Content */}
          <div className="space-y-6 md:space-y-8 text-center md:text-left">
            <header className="inline-block md:block">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-stone-800">Abigail</h2>
              <div className="h-1 w-16 md:w-20 bg-rose-400 mt-2 mx-auto md:mx-0"></div>
            </header>
            <p className="text-stone-600 font-serif text-lg md:text-xl leading-relaxed">
              I believe that every day holds a story worth telling. This digital space is my way of slowing down time.
            </p>
            <div className="space-y-4 pt-4">
              {stats.map((s) => (
                <div key={s.label} className="flex justify-between border-b border-stone-100 pb-2 gap-4 text-left">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold shrink-0">{s.label}</span>
                  <span className="text-stone-800 italic font-serif text-sm md:text-base">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* --- HOVER FAVORITES SECTION --- */}
      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-stone-50 rounded-3xl md:rounded-[3rem] p-6 sm:p-8 md:p-12 border border-stone-100 items-center">
          
          {/* Favorites List */}
          <div className="space-y-1 md:space-y-2 order-2 md:order-none">
            <h3 className="text-xl md:text-2xl font-serif italic text-stone-800 mb-4 md:mb-8 text-center md:text-left">Curated Favorites</h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1 gap-1 md:gap-0">
              {favorites.map((fav) => (
                <div 
                  key={fav.label}
                  onMouseEnter={() => setHoveredImage(fav.img)}
                  onMouseLeave={() => setHoveredImage("/Abby.jpeg")}
                  onClick={() => setHoveredImage(fav.img)} // Tap for mobile
                  className="flex justify-between items-center py-2 md:py-3 px-3 md:px-4 rounded-xl hover:bg-white md:hover:shadow-sm transition-all cursor-crosshair group active:bg-white"
                >
                  <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-stone-400 md:group-hover:text-rose-400 transition-colors">
                    {fav.label}
                  </span>
                  <span className="text-stone-800 font-serif italic text-base md:text-lg md:group-hover:translate-x-[-10px] transition-transform">
                    {fav.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image Preview */}
          <div className="relative aspect-square md:aspect-[3/4] overflow-hidden rounded-xl md:rounded-2xl shadow-lg bg-stone-200 order-1 md:order-none">
            <img 
              key={hoveredImage} 
              src={hoveredImage} 
              alt="Preview"
              className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-500"
            />
            {/* Subtle Vignette */}
            <div className="absolute inset-0 bg-stone-900/10 pointer-events-none"></div>
          </div>
          
        </div>
      </ScrollReveal>

    </div>
  );
};

export default AboutAbigail;