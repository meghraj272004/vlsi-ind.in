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

export const Home = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [selectedExpertise, setSelectedExpertise] = useState<typeof features[0] | null>(null);

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
            <section id="about" className="py-24 px-6 relative border-y border-border-theme bg-deep-bg/20">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">About <span className="text-gradient">Us</span></h2>
                        <p className="text-lg text-muted leading-relaxed mb-12">
                            VLSI IND is a premier semiconductor design services company. Our mission is to provide
                            unparalleled expertise in VLSI design, helping our clients bring their most
                            ambitious silicon projects to life.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                            <div className="glass p-8 rounded-3xl border-border-theme">
                                <h3 className="text-2xl font-bold mb-4 text-gold">Our Vision</h3>
                                <p className="text-muted text-sm leading-relaxed">To be the global benchmark for semiconductor design excellence, driving innovation in every chip we touch.</p>
                            </div>
                            <div className="glass p-8 rounded-3xl border-border-theme">
                                <h3 className="text-2xl font-bold mb-4 text-neon-blue">Our Mission</h3>
                                <p className="text-muted text-sm leading-relaxed">To empower the technology ecosystem with high-performance, reliable, and cost-effective VLSI solutions.</p>
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
                            className="relative w-full max-w-2xl glass p-8 md:p-12 rounded-[40px] border-border-theme shadow-2xl shadow-neon-blue/20"
                        >
                            <button
                                onClick={() => setSelectedExpertise(null)}
                                className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-[var(--text-color)]/10 backdrop-blur-md flex items-center justify-center hover:bg-[var(--text-color)]/20 transition-colors"
                            >
                                <div className="w-5 h-px bg-[var(--text-color)] rotate-45 absolute" />
                                <div className="w-5 h-px bg-[var(--text-color)] -rotate-45 absolute" />
                            </button>

                            <div className="flex flex-col md:flex-row h-full overflow-hidden rounded-[40px]">
                                <div className="hidden md:block w-1/3 relative h-[500px]">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                    <img
                                        src={selectedExpertise.image}
                                        alt={selectedExpertise.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-8 left-8 z-20">
                                        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 w-fit">
                                            {selectedExpertise.icon}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 p-8 md:p-12 overflow-y-auto">
                                    <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">
                                        {selectedExpertise.title.split(' ')[0]} <span className="text-gradient">{selectedExpertise.title.split(' ').slice(1).join(' ')}</span>
                                    </h3>

                                    <p className="text-xl text-muted leading-relaxed mb-8">
                                        {selectedExpertise.longDescription}
                                    </p>

                                    <div className="flex flex-wrap gap-3 mb-12">
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
                <div className="max-w-5xl mx-auto glass p-12 md:p-20 rounded-[40px] text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-gold/10 -z-10" />
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">Ready to Build the Future?</h2>
                    <p className="text-xl text-muted mb-12 max-w-2xl mx-auto">
                        Partner with VLSI TECHNOLOGY for world-class semiconductor design services.
                        Let's turn your vision into high-performance silicon.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex bg-gold text-navy px-10 py-5 rounded-full font-bold text-lg hover:bg-white transition-all shadow-xl shadow-gold/20"
                    >
                        Contact Our Experts
                    </Link>
                </div>
            </section>
        </div>
    );
};
