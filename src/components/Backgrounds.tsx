import { useEffect, useState, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, Engine } from "@tsparticles/engine";
import { motion, useScroll, useTransform } from "motion/react";
import { useTheme } from "../context/ThemeContext";

export const ParticleBackground = () => {
  const [init, setInit] = useState(false);
  const { scrollY } = useScroll();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Parallax effect for particles - moves slower than scroll
  const y = useTransform(scrollY, [0, 2000], [0, 300]);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    // console.log(container);
  }, []);

  if (!init) return null;

  return (
    <motion.div style={{ y }} className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
      <Particles
        id="tsparticles"
        key={theme}
        particlesLoaded={particlesLoaded}
        className="w-full h-full"
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 30, // Low FPS for performance
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "grab",
              },
              resize: {
                enable: true,
              },
            },
            modes: {
              push: {
                quantity: 4,
              },
              grab: {
                distance: 200,
                links: {
                  opacity: 0.8,
                  color: isLight ? "#000000" : "#00f2ff"
                }
              },
            },
          },
          particles: {
            color: {
              value: isLight ? ["#000000", "#d4af37", "#0a2540"] : ["#00f2ff", "#d4af37", "#ffffff"],
            },
            links: {
              color: isLight ? "#000000" : "#00f2ff",
              distance: 150,
              enable: true,
              opacity: isLight ? 0.6 : 0.3,
              width: isLight ? 1.5 : 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 0.8,
              straight: false,
            },
            number: {
              density: {
                enable: true,
              },
              value: 150,
            },
            opacity: {
              value: isLight ? 0.8 : 0.4,
            },
            shape: {
              type: isLight ? ["square", "triangle", "polygon"] : "circle",
              options: {
                polygon: {
                  sides: 6 // Hexagon looking like a chip
                }
              }
            },
            size: {
              value: isLight ? { min: 2, max: 6 } : { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
    </motion.div>
  );
};

export const GradientBackground = () => {
  const { scrollY } = useScroll();

  // Parallax effect for gradients - moves at a different speed than particles
  const y1 = useTransform(scrollY, [0, 2000], [0, 400]);
  const y2 = useTransform(scrollY, [0, 2000], [0, 200]);
  const y3 = useTransform(scrollY, [0, 2000], [0, 500]);
  const patternY = useTransform(scrollY, [0, 2000], [0, 100]);

  return (
    <div className="fixed inset-0 w-full h-full -z-20 overflow-hidden pointer-events-none">
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-blue/20 blur-[120px] rounded-full animate-pulse"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/10 blur-[120px] rounded-full animate-pulse delay-1000"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-navy/30 blur-[120px] rounded-full animate-pulse delay-2000"
      />

      {/* Silicon Wafer Pattern Overlay */}
      <motion.div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          y: patternY,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};
