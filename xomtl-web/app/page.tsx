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

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md cursor-pointer flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="max-w-xl w-full text-center space-y-8"
      >
        <Brain size={48} className="mx-auto text-red-600 animate-pulse" />
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
          "{tip}"
        </h2>
        <p className="text-gray-500 text-sm uppercase tracking-widest mt-12">Click anywhere to return to focus</p>
      </motion.div>
    </motion.div>
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
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-8 pointer-events-none select-none"
        >
          <div className="pointer-events-auto">
            <span className="text-xl font-bold tracking-tight text-white font-sans">MONK MODE</span>
          </div>

          <div className="pointer-events-auto flex items-center gap-12 text-sm font-medium tracking-widest lowercase mix-blend-difference">
            <button
              onClick={scrollToSanctuary}
              className="text-gray-500 hover:text-red-500 transition-colors opacity-80 hover:opacity-100"
            >
              tired?
            </button>
            <button
              onClick={onDistracted}
              className="text-gray-500 hover:text-red-500 transition-colors opacity-80 hover:opacity-100"
            >
              distracted?
            </button>
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
        <span className={`block text-[20vw] md:text-[16rem] font-black tracking-tighter leading-none tabular-nums transition-colors duration-700 font-mono ${isActive ? 'text-white' : 'text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-900/20'}`}>
          {formatTime(timeLeft)}
        </span>
      </motion.div>

      {/* Timer Presets */}
      {!isActive && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 mb-12"
        >
          {[15, 25, 45, 60].map((m) => (
            <button
              key={m}
              onClick={() => setTime(m)}
              className="px-4 py-2 rounded-full border border-white/10 hover:border-red-600/50 hover:bg-white/5 text-gray-500 hover:text-white text-xs font-mono transition-all"
            >
              {m}m
            </button>
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
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="sanctuary" className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#050505] border-t border-white/5 py-32 overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text Content */}
        <div className="space-y-12">
          <div className="space-y-2">
            <h4 className="text-red-900 text-[10px] font-bold tracking-[0.5em] uppercase font-sans">Wisdom Archive</h4>
          </div>

          <div className="h-[300px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="space-y-8"
              >
                <p className="text-3xl md:text-4xl text-gray-200 font-serif leading-tight">
                  "{WISE_SOULS[currentIndex].quote}"
                </p>
                <div className="space-y-1 border-l-2 border-red-900/30 pl-6">
                  <h5 className="text-xl font-bold text-white uppercase tracking-widest font-sans">{WISE_SOULS[currentIndex].name}</h5>
                  <p className="text-xs text-gray-600 font-bold uppercase tracking-widest">{WISE_SOULS[currentIndex].title}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="w-full h-px bg-white/5 relative overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 6, ease: "linear" }}
              className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-red-900 to-transparent opacity-50"
            />
          </div>
        </div>

        {/* Right: Portrait */}
        <div className="relative aspect-[3/4] md:aspect-square w-full max-w-sm mx-auto lg:max-w-none mix-blend-lighten">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 grayscale contrast-125"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://image.pollinations.ai/prompt/${encodeURIComponent(WISE_SOULS[currentIndex].prompt)}?nologo=true`}
                alt={WISE_SOULS[currentIndex].name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>
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
            <h1 className="text-[10vw] font-black uppercase text-white/5 leading-none tracking-tighter select-none blur-sm">
              Focus is the<br />Currency of Gods
            </h1>
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

        <footer className="py-24 border-t border-white/5 bg-[#020202] text-center">
          <h2 className="text-[6vw] font-black tracking-tighter text-white/5 select-none leading-none">
            MONK MODE
          </h2>
        </footer>
      </motion.div>

    </main>
  );
}