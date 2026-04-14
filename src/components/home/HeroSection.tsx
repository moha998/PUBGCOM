export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center text-center px-6">
      
      {/* Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00FF9C]/10 via-transparent to-transparent blur-3xl" />

      <div className="relative z-10 max-w-3xl">
        
        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
          أفضل إعدادات <span className="text-[#00FF9C]">PUBG</span>  
          <br />
          بذكاء اصطناعي 🔥
        </h1>

        <p className="mt-6 text-gray-400 text-lg">
          احصل على أفضل حساسية، تحليل أسلحة، واقتراحات احترافية
          مبنية على أسلوب لعبك.
        </p>

        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          
          <button className="px-6 py-3 bg-[#00FF9C] text-black font-bold rounded-xl shadow-lg hover:bg-[#00cc7a] transition">
            ابدأ الآن
          </button>

          <button className="px-6 py-3 border border-[#00FF9C]/40 text-[#00FF9C] rounded-xl hover:bg-[#00FF9C]/10 transition">
            جرّب AI
          </button>

        </div>

      </div>
    </section>
  );
}
