import { motion } from "motion/react";

export const SplashScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] bg-navy flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20 transition-all duration-300">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-blue/20 blur-[120px] rounded-full" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 blur-[100px] rounded-full" />
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.9, 1, 0.9]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8 w-64 h-64 md:w-96 md:h-96 flex items-center justify-center transition-all duration-300"
        >
          <img src="/logo.png" alt="VLSI Technology Logo" className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(30,58,138,0.4)]" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 1 }}
            className="h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"
          />
          <p className="mt-4 text-muted uppercase tracking-[0.3em] text-xs font-bold transition-colors duration-300">
            ( VERY LARGE SIGNAL INTEGRATION )
          </p>
        </motion.div>
      </motion.div>

      {/* Loading bar at bottom */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-1 bg-border-theme rounded-full overflow-hidden transition-colors duration-300">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-full h-full bg-gradient-to-r from-transparent via-neon-blue to-transparent"
        />
      </div>
    </motion.div>
  );
};
