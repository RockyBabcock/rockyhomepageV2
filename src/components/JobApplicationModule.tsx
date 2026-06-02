import { motion } from "motion/react";
import { Download, CheckCircle2 } from "lucide-react";

export function JobApplicationModule() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="col-span-12 md:col-span-4 premium-card !bg-ink !text-base p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500"
    >
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-tertiary"></div>

      <div className="relative z-10">
        <h2 className="text-4xl lg:text-5xl font-headline font-medium italic mb-6 leading-tight">
          Open for Inquiry.
        </h2>
        <p className="font-body text-base/80 mb-8 leading-relaxed">
          Seeking high-impact roles in design engineering and creative
          technology. Available select dates Q3.
        </p>

        <ul className="space-y-4 font-label text-xs tracking-widest uppercase font-bold text-base/60">
          <li className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary" /> Design Systems
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary" /> Creative Direction
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary" /> React / Tailwind
          </li>
        </ul>
      </div>

      <button className="mt-10 bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/20 py-5 px-6 rounded-2xl font-bold font-mono uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg backdrop-blur-md">
        <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
        Fetch Resume
      </button>
    </motion.section>
  );
}
