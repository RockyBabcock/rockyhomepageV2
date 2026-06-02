import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Copy,
  CheckCircle2,
  Send,
  Twitter,
  Linkedin,
  Github,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Mail,
} from "lucide-react";
import gsap from "gsap";
import { MuseumCard } from "./common/MuseumCard";
import { MuseumButton } from "./common/MuseumButton";

const TAGS = [
  {
    label: "Chat about Web3 / AI Projects",
    text: "Hi Rocky, your GitHub and website are really inspiring! I'd love to have an in-depth discussion with you regarding potential collaboration on AI projects / Web3...",
  },
  {
    label: "Spurs Fans Assemble 👽",
    text: "Hey Rocky, I saw your 'Wemby' module—I'm practically becoming an 'Alien' fan myself! I wanted to chat with you about the Spurs' championship odds for next season...",
  },
  {
    label: "Assassin’s Creed: Unity Enthusiasts",
    text: "Hey Rocky, AC Unity's parkour is unmatched. Let's talk about the best stealth routes and phantom blade tricks...",
  },
  {
    label: "Looking for More Personal Website Inspiration",
    text: "Hi Rocky, your site is amazing! I'm looking for some inspiration for my own personal website and would love to hear about your design process...",
  },
  {
    label: "Collaboration / Consultation",
    text: "Hi Rocky, I'm interested in collaborating on an upcoming project. Do you have some time to discuss potential synergies?",
  },
  {
    label: "Just a Casual Chat",
    text: "Hi Rocky! I just stumbled upon your website while browsing—it looks really interesting! Thought I'd drop you a quick line...",
  },
];

const TEMPLATES = [
  {
    label: "Collaboration Inquiry",
    text: "Hi Rocky, I'm interested in collaborating on a project related to Web3/AI. Let's discuss.",
  },
  {
    label: "Fan Message",
    text: "Hey, I’ve been following your work for a while! Love what you’ve done with the site, especially the Wemby Module.",
  },
  {
    label: "Feedback/Suggestions",
    text: "Hi Rocky, I wanted to share some feedback on your site. Love the modular design, but perhaps a few tweaks in the footer.",
  },
];

