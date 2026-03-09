import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ParticleBackground, GradientBackground } from "@/src/components/Backgrounds";
import { Layers, Layout, Database, Activity, ChevronRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <Layers className="w-8 h-8 text-neon-blue" />,
    title: "RTL Design & Verification",
    description: "Comprehensive RTL development and rigorous verification for complex SoCs.",
    longDescription: "Our RTL design team specializes in creating power-efficient, high-performance logic for complex System-on-Chips (SoCs). We utilize advanced SystemVerilog and UVM environments to ensure silicon success on even the most demanding architectures.",
    tags: ["SystemVerilog", "UVM", "Formal Verification"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"
  },
  {
    icon: <Layout className="w-8 h-8 text-gold" />,
    title: "Physical Design",
    description: "Expert physical implementation from netlist to GDSII with optimal PPA.",
    longDescription: "From RTL-to-GDSII, our physical design experts excel in advanced node implementations (up to 3nm). We focus on achieving the tightest PPA (Power, Performance, Area) targets through sophisticated floorplanning, CTS, and routing strategies using industry-leading EDA tools.",
    tags: ["RTL-to-GDSII", "Floorplanning", "CTS"],
    image: "/physical-design.jpg"
  },
  {
    icon: <Database className="w-8 h-8 text-neon-blue" />,
    title: "DFT Services",
    description: "Advanced Design-for-Test strategies to maximize silicon yield and quality.",
    longDescription: "We implement cutting-edge Design-for-Test (DFT) architectures that significantly reduce testing costs while maximizing silicon quality. Our expertise includes Scan/ATPG, MBIST, Boundary Scan, and specialized JTAG implementations for testability at every stage.",
    tags: ["ATPG", "MBIST", "Scan Insertion"],
    image: "https://images.unsplash.com/photo-1581092334651-dd3c6543cd89?q=80&w=800&auto=format&fit=crop"
  },
  {
    icon: <Activity className="w-8 h-8 text-gold" />,
    title: "Analog Layout",
    description: "Precision analog and mixed-signal layout for high-performance interfaces.",
    longDescription: "Our analog layout services provide high-precision implementations for critical IP blocks, including High-Speed SerDes, PLLs, ADCs/DACs, and RF circuits. We prioritize signal integrity and EMI requirements to ensure reliable operation in high-performance environments.",
    tags: ["SerDes", "PLL/DLL", "RF Layout", "LVS/DRC/Antenna"],
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=800&auto=format&fit=crop"
  },
];

const statDetails: Record<string, { title: string; subtitle: string; sections: { title: string; items: string[] }[] }> = {
  "Experience": {
    title: "25+ Years of Industry Excellence",
    subtitle: "Distinguished technologist and R&D leader driving deep-tech innovation and national-level technology programs.",
    sections: [
      {
        title: "Technical Expertise",
        items: [
          "Design Verification: Digital IC design, physical design",
          "EDA Tools Mastery: Cadence, Synopsys, Mentor Graphics tools",
          "Front-End & Back-End Design: RTL design, synthesis, STA, PNR, CTS, LVS",
          "Fabrication & Verification: CMOS, FinFET, UVM verification"
        ]
      }
    ]
  },
  "Startups Mentored": {
    title: "Mentoring the Next Generation",
    subtitle: "Strategic guidance and leadership for 250+ deep-tech startups across corporate R&D and academia.",
    sections: [
      {
        title: "Mentorship Impact",
        items: [
          "Global mentorship for startups in AI, IoT, and Semiconductor domains",
          "Guidance on product-market fit and technical scalability",
          "Strategic advisory for seed and growth stage deep-tech ventures",
          "Innovation ecosystem development and management"
        ]
      }
    ]
  },
  "Funded Projects": {
    title: "Major Funded Initiatives",
    subtitle: "Successfully lead ₹150+ Crore in high-value funded projects spanning AI, MEMS, and Semiconductor design.",
    sections: [
      {
        title: "Key Projects",
        items: [
          "₹220-Crore SoC-based Non-Invasive Disease Detection System",
          "₹2.9-Crore AI-Enabled Dengue Detection Project (ICMR)",
          "₹2.5-Crore MEMS Sensor Development Program",
          "₹2.3-Crore PSoC Semiconductor Design Cell",
          "Multiple Deep-Tech Projects Submitted to PMO & National Agencies"
        ]
      },
      {
        title: "Patents Registered",
        items: [
          "Real-Time Tracker for Controlling Chain Snatching (2016)",
          "Embedded Algorithm for MRI-Based Cancer Detection (2018)",
          "Smart Electronic Gadget for Dengue Detection (2018)"
        ]
      }
    ]
  },
  "Innovation Centers": {
    title: "Pioneering R&D Centers",
    subtitle: "Established over 10 specialized centers to foster deep-tech research and development.",
    sections: [
      {
        title: "Established Centers",
        items: [
          "Antenna Design and RF Systems Center",
          "Embedded Systems R&D Division",
          "AI-driven Digital Twin Platforms Center",
          "Advanced Semiconductor Design and Verification Lab",
          "IoT and Autonomous Systems Innovation Hub"
        ]
      }
    ]
  }
};

