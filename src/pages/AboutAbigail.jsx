import { useState } from "react";
import ScrollReveal from "../components/ScrollReveal";

const AboutAbigail = () => {
  const [hoveredImage, setHoveredImage] = useState("/Abby.jpeg");

  const stats = [
    { label: "Location", value: "Dalig, Balayan, Batangas" },
    { label: "Focus", value: "School, Academic, Self-Improvement" },
    { label: "Vibe", value: "Peace to those who understand" },
  ];

  const favorites = [
    { label: "Color", value: "Green", img: "https://images.unsplash.com/photo-1678245687839-231ed039a18b?q=80&w=1935&auto=format&fit=crop" },
    { label: "Flower", value: "Lilies", img: "https://plus.unsplash.com/premium_photo-1676068243733-df1880c2aef8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { label: "Food", value: "Lumpiang Gulay", img: "https://i.pinimg.com/1200x/ff/85/f4/ff85f42c19d2802ff10824904b4c49c7.jpg" },
    { label: "Drinks", value: "Dutch Mill", img: "https://i.pinimg.com/736x/d7/ef/c1/d7efc1f9667d602b3b52dd4e00997dde.jpg" },
    { label: "Movie", value: "Haikyu Movie", img: "https://i.pinimg.com/736x/a9/e0/1c/a9e01cc7ca8900d6aeb32a8abb82a7e0.jpg" },
    { label: "Anime", value: "Campfire Cooking", img: "https://i.pinimg.com/736x/1d/3a/f8/1d3af8fc7a83414eb58babbe0a9cbcba.jpg" },
    { label: "Hobby", value: "Writing and Reading", img: "https://i.pinimg.com/736x/0f/da/83/0fda83dc72103e37993994d252015659.jpg" },
    { label: "Place", value: "Switzerland", img: "https://plus.unsplash.com/premium_photo-1689805586474-e59c51f38254?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { label: "Author", value: "iDangs", img: "https://tse2.mm.bing.net/th/id/OIP.IYefmS0wIXcDi3GBwY2sngHaJQ?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" },
  ];

  const chapters = [
    {
      title: "The Bible",
      desc: "A foundational sacred text comprising the Old and New Testaments, guiding faith and history."
    },
    {
      title: "You're Not Enough (and that's okay)",
      desc: "A counter-cultural perspective on self-help that trades the pressure of self-sufficiency for faith and grace."
    },
    {
      title: "A Gentle Reminder",
      desc: "A collection of empathetic prose and poetry centered on healing, self-love, and finding hope during hard times."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-28 my-8 md:my-12 overflow-hidden">

      {/* --- HERO SECTION --- */}
      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="relative group order-1 md:order-none">
            <div className="aspect-[4/5] bg-stone-200 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl">
              <img
                src="/27.jpeg"
                alt="Abigail"
                className="w-full h-full object-cover grayscale md:group-hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 w-24 h-24 md:w-32 md:h-32 bg-rose-100 rounded-full -z-10 hidden xs:block"></div>
          </div>

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

      {/* --- SECTION: LIFE CHAPTERS --- */}
      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-stone-100">
          {chapters.map((chapter, idx) => (
            <div key={idx} className="group p-8 rounded-3xl bg-white hover:bg-rose-50/50 transition-colors duration-500 border border-transparent hover:border-rose-100">
              <span className="text-rose-400 font-serif italic text-3xl mb-4 block">0{idx + 1}</span>
              <h4 className="text-stone-800 font-serif text-xl mb-3">{chapter.title}</h4>
              <p className="text-stone-500 text-sm leading-relaxed font-serif italic">
                {chapter.desc}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* --- HOVER FAVORITES SECTION --- */}
      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-stone-50 rounded-3xl md:rounded-[3rem] p-6 sm:p-8 md:p-12 border border-stone-100 items-center">

          <div className="space-y-1 md:space-y-2 order-2 md:order-none">
            <h3 className="text-xl md:text-2xl font-serif italic text-stone-800 mb-4 md:mb-8 text-center md:text-left">Curated Favorites</h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1 gap-1 md:gap-0">
              {favorites.map((fav) => (
                <div
                  key={fav.label}
                  onMouseEnter={() => setHoveredImage(fav.img)}
                  onMouseLeave={() => setHoveredImage("/Abby.jpeg")}
                  onClick={() => setHoveredImage(fav.img)}
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

          <div className="relative aspect-square md:aspect-[3/4] overflow-hidden rounded-xl md:rounded-2xl shadow-lg bg-stone-200 order-1 md:order-none">
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

      {/* --- SECTION: THE QUIET MOMENTS --- */}
      <ScrollReveal>
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 space-y-6">
            <h3 className="text-3xl md:text-4xl font-serif italic text-stone-800">The Cost of Following</h3>

            <div className="space-y-4">
              <p className="text-stone-600 font-serif text-lg leading-relaxed italic">
                "Going deeper means changing your life for the better—limiting what gives you comfort for what is right."
              </p>
              <p className="text-stone-500 text-sm leading-relaxed">
                Following Him is a never-ending transformation, limiting what gives you comfort to what is right. It is not just believing, but a never-ending change as you walk into a Christ-like life.
              </p>
              <p className="text-stone-500 text-sm leading-relaxed">
                Did the apostles have the easiest life? No. But following Him means you are not alone; there is a God who will never abandon you.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
                <p className="text-[10px] uppercase tracking-widest text-rose-400 font-bold mb-1">The Promise</p>
                <p className="text-stone-800 font-serif italic text-sm">Isaiah 43:2 - Through deep waters</p>
              </div>
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
                <p className="text-[10px] uppercase tracking-widest text-rose-400 font-bold mb-1">The Reality</p>
                <p className="text-stone-800 font-serif italic text-sm">A walk of faith, not ease</p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                <img src="/a.jpg" alt="Deep waters" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                <img src="/c.jpg" alt="Reflective path" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                <img src="/d.jpg" alt="Quiet prayer" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                <img src="/b.jpg" alt="Peace in storm" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="py-12 border-y border-stone-100 rotate-[-1deg] bg-stone-50 -mx-4">
        <div className="flex whitespace-nowrap animate-marquee font-serif italic text-2xl md:text-4xl text-stone-300">
          <span className="mx-8">Dreamer</span>
          <span className="mx-8 text-rose-300">✦</span>
          <span className="mx-8">Storyteller</span>
          <span className="mx-8 text-rose-300">✦</span>
          <span className="mx-8">Coffee Enthusiast</span>
          <span className="mx-8 text-rose-300">✦</span>
          <span className="mx-8">Art Lover</span>
          <span className="mx-8 text-rose-300">✦</span>
          <span className="mx-8">Dreamer</span>
          <span className="mx-8 text-rose-300">✦</span>
          <span className="mx-8">Storyteller</span>
          <span className="mx-8 text-rose-300">✦</span>
          <span className="mx-8">Coffee Enthusiast</span>
          <span className="mx-8 text-rose-300">✦</span>
          <span className="mx-8">Art Lover</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AboutAbigail;