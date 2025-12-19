'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Coffee, Play, Pause, RotateCcw, Quote, ChevronDown, Sparkles, X, Brain } from 'lucide-react';

// --- Types ---
type SoulType = {
  name: string;
  title: string;
  bio: string;
  quote: string;
  prompt: string;
};

// --- Data ---
const WISE_SOULS: SoulType[] = [
  {
    name: "Marcus Aurelius",
    title: "The Philosopher King",
    bio: "Roman Emperor. Ruled the world while mastering the inner citadel of his mind.",
    quote: "You have power over your mind - not outside events. Realize this, and you will find strength.",
    prompt: "Marcus Aurelius stoic emperor marble statue dark dramatic lighting red accents oil painting cinematic",
  },
  {
    name: "Miyamoto Musashi",
    title: "The Sword Saint",
    bio: "Undefeated samurai. Master of the two-sword style and the way of solitude.",
    quote: "Do nothing which is of no use. Once you understand the way broadly, you see it in all things.",
    prompt: "Miyamoto Musashi samurai meditation dark intense red atmosphere ink wash style",
  },
  {
    name: "Naval Ravikant",
    title: "The Modern Sage",
    bio: "A voice for the age of leverage. Teaches that happiness is a skill you develop.",
    quote: "Desire is a contract that you make with yourself to be unhappy until you get what you want.",
    prompt: "Naval Ravikant silhouette wise minimalist digital art deep blue and black futuristic zen",
  },
  {
    name: "Seneca",
    title: "The Stoic Dramatist",
    bio: "Wealthy statesman who preached the brevity of life and the value of time.",
    quote: "We suffer more often in imagination than in reality.",
    prompt: "Seneca bust roman philosopher dramatic lighting dark library background oil painting",
  },
  {
    name: "Sun Tzu",
    title: "The Strategist",
    bio: "Legendary general. Taught that the supreme art of war is to subdue the enemy without fighting.",
    quote: "In the midst of chaos, there is also opportunity.",
    prompt: "Sun Tzu ancient chinese general war room map strategic contemplative cinematic lighting",
  },
  {
    name: "Lao Tzu",
    title: "The Old Master",
    bio: "Founder of Taoism. Taught the power of yielding and the strength of softness.",
    quote: "Silence is a source of great strength.",
    prompt: "Lao Tzu ancient chinese philosopher mountain peak mist taoism ink painting",
  },
  {
    name: "Nietzsche",
    title: "The Dynamite",
    bio: "Challenged the foundations of morality. Championed the will to power and the Overman.",
    quote: "He who has a why to live for can bear almost any how.",
    prompt: "Friedrich Nietzsche intense gaze philosopher mustache dark gloomy lighting thick brushstrokes",
  },
  {
    name: "Epictetus",
    title: "The Liberated Slave",
    bio: "Born a slave, became a master of stoicism. Taught that freedom is the only worthy goal.",
    quote: "It's not what happens to you, but how you react to it that matters.",
    prompt: "Epictetus ancient greek philosopher stoic slave simple robes minimal dramatic lighting",
  },
  {
    name: "Bruce Lee",
    title: "The Dragon",
    bio: "Martial artist and philosopher. Be water, my friend. Adapt to the shape of the vessel.",
    quote: "Absorb what is useful, discard what is useless and add what is specifically your own.",
    prompt: "Bruce Lee martial arts intensity focus sweat dark background cinematic lighting",
  },
  {
    name: "Socrates",
    title: "The Gadfly",
    bio: "The father of Western philosophy. Questioned everything. Knowing that he knew nothing.",
    quote: "The unexamined life is not worth living.",
    prompt: "Socrates ancient greek athens marketplace debating oil painting classical art style",
  },
];

const ADHD_TIPS = [
  "Put your phone in another room.",
  "Drink a glass of water.",
  "Focus on your breath for 10 seconds.",
  "Write down the one thing you need to do.",
  "Put on noise-canceling headphones.",
  "Stand up and stretch for 30 seconds.",
  "Clear your physical workspace.",
  "Turn off all notifications.",
  "Set a timer for 5 minutes.",
  "Forgive yourself for getting distracted."
];

// --- Components ---

