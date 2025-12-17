import { useParams, useNavigate } from "react-router-dom";

const MemoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const saved = JSON.parse(localStorage.getItem("abi_memories")) || [];
  const memory = saved.find(m => m.id === parseInt(id));

  if (!memory) return <div className="p-20 text-center font-serif">Album not found.</div>;

  return (
    <div className="animate-in fade-in duration-1000 max-w-6xl mx-auto pb-20">
      <button onClick={() => navigate("/app/diary")} className="mb-8 text-stone-400 hover:text-rose-500 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold">
        ← Back to Archives
      </button>

      <header className="mb-12 space-y-4">
        <span className="text-rose-400 font-bold uppercase text-xs tracking-[0.2em]">{memory.date}</span>
        <h2 className="text-6xl font-serif italic text-stone-800">{memory.title}</h2>
        <div className="h-[1px] w-24 bg-rose-200" />
        <p className="text-stone-600 text-xl font-serif italic max-w-2xl leading-relaxed">
          "{memory.content}"
        </p>
      </header>

      {/* MULTI-PHOTO GRID */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {memory.images && memory.images.map((img, index) => (
          <div key={index} className="break-inside-avoid rounded-[2rem] overflow-hidden border-8 border-white shadow-xl transition-transform hover:scale-[1.02] duration-500">
            <img src={img} className="w-full h-auto object-cover" alt={`Memory ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryDetails;