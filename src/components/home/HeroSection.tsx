import { motion } from "motion/react";
import { Sparkles, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden mx-4 sm:mx-0 rounded-3xl bg-bg-card border border-white/5 p-6 md:p-20 text-white shadow-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(242,169,0,0.12),transparent_35%),radial-gradient(circle_at_left,rgba(0,255,156,0.08),transparent_28%)]" />
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary/10 blur-3xl rounded-full" />
      <div className="absolute -bottom-16 left-0 w-72 h-72 bg-emerald-400/5 blur-3xl rounded-full" />

      <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] md:text-xs font-black tracking-wider mb-5"
          >
            <Sparkles size={14} />
            المنصة رقم #1 للاعبي ببجي
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.45 }}
            className="text-4xl md:text-6xl font-black leading-[1.2] tracking-tight"
          >
            احترف اللعبة
            <br />
            <span className="gold-shimmer">بأفضل الإعدادات الذكية</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.45 }}
            className="mt-6 text-slate-300 text-base md:text-2xl leading-8 md:leading-10 max-w-2xl"
          >
            نقدّم لك أدق إعدادات الحساسية المخصصة لجهازك، وتحليل الأسلحة،
            وأحدث الفعاليات والعروض الحصرية في مكان واحد.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.45 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <button className="btn-gold px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-primary/10 hover:scale-[1.03] transition-transform">
              ابدأ الآن
            </button>

            <button className="px-8 py-4 rounded-2xl border border-primary/25 bg-white/[0.03] text-primary font-black text-lg hover:bg-primary/10 transition-all flex items-center gap-3">
              <Zap size={18} />
              جرّب المساعد الذكي
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.45 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {[
              "حساسية مخصصة",
              "تحليل أسلحة",
              "فعاليات مباشرة",
              "مقارنات احترافية",
            ].map((item) => (
              <span
                key={item}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.12, duration: 0.45 }}
            className="relative w-full max-w-[460px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent blur-2xl rounded-[2rem]" />
            <div className="relative rounded-[2rem] border border-white/10 bg-black/30 backdrop-blur-xl p-5 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-primary text-xs font-black uppercase tracking-[0.25em]">
                  PUBGCOM PRO
                </span>
                <span className="text-[10px] text-slate-400 font-bold">
                  Live Smart Setup
                </span>
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">الجهاز</span>
                  <span className="text-white font-bold">iPad Pro / iPhone</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">الأسلوب</span>
                  <span className="text-white font-bold">Rusher / Balanced</span>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    { label: "Camera", value: "95%" },
                    { label: "ADS", value: "87%" },
                    { label: "Gyroscope", value: "100%" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-slate-400">{item.label}</span>
                        <span className="text-primary font-black">{item.value}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-yellow-200"
                          style={{ width: item.value }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/5 text-sm text-slate-300 leading-7">
                  إعدادات ذكية مبنية على نوع الجهاز، أسلوب اللعب، وثبات السلاح
                  للحصول على أفضل تحكم ممكن.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
