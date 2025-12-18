import { useState } from "react";
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

  const chapters = [
    { title: "The Dreamer", desc: "Finding magic in the mundane and beauty in every sunset." },
    { title: "The Writer", desc: "Turning fleeting feelings into permanent words through stories." },
    { title: "The Wanderer", desc: "Exploring the quiet corners of Batangas and beyond." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-32 my-8 md:my-12 overflow-hidden">
      
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

      {/* --- UPDATED SECTION: CURRENT STATUS (LIGHT GRAY) --- */}
      <ScrollReveal>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-10 rounded-[2rem] bg-stone-200 border border-stone-300 text-stone-800 shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <p className="text-[10px] uppercase tracking-[0.3em] text-rose-400 font-bold">Current Status</p>
            <h3 className="text-2xl md:text-3xl font-serif italic text-stone-700">Self-love.</h3>
          </div>
          <div className="flex gap-4">
            <div className="px-6 py-2 bg-white border border-stone-300 rounded-full text-[10px] uppercase tracking-widest font-bold text-stone-500 shadow-sm">
              Writing
            </div>
            <div className="px-6 py-2 bg-white border border-stone-300 rounded-full text-[10px] uppercase tracking-widest font-bold text-stone-500 shadow-sm">
              Reading
            </div>
          </div>
        </div>
      </ScrollReveal>



      {/* --- TEXT MARQUEE --- */}
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

      {/* --- SECTION: THE QUIET MOMENTS --- */}
      <ScrollReveal>
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 space-y-6">
            <h3 className="text-3xl md:text-4xl font-serif italic text-stone-800">The Quiet Moments</h3>
            <div className="space-y-4">
              <p className="text-stone-600 font-serif text-lg leading-relaxed italic">
                "I find that the best stories aren't always found in grand adventures, but in the silence between the noise."
              </p>
              <p className="text-stone-500 text-sm leading-relaxed">
                Whether it's the way the light hits the floor at 4 PM or the scent of old paper in a quiet library, I've learned to treasure the small, often overlooked details of existence. These are the moments that truly make us feel alive.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
                <p className="text-[10px] uppercase tracking-widest text-rose-400 font-bold mb-1">Comfort</p>
                <p className="text-stone-800 font-serif italic text-sm">Warm oversized sweaters</p>
              </div>
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
                <p className="text-[10px] uppercase tracking-widest text-rose-400 font-bold mb-1">Peace</p>
                <p className="text-stone-800 font-serif italic text-sm">Cloudy afternoon walks</p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                <img src="/3.jpeg" alt="Aesthetic moment" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                <img src="/5.jpeg" alt="Aesthetic moment" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                <img src="/7.jpeg" alt="Aesthetic moment" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                <img src="/2.jpeg" alt="Aesthetic moment" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* --- SECTION: THE PERSON I CARRY WITH ME --- */}
      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16 border-t border-stone-100">
          <div className="space-y-8 order-2 md:order-1">
            <header>
              <span className="text-[10px] uppercase tracking-[0.3em] text-rose-300 font-bold">A Constant Thought</span>
              <h3 className="text-3xl md:text-4xl font-serif italic text-stone-800 mt-2">The person I miss most.</h3>
            </header>

            <div className="space-y-6">
              <p className="text-stone-600 font-serif text-lg leading-relaxed italic border-l-2 border-rose-100 pl-6">
                "There’s a specific kind of quiet that only happens when you aren't here. It’s not just your presence I miss; it’s the way the world feels easier to explain when I'm talking to you."
              </p>
              
              <p className="text-stone-500 text-sm leading-relaxed font-serif">
                I find fragments of you in everything—in the songs I play on repeat, the sunset I forgot to photograph, and the stories I haven't written yet. Missing you isn't a heavy thing; it’s just a constant, soft hum in the background of my day.
              </p>
            </div>

            <div className="pt-4">
              <div className="inline-flex items-center gap-4 px-6 py-3 bg-rose-50/50 rounded-full border border-rose-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-stone-500">
                  Counting the days until we aren't just an archive.
                </span>
              </div>
            </div>
          </div>

          <div className="relative order-1 md:order-2">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
              <img 
                src="/Abby.jpeg" 
                alt="A memory of us" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            {/* Overlaying "Polaroid" effect for the missing person vibe */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 md:w-48 md:h-48 bg-white p-2 shadow-xl -rotate-6 hidden sm:block">
              <div className="w-full h-full bg-stone-100 flex items-center justify-center overflow-hidden">
                <img src="/20.jpeg" className="w-full h-full object-cover opacity-60" alt="Faded memory" />
              </div>
              <p className="text-[8px] font-serif italic text-stone-400 mt-2 text-center">Wish you were here.</p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* --- SECTION: THE LANGUAGE OF ABSENCE --- */}
      <ScrollReveal>
        <div className="py-20 border-y border-stone-100 relative overflow-hidden">
          {/* Subtle background text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <span className="text-[20vw] font-serif italic whitespace-nowrap">Missing You</span>
          </div>

          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div className="text-center space-y-4 mb-16">
              <span className="text-[10px] uppercase tracking-[0.5em] text-rose-300 font-bold">The Unspoken</span>
              <h3 className="text-3xl md:text-5xl font-serif italic text-stone-800">The Language of Absence</h3>
              <p className="text-stone-400 font-serif italic">How I find you in the spaces between.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              <div className="space-y-12">
                <div className="group">
                  <h4 className="text-rose-400 font-serif text-xl mb-2">01. Sensory Echoes</h4>
                  <p className="text-stone-600 leading-relaxed font-serif italic text-sm md:text-base">
                    It’s the phantom weight of your hand in mine when I walk alone, or the way a specific song intro makes me reach for my phone to tell you something—only to remember.
                  </p>
                </div>
                
                <div className="group">
                  <h4 className="text-rose-400 font-serif text-xl mb-2">02. Saved Drafts</h4>
                  <p className="text-stone-600 leading-relaxed font-serif italic text-sm md:text-base">
                    My notes app is a graveyard of things I wanted to say but didn't. Stories I started writing for you, and sentences that felt too heavy to send.
                  </p>
                </div>
              </div>

              <div className="relative pt-8 md:pt-0">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl relative z-20">
                  <img 
                    src="/12.jpeg" 
                    alt="Reflective moment" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-rose-900/10 mix-blend-multiply"></div>
                </div>
                {/* Decorative floating element */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-rose-50 rounded-full -z-10 animate-pulse"></div>
                <div className="mt-8 text-right">
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Current Feeling</p>
                  <p className="text-stone-800 font-serif italic text-lg">"I miss the version of me that was with you."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

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