const Particles = ({ active }: { active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const speedMultiplier = active ? 5 : 1;

      particles.forEach((p, i) => {
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(192, 192, 192, ${p.alpha})`;
        ctx.fill();

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(192, 192, 192, ${0.1 * (1 - dist / 100)})`;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
    />
  );
};

export function ConnectModule() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sendCopy, setSendCopy] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [draftRestored, setDraftRestored] = useState(false);
  const [copied, setCopied] = useState(false);

  const [emailClicks, setEmailClicks] = useState(0);
  const [showEmailEasterEgg, setShowEmailEasterEgg] = useState(false);
  const [wembyEasterEgg, setWembyEasterEgg] = useState(false);

  const copyBtnRef = useRef<HTMLButtonElement>(null);

  // Auto-save drafts
  useEffect(() => {
    const savedDraft = localStorage.getItem("connect_draft");
    if (savedDraft) {
      try {
        const { name, email, message } = JSON.parse(savedDraft);
        if (name || email || message) {
          setName(name || "");
          setEmail(email || "");
          setMessage(message || "");
          setDraftRestored(true);
          setTimeout(() => setDraftRestored(false), 4000);
        }
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem(
        "connect_draft",
        JSON.stringify({ name, email, message }),
      );
    }, 1000);
    return () => clearTimeout(timeout);
  }, [name, email, message]);

  const handleTagClick = (text: string) => {
    setMessage(text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

    setIsSubmitting(true);

    // Check for WEMBY easter egg
    if (message.toUpperCase().includes("WEMBY")) {
      setWembyEasterEgg(true);
    } else {
      setWembyEasterEgg(false);
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      localStorage.removeItem("connect_draft");
      setName("");
      setEmail("");
      setMessage("");
      setSendCopy(false);
    }, 1500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("braverocky@proton.me");
    setCopied(true);
    if (navigator.vibrate) navigator.vibrate(8);

    if (copyBtnRef.current) {
      gsap.fromTo(
        copyBtnRef.current,
        { scale: 0.9 },
        { scale: 1, duration: 0.3, ease: "back.out(1.7)" },
      );
    }

    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailIconClick = () => {
    setEmailClicks((prev) => prev + 1);
    if (emailClicks + 1 >= 3) {
      setShowEmailEasterEgg(true);
      setTimeout(() => {
        setShowEmailEasterEgg(false);
        setEmailClicks(0);
      }, 5000);
    }
  };

  return (
    <div
      id="Connect"
      className="col-span-12 h-full flex flex-col"
    >
      <MuseumCard className="p-6 md:p-10 relative overflow-hidden text-white flex-1 rounded-3xl">
      <Particles active={isSubmitting || isSuccess} />

      {/* Top Hero Section */}
      <div className="relative z-10 mb-10">
        <h2 className="font-headline text-3xl md:text-4xl font-black mb-3 tracking-tight uppercase text-[var(--museum-text)]">
          Signal Room
        </h2>
        <p className="text-[var(--museum-text-muted)] text-sm md:text-base max-w-2xl mb-4">
          The museum route ends here. If you want to collaborate, discuss a project, review my work, or simply connect, open a signal channel.
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--museum-panel-elevated)] border border-[var(--museum-border)] text-xs font-mono text-[var(--museum-text-muted)]">
          <span className="w-2 h-2 rounded-full bg-[var(--museum-success)] animate-pulse" />
          Typically replies within 24 hours · 98% Reply Rate
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-10 relative z-10">
        {/* Left Side: Message Area (58%) */}
        <div className="flex-1 md:w-[58%]">
          <AnimatePresence>
            {draftRestored && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 text-xs font-mono text-green-400 bg-green-400/10 px-3 py-2 rounded-lg inline-block"
              >
                Last message draft restored.
              </motion.div>
            )}
          </AnimatePresence>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Smart Quick Tags */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Quick Topics
                </label>
                <div
                  className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide"
                  style={{ scrollbarWidth: "none" }}
                >
                  {TAGS.map((tag, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleTagClick(tag.text)}
                      className="whitespace-nowrap px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium transition-colors"
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Templates Toggle */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowTemplates(!showTemplates)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
                >
                  {showTemplates ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}
                  Or use a template directly
                </button>
                <AnimatePresence>
                  {showTemplates && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-2 space-y-2"
                    >
                      {TEMPLATES.map((tpl, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleTagClick(tpl.text)}
                          className="block w-full text-left px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 transition-colors"
                        >
                          <span className="font-bold text-white block mb-1">
                            {tpl.label}
                          </span>
                          {tpl.text}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name / Nickname (Optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-3xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-gray-600"
                />
                <input
                  type="email"
                  required
                  placeholder="braverocky@proton.me — Used to reply to you"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-3xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-gray-600"
                />
              </div>

              <textarea
                required
                rows={5}
                placeholder="What's on your mind?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-3xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-gray-600 resize-none"
              />

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sendCopy"
                  checked={sendCopy}
                  onChange={(e) => setSendCopy(e.target.checked)}
                  className="rounded border-gray-600 bg-transparent text-silver focus:ring-0 focus:ring-offset-0"
                />
                <label
                  htmlFor="sendCopy"
                  className="text-xs text-gray-400 cursor-pointer select-none"
                >
                  Send a copy of the reply to my email address
                </label>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-[10px] text-gray-500 font-mono">
                  Used solely for replies; never for marketing or sharing your
                  information.
                </p>
                <MuseumButton
                  type="submit"
                  disabled={isSubmitting || !email || !message}
                  className="w-full sm:w-auto px-8 py-3 bg-[var(--museum-text)] text-[var(--museum-bg)] hover:bg-[var(--museum-text-muted)] border-none"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" /> Open Email Channel
                    </>
                  )}
                </MuseumButton>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center p-8 bg-white/5 rounded-3xl border border-white/10"
            >
              <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Message received!</h3>
              <p className="text-gray-400 text-sm mb-6">
                Looking forward to hearing back from you~
              </p>
              {wembyEasterEgg && (
                <div className="mb-6 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 text-sm">
                  Received! Bonus Reward: Your Wemby MVP prediction has been
                  recorded 👽
                </div>
              )}
              <div className="flex flex-col gap-2 w-full max-w-xs">
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
                >
                  Send another message
                </button>
                <p className="text-xs text-gray-500 mt-4">
                  Meanwhile, feel free to{" "}
                  <a href="#Watering" className="text-gray-300 underline">
                    water my tree 🌱
                  </a>{" "}
                  or check out my{" "}
                  <a href="#GameMedia" className="text-gray-300 underline">
                    Spotify playlist
                  </a>
                  .
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Side: Contact Details (42%) */}
        <div className="md:w-[42%] flex flex-col gap-8 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-10">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
              Direct Email
            </h4>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer relative"
                  onClick={handleEmailIconClick}
                >
                  <Mail size={18} className="text-gray-300" />
                  <AnimatePresence>
                    {showEmailEasterEgg && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-white text-black text-xs p-3 rounded-3xl rounded-bl-none shadow-xl z-50 pointer-events-none"
                      >
                        ProtonMail: Security First! But actually, what I really
                        want to talk about is... what’s your favorite Balatro
                        deck? 😂
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    braverocky@proton.me
                  </p>
                  <p className="text-xs text-gray-500">
                    PGP Key available on request
                  </p>
                </div>
              </div>

              <button
                ref={copyBtnRef}
                onClick={handleCopyEmail}
                className={`w-full py-3 rounded-3xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                {copied ? (
                  <>
                    <CheckCircle2 size={16} /> Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} /> Copy Email
                  </>
                )}
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
              Other Channels
            </h4>
            <div className="flex gap-4">
              {[
                {
                  icon: Twitter,
                  label: "Twitter/X",
                  url: "https://twitter.com",
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  url: "https://linkedin.com",
                },
                {
                  icon: Github,
                  label: "GitHub",
                  url: "https://github.com/RockyBabcock",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:scale-110 transition-all duration-300"
                  title={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      </MuseumCard>
    </div>
  );
}