export const Home = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedExpertise, setSelectedExpertise] = useState<typeof features[0] | null>(null);
  const [selectedStat, setSelectedStat] = useState<string | null>(null);

  const featuresRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: featuresRef,
    offset: ["start 0.8", "end 0.2"]
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <div className="relative min-h-screen" onMouseMove={handleMouseMove}>
      <ParticleBackground />
      <GradientBackground />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-neon-blue text-xs font-bold uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-blue"></span>
              </span>
              Innovating the Future of Silicon
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-8">
              Designing <span className="text-gradient">Tomorrow’s</span> <br /> Smart Chips
            </h1>
            <p className="text-lg text-muted mb-10 max-w-xl leading-relaxed">
              VLSI IND is a global leader in semiconductor design services. We empower
              tech giants and startups alike with cutting-edge VLSI solutions, from
              concept to silicon.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="bg-neon-blue text-navy px-8 py-4 rounded-full font-bold hover:bg-white transition-all flex items-center gap-2 group shadow-lg shadow-neon-blue/20"
              >
                Explore Services
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://youtu.be/K0SQO4LQAS0?si=j9fRVhmcA1jjmGUO"
                target="_blank"
                rel="noopener noreferrer"
                className="glass px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all flex items-center gap-2 text-[var(--text-color)]"
              >
                <Play className="w-5 h-5 fill-current" />
                Watch Demo
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: -mousePos.y,
              rotateY: mousePos.x
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative perspective-1000"
          >
            <div className="relative z-10 w-full aspect-square rounded-3xl overflow-hidden glass border-border-theme shadow-2xl shadow-neon-blue/10">
              <img
                src="/make-in-india-chip.jpg"
                alt="VLSI SEMICON - Make in India Chip"
                className="w-full h-full object-cover opacity-80 mix-blend-overlay"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="glass p-6 rounded-2xl backdrop-blur-xl">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-neon-blue uppercase tracking-widest">Active Project</span>
                    <span className="text-xs text-muted">7nm FinFET SoC</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 2, delay: 1 }}
                      className="h-full bg-gradient-to-r from-neon-blue to-gold"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/20 blur-3xl rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-neon-blue/20 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 relative border-y border-border-theme bg-deep-bg/20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-10 right-10 w-96 h-96 bg-neon-blue blur-[150px] rounded-full" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-gold blur-[150px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">About <span className="text-gradient">Us</span></h2>
              <p className="text-xl text-muted leading-relaxed mb-8">
                VLSI Ind delivers advanced VLSI design, SoC integration, and IoT semiconductor solutions,
                enabling high-performance, scalable, and reliable silicon products for the global market.
              </p>
              <p className="text-lg text-muted/80 leading-relaxed mb-12">
                As a premier semiconductor design services company, we provide end-to-end solutions for
                startups, enterprises, and OEMs. From initial concept to tape-out, we empower
                the technology ecosystem with high-performance, reliable, and cost-effective silicon.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass p-8 rounded-3xl border-border-theme hover:bg-white/5 transition-all">
                  <h3 className="text-2xl font-bold mb-4 text-gold">Our Vision</h3>
                  <p className="text-muted text-sm leading-relaxed">To provide robust technical solutions to real-world challenges, improving the quality of life through innovation and inspiring the next generation.</p>
                </div>
                <div className="glass p-8 rounded-3xl border-border-theme hover:bg-white/5 transition-all">
                  <h3 className="text-2xl font-bold mb-4 text-neon-blue">Our Mission</h3>
                  <p className="text-muted text-sm leading-relaxed">To create cutting-edge, smart, tactile technology products through dedicated R&D, contributing to a better, more efficient world and fostering global progress.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-[60px] overflow-hidden glass border-border-theme shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop"
                alt="Semiconductor Innovation"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
              <div className="absolute bottom-12 left-12 right-12">
                <div className="glass p-8 rounded-3xl border-white/10 backdrop-blur-2xl">
                  <h4 className="text-gold font-bold uppercase tracking-widest text-xs mb-4">Core Values</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {["Innovation", "Excellence", "Collaboration"].map(val => (
                      <div key={val} className="text-center">
                        <div className="text-xl font-bold text-white mb-1">{val}</div>
                        <div className="w-8 h-1 bg-neon-blue mx-auto rounded-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Leadership Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-10 md:p-20 rounded-[60px] border-border-theme relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-neon-blue/5 to-transparent -z-10" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center">
              <div className="col-span-1 border-r border-border-theme pr-8 md:pr-16 hidden md:block">
                <div className="aspect-[3/4] rounded-[40px] overflow-hidden glass border-border-theme relative group">
                  <img
                    src="/ceo.jpg"
                    alt="Mr. B. S. Manusudhan"
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                </div>
              </div>
              <div className="col-span-1 md:col-span-2">
                <h4 className="text-neon-blue font-bold uppercase tracking-[0.2em] mb-6">Our Leadership</h4>
                <h3 className="text-3xl md:text-5xl font-display font-bold mb-8">Pioneering <span className="text-gradient">semiconductor</span> R&D</h3>
                <p className="text-lg text-muted leading-relaxed mb-10">
                  Led by Mr. B. S. Manusudhan, a distinguished technologist and R&D leader with over 25 years of experience,
                  VLSI Ind is at the forefront of deep-tech innovation. Mr. Manusudhan has successfully led over ₹150 crore
                  in funded initiatives across AI Embedded Systems, Digital Twin platforms, and semiconductor design.
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { label: "Experience", value: "25+ Yrs" },
                    { label: "Startups Mentored", value: "250+" },
                    { label: "Funded Projects", value: "₹150Cr+" },
                    { label: "Innovation Centers", value: "10+" }
                  ].map(stat => (
                    <motion.div 
                      key={stat.label}
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedStat(stat.label)}
                      className="cursor-pointer group"
                    >
                      <div className="text-2xl font-bold text-white mb-1 group-hover:text-neon-blue transition-colors">{stat.value}</div>
                      <div className="text-xs text-muted uppercase tracking-widest font-bold group-hover:text-white transition-colors">{stat.label}</div>
                      <div className="w-8 h-0.5 bg-neon-blue/30 mt-2 group-hover:w-full group-hover:bg-neon-blue transition-all" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Split Effect */}
      <section ref={featuresRef} className="py-24 px-6 relative h-[250vh]">
        <div className="sticky top-24 max-w-7xl mx-auto overflow-visible">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Our Core Expertise</h2>
            <p className="text-muted max-w-2xl mx-auto">
              We deliver excellence across the entire VLSI design spectrum, ensuring
              your products meet the highest standards of performance and reliability.
            </p>
          </div>

          <div className="relative h-[600px] flex items-center justify-center">
            {features.map((feature, index) => {
              const xOffsets = ["-110%", "110%", "-110%", "110%"];
              const yOffsets = ["-55%", "-55%", "55%", "55%"];
              const rotations = [-10, 10, -5, 5];

              const x = useTransform(scrollYProgress, [0.1, 0.45], ["0%", xOffsets[index]]);
              const y = useTransform(scrollYProgress, [0.1, 0.45], ["0%", yOffsets[index]]);
              const rotate = useTransform(scrollYProgress, [0.1, 0.45], [rotations[index] * 0.2, rotations[index]]);
              const opacity = useTransform(scrollYProgress, [0.05, 0.15], [0.5, 1]);
              const scale = useTransform(scrollYProgress, [0.1, 0.45], [0.85, 1]);

              return (
                <motion.div
                  key={index}
                  onClick={() => setSelectedExpertise(feature)}
                  style={{ x, y, rotate, opacity, scale, zIndex: 4 - index }}
                  className="absolute w-full max-w-[320px] glass p-8 rounded-3xl hover:bg-white/10 transition-all group cursor-pointer border-border-theme hover:border-white/20 shadow-2xl backdrop-blur-2xl"
                >
                  <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-neon-blue transition-colors">{feature.title}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                    Learn More <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expertise Modal */}
      <AnimatePresence>
        {selectedExpertise && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExpertise(null)}
              className="absolute inset-0 bg-deep-bg/90 backdrop-blur-xl transition-colors duration-300"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl glass rounded-[40px] border-border-theme shadow-2xl shadow-neon-blue/20 overflow-hidden"
            >
              <button
                onClick={() => setSelectedExpertise(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-[var(--text-color)]/10 backdrop-blur-md flex items-center justify-center hover:bg-[var(--text-color)]/20 transition-colors"
              >
                <div className="w-5 h-px bg-[var(--text-color)] rotate-45 absolute" />
                <div className="w-5 h-px bg-[var(--text-color)] -rotate-45 absolute" />
              </button>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 relative h-56 md:h-auto min-h-[300px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                  <img
                    src={selectedExpertise.image}
                    alt={selectedExpertise.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-6 left-6 z-20">
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 w-fit">
                      {selectedExpertise.icon}
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-8 md:p-10 overflow-y-auto max-h-[80vh]">
                  <h3 className="text-3xl md:text-4xl font-display font-bold mb-5">
                    {selectedExpertise.title.split(' ')[0]} <span className="text-gradient">{selectedExpertise.title.split(' ').slice(1).join(' ')}</span>
                  </h3>

                  <p className="text-lg text-muted max-h-40 overflow-y-auto mb-8 pr-4 custom-scrollbar">
                    {selectedExpertise.longDescription}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-10">
                    {selectedExpertise.tags?.map(tag => (
                      <span key={tag} className="px-4 py-2 rounded-xl bg-[var(--text-color)]/5 border border-border-theme text-xs font-bold text-muted uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    onClick={() => setSelectedExpertise(null)}
                    className="inline-flex items-center gap-3 bg-neon-blue text-navy px-8 py-4 rounded-full font-bold hover:bg-white transition-all shadow-lg shadow-neon-blue/20 group"
                  >
                    Discuss This Service
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Stat Detail Modal */}
      <AnimatePresence>
        {selectedStat && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStat(null)}
              className="absolute inset-0 bg-deep-bg/95 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-2xl glass rounded-[40px] border-border-theme shadow-2xl p-8 md:p-12"
            >
              <button
                onClick={() => setSelectedStat(null)}
                className="absolute top-8 right-8 z-20 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <div className="w-5 h-px bg-white rotate-45 absolute" />
                <div className="w-5 h-px bg-white -rotate-45 absolute" />
              </button>

              <div className="mb-10">
                <div className="text-neon-blue font-bold uppercase tracking-[0.2em] mb-4 text-xs">Achievement Detail</div>
                <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 text-gradient">{statDetails[selectedStat].title}</h3>
                <p className="text-xl text-muted leading-relaxed">{statDetails[selectedStat].subtitle}</p>
              </div>

              <div className="space-y-10 max-h-[50vh] overflow-y-auto pr-6 custom-scrollbar">
                {statDetails[selectedStat].sections.map((section, idx) => (
                  <div key={idx}>
                    <h4 className="text-gold font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-3">
                      <span className="w-8 h-px bg-gold/30" />
                      {section.title}
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      {section.items.map((item, itemIdx) => (
                        <motion.div 
                          key={itemIdx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: itemIdx * 0.1 }}
                          className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-neon-blue mt-2 shrink-0" />
                          <span className="text-muted leading-relaxed">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex justify-end">
                <button 
                  onClick={() => setSelectedStat(null)}
                  className="px-8 py-3 rounded-full border border-white/10 font-bold hover:bg-white/5 transition-all text-sm"
                >
                  Close Report
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-navy/20 border-y border-border-theme overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 9V0h2v9h9v2H11v9h-2V11H0v-2h9z' fill='%23ffffff'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px',
            backgroundPosition: 'center'
          }}
        />
        <div className="max-w-7xl mx-auto relative">
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex gap-24 whitespace-nowrap py-4"
            >
              {[...Array(3)].map((_, groupIdx) => (
                <div key={groupIdx} className="flex gap-24 shrink-0">
                  {[
                    { label: "Projects Completed", value: "250+" },
                    { label: "Expert Engineers", value: "120+" },
                    { label: "Silicon Success Rate", value: "99.9%" },
                    { label: "Global Clients", value: "45+" },
                  ].map((stat, index) => (
                    <div key={`${groupIdx}-${index}`} className="flex flex-col items-center min-w-[200px]">
                      <div className="text-4xl md:text-6xl font-display font-bold text-gold mb-2">{stat.value}</div>
                      <div className="text-muted text-xs uppercase tracking-widest font-bold">{stat.label}</div>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto glass rounded-[60px] overflow-hidden relative group border-border-theme hover:border-white/20 transition-all duration-500">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/cta-future.png"
              alt="Semiconductor R&D"
              className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[3000ms] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
          </div>

          <div className="relative z-10 px-8 py-20 md:p-24 lg:p-32 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-8">
                Build the Next Generation
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-[1.1]">
                Ready to Build <br />
                <span className="text-gradient">The Future?</span>
              </h2>
              <p className="text-xl text-muted mb-12 max-w-xl leading-relaxed">
                Partner with VLSI TECHNOLOGY for world-class semiconductor design services.
                Our team of expert engineers is ready to turn your complex silicon vision into
                market-ready, high-performance reality.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link
                  to="/contact"
                  className="bg-neon-blue text-navy px-10 py-5 rounded-full font-bold text-lg hover:bg-white transition-all shadow-2xl shadow-neon-blue/20 hover:scale-105 active:scale-95"
                >
                  Contact Our Experts
                </Link>

              </div>
            </motion.div>
          </div>

          {/* Decorative Corner Glow */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-neon-blue/10 blur-[100px] rounded-full group-hover:bg-neon-blue/20 transition-colors duration-1000" />
        </div>
      </section>
    </div>
  );
};
