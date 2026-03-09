import { motion, AnimatePresence } from "motion/react";
import { Cpu } from "lucide-react";
import { useEffect, useState } from "react";

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-navy flex flex-col items-center justify-center p-6"
    >
      <div className="relative mb-12">
        <motion.div
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 bg-gradient-to-br from-neon-blue to-gold rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(0,242,255,0.3)]"
        >
          <Cpu className="w-12 h-12 text-navy" />
        </motion.div>
        <div className="absolute inset-[-20px] border border-white/10 rounded-[40px] animate-pulse" />
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-bold mb-2 tracking-widest uppercase">
          VLSI <span className="text-gold">IND</span>
        </h2>
        <p className="text-muted text-xs font-bold uppercase tracking-[0.3em]">
          Initializing Silicon Architecture
        </p>
      </div>

      <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-blue to-gold"
        />
      </div>
      <div className="mt-4 text-[10px] font-mono text-neon-blue/60 uppercase tracking-widest">
        Loading Modules... {progress}%
      </div>
    </motion.div>
  );
};
