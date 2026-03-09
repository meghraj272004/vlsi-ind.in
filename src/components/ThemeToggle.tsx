import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { motion } from "motion/react";

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-full glass hover:bg-white/20 transition-all flex items-center justify-center"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun className="w-5 h-5 text-gold" />
            ) : (
                <Moon className="w-5 h-5 text-navy" />
            )}
        </motion.button>
    );
};