const MagnetButton = ({
  children,
  onClick,
  className = "",
  href,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouse = (e: MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    const pull = 0.4;
    setPosition({ x: x * pull, y: y * pull });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={(e: any) => handleMouse(e)}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );

  return href ? <a href={href}>{content}</a> : content;
};

const GlobalClickEffect = () => {
  const [clicks, setClicks] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const id = Date.now();
      setClicks((prev) => [...prev, { x: e.clientX, y: e.clientY, id }]);
      setTimeout(() => {
        setClicks((prev) => prev.filter((c) => c.id !== id));
      }, 600);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <AnimatePresence>
        {clicks.map((click) => (
          <motion.div
            key={click.id}
            initial={{ opacity: 0.8, scale: 0 }}
            animate={{ opacity: 0, scale: 4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ left: click.x, top: click.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-red-600/50"
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const DistractionModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [tip, setTip] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTip(ADHD_TIPS[Math.floor(Math.random() * ADHD_TIPS.length)]);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-xl cursor-pointer flex items-center justify-center p-6"
          onClick={onClose}
        >
          {/* Animated Noise Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.05, opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="max-w-2xl w-full text-center space-y-12 relative z-10"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Brain size={64} className="mx-auto text-red-600/80 filter drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]" />
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1.1] font-sans italic">
              "{tip}"
            </h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <div className="w-12 h-px bg-red-600/50 mx-auto" />
              <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] font-bold">Tap to continue path of focus</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = ({ visible, onDistracted }: { visible: boolean; onDistracted: () => void }) => {
  const scrollToSanctuary = () => {
    document.getElementById('sanctuary')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-8 pointer-events-none select-none"
        >
          <div className="pointer-events-auto">
            <MagnetButton>
              <span className="text-xl font-black tracking-tight text-white font-sans">MONK MODE</span>
            </MagnetButton>
          </div>

          <div className="pointer-events-auto flex items-center gap-6 md:gap-12 text-[10px] md:text-sm font-bold tracking-[0.2em] uppercase mix-blend-difference">
            <MagnetButton onClick={scrollToSanctuary}>
              <button className="text-zinc-500 hover:text-white transition-colors">
                tired?
              </button>
            </MagnetButton>
            <MagnetButton onClick={onDistracted}>
              <button className="text-zinc-500 hover:text-white transition-colors">
                distracted?
              </button>
            </MagnetButton>
            <MagnetButton href="/login">
              <button className="px-6 py-2 border border-white/10 hover:border-red-600/50 hover:bg-white/5 transition-all duration-300">
                LOGIN
              </button>
            </MagnetButton>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

const Timer = ({ onToggleMode, isMonkMode }: { onToggleMode: (active: boolean) => void; isMonkMode: boolean }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      onToggleMode(false);
      if (mode === 'focus') {
        setMode('break');
        setTimeLeft(5 * 60);
      } else {
        setMode('focus');
        setTimeLeft(25 * 60);
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, timeLeft, mode, onToggleMode]);

  const toggleTimer = () => {
    const newState = !isActive;
    setIsActive(newState);
    onToggleMode(newState);
  };

  const setTime = (minutes: number) => {
    if (!isActive) {
      setTimeLeft(minutes * 60);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center">
      <motion.div layout className="relative">
        <motion.span
          animate={isActive ? {
            textShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 20px rgba(255,255,255,0.2)", "0 0 0px rgba(255,255,255,0)"]
          } : {}}
          transition={{ duration: 4, repeat: Infinity }}
          className={`block text-[22vw] md:text-[18rem] font-black tracking-tighter leading-none tabular-nums transition-colors duration-700 font-mono ${isActive ? 'text-white' : 'text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-800'}`}
        >
          {formatTime(timeLeft)}
        </motion.span>
      </motion.div>

      {/* Timer Presets */}
      {!isActive && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 mb-12"
        >
          {[15, 25, 45, 60].map((m) => (
            <MagnetButton key={m}>
              <button
                onClick={() => setTime(m)}
                className="px-5 py-2 rounded-none border border-white/5 hover:border-white/20 hover:bg-white/5 text-zinc-500 hover:text-white text-[10px] font-bold tracking-widest transition-all"
              >
                {m}M
              </button>
            </MagnetButton>
          ))}
        </motion.div>
      )}

      <div className="flex items-center gap-8">
        <button
          onClick={toggleTimer}
          className={`group flex items-center gap-4 px-12 py-5 rounded-none font-bold tracking-[0.2em] text-sm uppercase transition-all duration-500 font-sans ${isActive ? 'bg-transparent border-b border-white/20 text-white hover:border-white' : 'bg-white text-black hover:bg-red-600 hover:text-white'}`}
        >
          {isActive ? 'PAUSE' : 'START'}
        </button>
      </div>
    </div>
  );
};

const Sanctuary = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % WISE_SOULS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="sanctuary" className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#050505] border-t border-white/5 py-32 overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-red-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text Content */}
        <div className="space-y-16">
          <div className="space-y-4">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "40px" }}
              className="h-1 bg-red-600/50"
            />
            <h4 className="text-zinc-500 text-[10px] font-bold tracking-[0.6em] uppercase font-sans">Wisdom Archive</h4>
          </div>

          <div className="h-[350px] relative flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-10"
              >
                <Quote className="text-red-900/20" size={48} />
                <p className="text-3xl md:text-5xl text-white font-serif leading-tight tracking-tight italic">
                  {WISE_SOULS[currentIndex].quote}
                </p>
                <div className="space-y-2 pl-6 border-l border-red-900/40">
                  <h5 className="text-xl font-black text-white uppercase tracking-widest font-sans">{WISE_SOULS[currentIndex].name}</h5>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em]">{WISE_SOULS[currentIndex].title}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="w-full h-px bg-white/5 relative overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 8, ease: "linear" }}
              className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-red-600/30 to-transparent"
            />
          </div>
        </div>

        {/* Right: Portrait */}
        <div className="relative aspect-square w-full max-w-md mx-auto lg:max-w-none group">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.1, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: -2 }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              className="absolute inset-0 rounded-none overflow-hidden"
            >
              <div className="absolute inset-0 bg-red-900/10 mix-blend-color z-10" />
              <img
                src={`https://image.pollinations.ai/prompt/${encodeURIComponent(WISE_SOULS[currentIndex].prompt)}?nologo=true`}
                alt={WISE_SOULS[currentIndex].name}
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-20" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent z-20" />
            </motion.div>
          </AnimatePresence>

          {/* Framer Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-red-600/20" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-red-600/20" />
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const [monkMode, setMonkMode] = useState(false);
  const [distractedOpen, setDistractedOpen] = useState(false);

  return (
    <main className={`relative min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-red-900 selection:text-white`}>
      <GlobalClickEffect />
      <DistractionModal isOpen={distractedOpen} onClose={() => setDistractedOpen(false)} />

      {/* Organic Background Pulse */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_50%_50%,rgba(50,0,0,0.1),transparent_50%)]"
        />
      </div>

      <Navbar visible={!monkMode} onDistracted={() => setDistractedOpen(true)} />

      {/* Hero Section */}
      <section className={`relative min-h-screen flex flex-col items-center justify-center transition-all duration-1000 ${monkMode ? 'py-0' : 'py-20'}`}>

        {/* God's Currency Watermark */}
        {!monkMode && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0 mix-blend-overlay">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2 }}
              className="text-[12vw] font-black uppercase text-white/5 leading-none tracking-tighter select-none blur-sm"
            >
              Focus is the<br />Currency of Gods
            </motion.h1>
          </div>
        )}

        <Timer onToggleMode={setMonkMode} isMonkMode={monkMode} />

        {!monkMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-12 flex flex-col items-center gap-2"
          >
            <ChevronDown className="text-red-900/40 animate-pulse" size={24} />
          </motion.div>
        )}
      </section>

      {/* Interactive Content */}
      <motion.div
        animate={{ opacity: monkMode ? 0 : 1, y: monkMode ? 100 : 0, pointerEvents: monkMode ? 'none' : 'auto' }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <Sanctuary />

        <footer className="py-32 border-t border-white/5 bg-[#020202] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-red-600/50 to-transparent" />
            <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-red-600/50 to-transparent" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-12">
            <h2 className="text-[10vw] font-black tracking-tighter text-white/5 select-none leading-none">
              MONK MODE
            </h2>

            <div className="flex gap-8 text-[10px] font-bold tracking-[0.3em] text-zinc-600 uppercase">
              <span className="hover:text-zinc-400 cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-zinc-400 cursor-pointer transition-colors">Terms</span>
              <span className="hover:text-zinc-400 cursor-pointer transition-colors">Protocol</span>
            </div>

            <p className="text-zinc-800 text-[9px] tracking-[0.2em] uppercase font-bold">
              © 2024 MONK MODE. BUIDL WITH FOCUS.
            </p>
          </div>
        </footer>
      </motion.div>

    </main>
  );
}