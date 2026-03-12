import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ParticleBackground, GradientBackground } from "@/src/components/Backgrounds";
import { Phone, Mail, MapPin, Linkedin, Youtube, ExternalLink, Send, CheckCircle } from "lucide-react";

const GOOGLE_FORM_URL = "https://forms.gle/GRNkgoap4dN2LnkA9";

export const Careers = () => (
  <div className="relative min-h-screen pt-40 pb-20 px-6">
    <ParticleBackground />
    <GradientBackground />
    <div className="max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">Join Our <span className="text-gradient">Team</span></h1>
        <p className="text-xl text-muted leading-relaxed max-w-2xl mx-auto">
          We are always looking for talented engineers who are passionate about
          semiconductor design. Explore our open positions and build the future with us.
        </p>
      </motion.div>

      <div className="space-y-6 text-left">
        {["Senior Physical Design Engineer", "RTL Verification Lead", "Analog Layout Specialist", "DFT Architect"].map((job, iIdx) => (
          <motion.div
            key={job}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: iIdx * 0.1 }}
            className="glass p-8 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:bg-white/10 transition-all cursor-pointer border-border-theme hover:border-white/20"
          >
            <div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-neon-blue transition-colors">{job}</h3>
              <p className="text-muted text-sm">Full-time • Remote/On-site • Bengaluru, India</p>
            </div>
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-navy px-8 py-3 rounded-full font-bold text-sm hover:bg-white transition-all flex items-center gap-2 shadow-lg shadow-gold/20"
            >
              Apply Now
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "RTL Design",
    domain: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Direct email relay — no backend API required
      // This sends the data directly to hr@vlsiind.in via FormSubmit service
      const response = await fetch("https://formsubmit.co/ajax/hr@vlsiind.in", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Accept": "application/json" 
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          domain: formData.domain || "Not specified",
          message: formData.message,
          _subject: `📩 New Website Inquiry: ${formData.service}`,
          _template: "table", // Sends the email in a nice clean table
          _captcha: "false"   // Disables the annoying captcha for smoother UX
        }),
      });

      const result = await response.json();

      if (response.ok && result.success !== "false") {
        setStatus("success");
        setResponseMsg(`Success! Your message regarding ${formData.service} has been sent directly to our HR team.`);
        setFormData({ name: "", email: "", service: "RTL Design", domain: "", message: "" });
      } else {
        throw new Error("Relay failed");
      }
    } catch (err) {
      console.error("Submission failed:", err);
      
      // Fallback: If the relay service is down, use the user's local email app
      const subject = encodeURIComponent(`Inquiry: ${formData.service}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\nDomain: ${formData.domain || "Not specified"}\n\nMessage:\n${formData.message}`
      );
      window.open(`mailto:hr@vlsiind.in?subject=${subject}&body=${body}`, "_blank");
      
      setStatus("success");
      setResponseMsg("Your email app has been opened. Please click 'Send' to complete your message to HR.");
    }
  };

  return (
    <div className="relative min-h-screen pt-40 pb-20 px-6">
      <ParticleBackground />
      <GradientBackground />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">Get in <span className="text-gradient">Touch</span></h1>
              <p className="text-xl text-muted leading-relaxed mb-12">
                Have a project in mind? Our team of experts is ready to help you
                achieve your silicon goals. Contact us today for a consultation.
              </p>
            </motion.div>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-2xl bg-neon-blue/20 flex items-center justify-center shrink-0">
                  <Phone className="text-neon-blue w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Phone</h4>
                  <p className="text-muted">+91 9187393632</p>
                  <p className="text-muted text-sm">Mon-sat</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-2xl bg-gold/20 flex items-center justify-center shrink-0">
                  <Mail className="text-gold w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Email</h4>
                  <p className="text-muted">hr@vlsiind.in</p>
                  <p className="text-muted text-sm"></p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="text-purple-400 w-6 h-6" />
                </div>
                <div className="space-y-6">



                  {/* Division 1 */}
                  <div>
                    <h4 className="font-bold text-lg mb-1">VLSI Technology – Semiconductor Division 2</h4>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=RHCS+Layout+Annapoorneshwari+Nagara+Nagarbhavi+Bengaluru+560021"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted text-sm leading-relaxed hover:text-neon-blue transition-colors underline underline-offset-2 decoration-dotted"
                    >
                      RHCS Layout, Annapoorneshwari Nagara,<br />
                      Nagarbhavi, Bengaluru – 560021
                    </a>
                  </div>

                  {/* Training Division */}
                  <div>
                    <h4 className="font-bold text-lg mb-1">Training Division</h4>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Visvesvaraya+Technological+University+Jnana+Sangama+VTU+Main+Rd+Macche+Belagavi+Karnataka+590018"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted text-sm leading-relaxed hover:text-neon-blue transition-colors underline underline-offset-2 decoration-dotted"
                    >
                      Visvesvaraya Technological University, Jnana Sangama,<br />
                      VTU Main Rd, VTU, Macche,<br />
                      Belagavi, Karnataka 590018
                    </a>
                  </div>

                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              {[
                { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", href: "https://www.linkedin.com/company/vlsitechnology/" },
                { icon: <Youtube className="w-5 h-5" />, label: "YouTube", href: "https://www.youtube.com/@vlsisemiconductorrd-division" }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-12 h-12 rounded-2xl glass flex items-center justify-center hover:bg-neon-blue/20 hover:text-neon-blue transition-all border-border-theme"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="glass p-10 md:p-12 rounded-[40px] border-border-theme relative overflow-hidden">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="h-full flex flex-col items-center justify-center text-center py-10"
                >
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                  <p className="text-muted mb-8">{responseMsg}</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="bg-white/10 hover:bg-white/20 px-8 py-3 rounded-xl transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted">Full Name</label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-border-theme rounded-xl px-4 py-3 focus:outline-none focus:border-neon-blue transition-colors text-[var(--text-color)]"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted">Email Address</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-border-theme rounded-xl px-4 py-3 focus:outline-none focus:border-neon-blue transition-colors text-[var(--text-color)]"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted">Service Interested In</label>
                    <div className="relative">
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-white/5 border border-border-theme rounded-xl px-4 py-3 focus:outline-none focus:border-neon-blue transition-colors appearance-none text-[var(--text-color)] [&>option]:bg-[var(--bg-color)] [&>option]:text-[var(--text-color)]"
                      >
                        <option value="RTL Design">RTL Design</option>
                        <option value="Physical Design">Physical Design</option>
                        <option value="DFT Services">DFT Services</option>
                        <option value="Analog Layout">Analog Layout</option>
                        <option value="FPGA Prototyping">FPGA Prototyping</option>
                        <option value="Post-Silicon Validation">Post-Silicon Validation</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted">Choose Domain</label>
                    <div className="relative">
                      <select
                        value={formData.domain}
                        onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                        className="w-full bg-white/5 border border-border-theme rounded-xl px-4 py-3 focus:outline-none focus:border-neon-blue transition-colors appearance-none text-[var(--text-color)] [&>option]:bg-[var(--bg-color)] [&>option]:text-[var(--text-color)]"
                      >
                        <option value="">-- Select your domain --</option>
                        <option value="Architect Engineer">Architect Engineer</option>
                        <option value="Embedded Design Engineer">Embedded Design Engineer</option>
                        <option value="Embedded Software Engineer">Embedded Software Engineer</option>
                        <option value="Firmware Engineer">Firmware Engineer</option>
                        <option value="FPGA Design Engineer">FPGA Design Engineer</option>
                        <option value="Nanotechnology Engineer">Nanotechnology Engineer</option>
                        <option value="NVIDIA AI Architect Engineer">NVIDIA AI Architect Engineer</option>
                        <option value="Physical Design Engineer">Physical Design Engineer</option>
                        <option value="RTL Design Engineer">RTL Design Engineer</option>
                        <option value="SoC Design Engineer">SoC Design Engineer</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted">Message</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/5 border border-border-theme rounded-xl px-4 py-3 focus:outline-none focus:border-neon-blue transition-colors h-32 text-[var(--text-color)]"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <button
                    disabled={status === "loading"}
                    className="w-full bg-gradient-to-r from-neon-blue to-gold text-navy font-bold py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-neon-blue/20 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? "Sending..." : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  {status === "error" && (
                    <p className="text-red-400 text-sm text-center mt-4">{responseMsg}</p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

