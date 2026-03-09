import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { ParticleBackground, GradientBackground } from "@/src/components/Backgrounds";
import { Cpu, Zap, Shield, Globe, ChevronRight, Layers, Layout, Database, Activity, X } from "lucide-react";

const services = [
  {
    category: "Design Services",
    items: [
      {
        id: "rtl",
        icon: <Layers className="w-10 h-10 text-neon-blue" />,
        title: "RTL Design & Verification",
        description: "Expertise in complex SoC architecture, RTL coding (Verilog/VHDL), and UVM-based verification environments.",
        features: ["SoC Architecture", "IP Integration", "UVM Verification", "Formal Verification"],
        details: "Our RTL design team specializes in high-performance, low-power digital design. We leverage advanced verification methodologies like UVM and formal verification to ensure first-pass silicon success. From micro-architecture definition to full-chip integration, we handle the most complex SoC challenges.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: "pd",
        icon: <Layout className="w-10 h-10 text-gold" />,
        title: "Physical Design",
        description: "End-to-end physical implementation services ensuring optimal Power, Performance, and Area (PPA).",
        features: ["Synthesis", "Floorplanning", "Place & Route", "Static Timing Analysis"],
        details: "We provide comprehensive physical design services from netlist to GDSII. Our expertise includes advanced node implementation (down to 3nm), hierarchical floorplanning, complex clock tree synthesis, and rigorous timing closure. We optimize for PPA while ensuring manufacturability and reliability.",
        image: "/physical-design.jpg",
      },
      {
        id: "dft",
        icon: <Database className="w-10 h-10 text-neon-blue" />,
        title: "DFT & Testability",
        description: "Advanced Design-for-Test solutions to ensure high test coverage and silicon reliability.",
        features: ["Scan Insertion", "ATPG", "MBIST", "JTAG/Boundary Scan"],
        details: "Our DFT experts implement robust test strategies to maximize silicon quality and minimize test costs. We specialize in scan compression, memory BIST, logic BIST, and boundary scan. Our methodologies ensure high fault coverage and efficient silicon bring-up and characterization.",
        image: "https://images.unsplash.com/photo-1581092334651-dd3c6543cd89?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  {
    category: "Specialized Solutions",
    items: [
      {
        id: "analog",
        icon: <Activity className="w-10 h-10 text-gold" />,
        title: "Analog & Mixed Signal",
        description: "Precision analog layout and mixed-signal design for high-speed interfaces and power management.",
        features: ["Custom Layout", "LVS/DRC Checks", "Post-layout Sim", "SerDes Design"],
        details: "We offer high-precision analog and mixed-signal layout services. Our team is experienced in high-speed SerDes, PLLs, ADCs/DACs, and PMIC blocks. We ensure signal integrity and robust performance through meticulous layout and post-layout verification.",
        image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: "fpga",
        icon: <Cpu className="w-10 h-10 text-neon-blue" />,
        title: "FPGA Prototyping",
        description: "Rapid FPGA-based hardware emulation and prototyping for early software development.",
        features: ["FPGA Synthesis", "Hardware Mapping", "Real-time Debugging", "Multi-FPGA Partitioning"],
        details: "Accelerate your software development with our FPGA prototyping services. We map complex ASIC designs to high-end FPGA platforms, providing a real-time hardware environment for early software validation and system-level debugging.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: "validation",
        icon: <Shield className="w-10 h-10 text-gold" />,
        title: "Post-Silicon Validation",
        description: "Comprehensive silicon bring-up and characterization services to ensure production readiness.",
        features: ["Silicon Bring-up", "Characterization", "Yield Analysis", "Failure Analysis"],
        details: "Our post-silicon validation team ensures your silicon meets all specifications in real-world conditions. We provide bring-up support, PVT characterization, yield optimization, and root-cause analysis for any silicon issues.",
        image: "https://images.unsplash.com/photo-1581092334651-dd3c6543cd89?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
];
const allCards = services.flatMap(s => s.items.map(item => ({ ...item, category: s.category })));

const StackCard = ({ item, i, N, scrollYProgress, setSelectedId }: any) => {
  const step = 1 / (N - 1);
  const inputs = [];
  const xOutput = [];
  const scaleOutput = [];
  const opOutput = [];

  // Before active
  if (i > 0) {
    inputs.push(0);
    xOutput.push("100vw");
    scaleOutput.push(1);
    opOutput.push(0);

    if ((i - 1) * step > 0) {
      inputs.push((i - 1) * step);
      xOutput.push("60vw");
      scaleOutput.push(1);
      opOutput.push(0);
    }
  }

  // Active state
  inputs.push(i * step);
  xOutput.push("0vw");
  scaleOutput.push(1);
  opOutput.push(1);

  // After active (moves to the left and stacks)
  if (i < N - 1) {
    inputs.push(1);
    const passedSteps = N - 1 - i;
    // Moves to the full left, stacking neatly with slight offset
    xOutput.push(`-${35 + passedSteps * 2}vw`);
    scaleOutput.push(1 - passedSteps * 0.03);
    opOutput.push(1 - passedSteps * 0.1);
  }

  const x = useTransform(scrollYProgress, inputs, xOutput);
  const scale = useTransform(scrollYProgress, inputs, scaleOutput);
  const opacity = useTransform(scrollYProgress, inputs, opOutput);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: i }}>
      <motion.div
        style={{ x, scale, opacity }}
        onClick={() => setSelectedId(item.id)}
        className="pointer-events-auto w-[85vw] md:w-[450px] lg:w-[500px] h-auto max-h-[85vh] overflow-y-auto glass p-8 md:p-10 rounded-[40px] border border-border-theme hover:border-gold/50 bg-[var(--bg-color)]/95 backdrop-blur-2xl transition-colors duration-300 group cursor-pointer shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col no-scrollbar"
      >
        <div className="flex justify-between items-start mb-6">
          <motion.div className="p-4 rounded-3xl bg-white/5 w-fit shadow-lg shadow-black/20 text-[var(--text-color)]/80">
            {item.icon}
          </motion.div>
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-gold font-bold px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
            {item.category}
          </span>
        </div>

        <motion.h3 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-neon-blue transition-colors text-[var(--text-color)]">{item.title}</motion.h3>
        <motion.p className="text-muted mb-6 text-sm md:text-base leading-relaxed">
          {item.description}
        </motion.p>

        <ul className="space-y-3 mb-8 flex-1">
          {item.features.map((feature: string, fIdx: number) => (
            <li key={fIdx} className="flex items-center gap-3 text-xs md:text-sm text-muted group-hover:text-[var(--text-color)] transition-colors">
              <div className="w-1.5 h-1.5 rounded-full bg-neon-blue shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="w-full py-4 mt-auto rounded-2xl border border-border-theme font-bold text-sm text-[var(--text-color)] group-hover:bg-[var(--text-color)] group-hover:text-[var(--bg-color)] transition-all flex items-center justify-center gap-2">
          View Details
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </motion.div>
    </div>
  );
};

export const Products = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax values for decorative elements
  const cpuY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const patternY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const smoothCpuY = useSpring(cpuY, { stiffness: 100, damping: 30 });
  const smoothPatternY = useSpring(patternY, { stiffness: 100, damping: 30 });

  const selectedItem = services
    .flatMap((s) => s.items)
    .find((item) => item.id === selectedId);

  return (
    <div className="relative min-h-screen bg-deep-bg">
      <ParticleBackground />
      <GradientBackground />

      <div ref={containerRef} style={{ height: `${allCards.length * 100}vh` }} className="relative w-full">
        {/* Title pinned dynamically or left at top. Let's keep a sticky header block */}
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-24 md:top-32 left-0 right-0 z-50 text-center px-6 pointer-events-none"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 drop-shadow-2xl">
              Products & <span className="text-gradient">Services</span>
            </h1>
            <p className="text-sm md:text-lg text-muted max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              Scroll down to explore our comprehensive suite of cutting-edge solutions.
            </p>
          </motion.div>

          {/* Background Decorative Animations */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              style={{ y: smoothCpuY, rotate: 15 }}
              className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] bg-neon-blue/5 blur-[120px] rounded-full animate-pulse"
            />
            <motion.div
              style={{ y: smoothPatternY, rotate: -15 }}
              className="absolute bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-gold/5 blur-[150px] rounded-full animate-pulse delay-700"
            />

            {/* Parallax Tech Grid */}
            <motion.div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23ffffff' fill-opacity='1'/%3E%3C/svg%3E")`,
                backgroundSize: '80px 80px',
                y: smoothPatternY
              }}
            />

            {/* Floating Icons Background */}
            <motion.div
              style={{ y: smoothCpuY }}
              className="absolute top-1/4 right-[15%] opacity-10"
            >
              <Cpu className="w-32 h-32 text-neon-blue animate-float" />
            </motion.div>
            <motion.div
              style={{ y: smoothPatternY }}
              className="absolute bottom-1/4 left-[15%] opacity-10"
            >
              <Layers className="w-40 h-40 text-gold animate-float" style={{ animationDelay: '2s' }} />
            </motion.div>
          </div>

          <div className="relative w-full h-full mt-20 md:mt-32">
            {allCards.map((item, i) => (
              <StackCard
                key={item.id}
                item={item}
                i={i}
                N={allCards.length}
                scrollYProgress={scrollYProgress}
                setSelectedId={setSelectedId}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Expanded View Overlay */}
      <AnimatePresence>
        {selectedId && selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-deep-bg/90 backdrop-blur-2xl transition-colors duration-300"
            />

            <motion.div
              layoutId={selectedId}
              className="relative w-full max-w-5xl glass rounded-[40px] md:rounded-[60px] overflow-hidden border-border-theme shadow-2xl shadow-neon-blue/20 flex flex-col md:flex-row"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-[var(--text-color)]/10 transition-colors text-[var(--text-color)]"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-gradient-to-br from-neon-blue/10 to-transparent">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-10 p-8 rounded-[40px] bg-[var(--text-color)]/5 w-fit shadow-2xl shadow-neon-blue/20"
                >
                  {selectedItem.icon}
                </motion.div>
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-5xl font-display font-bold mb-8 text-gradient"
                >
                  {selectedItem.title}
                </motion.h2>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-muted leading-relaxed mb-10"
                >
                  {selectedItem.details}
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-3"
                >
                  {selectedItem.features.map((tag) => (
                    <span key={tag} className="px-4 py-2 rounded-full bg-[var(--text-color)]/5 border border-border-theme text-xs font-bold text-neon-blue uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </div>

              <div className="w-full md:w-1/2 relative overflow-hidden border-l border-border-theme">
                {selectedItem.image && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      className="w-full h-full object-cover"
                    />
                  </>
                )}

                <div className="absolute bottom-10 left-10 right-10 z-20">
                  <div className="glass p-6 rounded-3xl backdrop-blur-xl border-border-theme">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold text-gold uppercase tracking-widest">System Architecture</span>
                      <span className="text-xs text-muted">Layer 01</span>
                    </div>
                    <div className="space-y-3">
                      <div className="h-1.5 w-full bg-[var(--text-color)]/10 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.5, delay: 0.6 }} className="h-full bg-neon-blue" />
                      </div>
                      <div className="h-1.5 w-3/4 bg-[var(--text-color)]/10 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.5, delay: 0.8 }} className="h-full bg-gold" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="px-6 max-w-7xl mx-auto">
        {/* Specialized Tech Stack Section */}
        <section className="mt-40">
          <div className="glass p-12 md:p-20 rounded-[60px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-neon-blue/10 blur-[150px] -z-10" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-display font-bold mb-8">Our Technology Stack</h2>
                <p className="text-muted mb-10 leading-relaxed">
                  We utilize industry-standard EDA tools and methodologies from
                  Cadence, and Siemens (Mentor Graphics) to ensure
                  seamless integration and high-quality results.
                </p>
                <div className="relative rounded-3xl overflow-hidden glass border-border-theme aspect-video shadow-[0_20px_60px_rgba(0,0,0,0.5)] group">
                  <img
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200"
                    alt="Advanced Semiconductor Chip Stack"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-80" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 perspective-1000">
                {[
                  { component: "D Flip-Flop", domain: "Architect Engineer" },
                  { component: "JK Flip-Flop", domain: "Embedded Design" },
                  { component: "SR Flip-Flop", domain: "Firmware Engineer" },
                  { component: "T Flip-Flop", domain: "FPGA Design" },
                  { component: "D Latch", domain: "Nanotech Engineer" },
                  { component: "Shift Register", domain: "AI Architect" },
                  { component: "Binary Counter", domain: "Physical Design" },
                  { component: "Sync Reset", domain: "RTL Design" },
                  { component: "Async Reset", domain: "SoC Design" }
                ].map(({ component, domain }, i) => {
                  const images = [
                    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&h=400&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=400&h=400&auto=format&fit=crop",
                    "https://p1.pxfuel.com/preview/959/824/602/circuit-board-microchip-semiconductor-electronics.jpg",
                    "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=400&h=400&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400&h=400&auto=format&fit=crop"
                  ];
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ rotateY: 180, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                      style={{ transformStyle: "preserve-3d" }}
                      className="relative aspect-square cursor-pointer group"
                    >
                      {/* Front */}
                      <div
                        className="absolute inset-0 glass rounded-2xl flex items-center justify-center overflow-hidden backface-hidden border border-white/5 group-hover:border-neon-blue/50 transition-colors"
                      >
                        <img
                          src={images[i % images.length]}
                          alt="VLSI Chip"
                          className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-125"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent opacity-60" />
                        <div className="relative w-12 h-12 rounded-full glass border border-border-theme flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.2)]">
                          <Cpu className="w-6 h-6 text-muted group-hover:text-neon-blue transition-colors" />
                        </div>
                      </div>
                      {/* Back */}
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-neon-blue to-navy rounded-2xl flex flex-col items-center justify-center p-2 backface-hidden border border-neon-blue/50 shadow-[0_0_30px_rgba(0,242,255,0.3)]"
                        style={{ transform: "rotateY(180deg)" }}
                      >
                        <span className="text-[10px] font-bold text-navy uppercase tracking-tighter text-center leading-tight">
                          {domain}
                        </span>
                        <div className="mt-1 w-4 h-px bg-navy/30" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
