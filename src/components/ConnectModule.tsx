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
      <div className="lab-card contact-portal p-8 md:p-12 relative overflow-hidden flex-1">
      <Particles active={isSubmitting || isSuccess} />

      {/* Top Hero Section */}
      <div className="relative z-10 mb-12">
        <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-[var(--lab-text)]">
          Let’s build something strange, useful, and alive.
        </h2>
        <p className="text-[var(--lab-text-soft)] text-lg md:text-xl max-w-2xl mb-6">
          Open to frontend, design engineering, AI interface, and creative web collaborations.
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-[var(--lab-border)] text-xs font-mono text-[var(--lab-text-muted)]">
          <span className="w-2 h-2 rounded-full bg-[var(--color-rainbow-green)] animate-pulse" />
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
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--lab-text-muted)]">
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
                      className="whitespace-nowrap px-4 py-2 rounded-full bg-white/60 hover:bg-white border border-[var(--lab-border)] text-xs font-medium transition-colors text-[var(--lab-text)]"
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
                  className="flex items-center gap-1 text-xs text-[var(--lab-text-soft)] hover:text-[var(--lab-text)] transition-colors"
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
                          className="block w-full text-left px-4 py-2 rounded-lg bg-white/60 hover:bg-white border border-[var(--lab-border)] text-xs text-[var(--lab-text-soft)] transition-colors"
                        >
                          <span className="font-bold text-[var(--lab-text)] block mb-1">
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
                  className="w-full bg-white/60 border border-[var(--lab-border)] rounded-3xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-rainbow-pink)] transition-colors placeholder:text-[var(--lab-text-muted)] text-[var(--lab-text)]"
                />
                <input
                  type="email"
                  required
                  placeholder="braverocky@proton.me — Used to reply to you"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/60 border border-[var(--lab-border)] rounded-3xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-rainbow-pink)] transition-colors placeholder:text-[var(--lab-text-muted)] text-[var(--lab-text)]"
                />
              </div>

              <textarea
                required
                rows={5}
                placeholder="What's on your mind?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-white/60 border border-[var(--lab-border)] rounded-3xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-rainbow-pink)] transition-colors placeholder:text-[var(--lab-text-muted)] text-[var(--lab-text)] resize-none"
              />

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sendCopy"
                  checked={sendCopy}
                  onChange={(e) => setSendCopy(e.target.checked)}
                  className="rounded border-[var(--lab-border)] bg-transparent text-[var(--color-rainbow-pink)] focus:ring-0 focus:ring-offset-0"
                />
                <label
                  htmlFor="sendCopy"
                  className="text-xs text-[var(--lab-text-soft)] cursor-pointer select-none"
                >
                  Send a copy of the reply to my email address
                </label>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-[10px] text-[var(--lab-text-muted)] font-mono">
                  Used solely for replies; never for marketing or sharing your
                  information.
                </p>
                <MuseumButton
                  type="submit"
                  disabled={isSubmitting || !email || !message}
                  className="w-full sm:w-auto px-8 py-3 bg-[var(--lab-text)] text-white hover:bg-[var(--lab-text-soft)] border-none"
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
              className="h-full flex flex-col items-center justify-center text-center p-8 bg-white/60 rounded-3xl border border-[var(--lab-border)]"
            >
              <div className="w-16 h-16 bg-[var(--color-rainbow-green)]/10 text-[var(--color-rainbow-green)] rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[var(--lab-text)]">Message received!</h3>
              <p className="text-[var(--lab-text-soft)] text-sm mb-6">
                Looking forward to hearing back from you~
              </p>
              {wembyEasterEgg && (
                <div className="mb-6 px-4 py-2 bg-[var(--color-rainbow-purple)]/10 border border-[var(--color-rainbow-purple)]/30 rounded-lg text-[var(--color-rainbow-purple)] text-sm">
                  Received! Bonus Reward: Your Wemby MVP prediction has been
                  recorded 👽
                </div>
              )}
              <div className="flex flex-col gap-2 w-full max-w-xs">
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-4 py-2 bg-white/70 hover:bg-white rounded-lg text-sm transition-colors text-[var(--lab-text)] border border-[var(--lab-border)]"
                >
                  Send another message
                </button>
                <p className="text-xs text-[var(--lab-text-muted)] mt-4">
                  Meanwhile, feel free to{" "}
                  <a href="#Watering" className="text-[var(--color-rainbow-green)] underline">
                    water my tree 🌱
                  </a>{" "}
                  or check out my{" "}
                  <a href="#GameMedia" className="text-[var(--color-rainbow-cyan)] underline">
                    Spotify playlist
                  </a>
                  .
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Side: Contact Details (42%) */}
        <div className="md:w-[42%] flex flex-col gap-8 border-t md:border-t-0 md:border-l border-[var(--lab-border)] pt-8 md:pt-0 md:pl-10">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--lab-text-muted)] mb-4">
              Direct Email
            </h4>
            <div className="bg-white/60 border border-[var(--lab-border)] rounded-3xl p-6 relative">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center cursor-pointer relative border border-[var(--lab-border)]"
                  onClick={handleEmailIconClick}
                >
                  <Mail size={18} className="text-[var(--lab-text)]" />
                  <AnimatePresence>
                    {showEmailEasterEgg && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-white text-[var(--lab-text)] border border-[var(--lab-border)] text-xs p-3 rounded-3xl rounded-bl-none shadow-xl z-50 pointer-events-none"
                      >
                        ProtonMail: Security First! But actually, what I really
                        want to talk about is... what’s your favorite Balatro
                        deck? 😂
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--lab-text)]">
                    braverocky@proton.me
                  </p>
                  <p className="text-xs text-[var(--lab-text-muted)]">
                    PGP Key available on request
                  </p>
                </div>
              </div>

              <button
                ref={copyBtnRef}
                onClick={handleCopyEmail}
                className={`w-full py-3 rounded-3xl border text-sm flex items-center justify-center gap-2 transition-all font-medium ${
                  copied
                    ? "bg-[var(--color-rainbow-green)] text-white border-transparent"
                    : "bg-white/70 hover:bg-white text-[var(--lab-text)] border-[var(--lab-border)]"
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--lab-text-muted)] mb-4">
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
                  className="w-12 h-12 rounded-full bg-white/60 border border-[var(--lab-border)] flex items-center justify-center text-[var(--lab-text-soft)] hover:text-[var(--lab-text)] hover:bg-white hover:shadow-[0_0_15px_rgba(0,0,0,0.05)] hover:scale-110 transition-all duration-300"
                  title={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
