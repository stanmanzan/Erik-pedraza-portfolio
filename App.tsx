/**
 * App.tsx
 *
 * Main entry point for the Fintech Professional Portfolio.
 * Author: Erik Pedraza García
 */

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import {
  Code2, Database, Mail, Github, Linkedin, MapPin, Terminal, Briefcase,
  GraduationCap, Award, Zap, TrendingUp, BarChart3, ExternalLink, ChevronRight,
  ChevronDown, Building2, ShieldCheck, Activity, Server, Lock, Cpu as CpuIcon,
  User, Lightbulb, Workflow, Search, MessageSquareCode, Play, RotateCcw,
  Monitor, Dna, ArrowUp, ArrowDown, ArrowLeft, ArrowRight,
  ArrowUpCircle, Hash, Command, Star, FileText, X
} from 'lucide-react';
import { PORTFOLIO_DATA } from './constants';
import { Language } from './types';

// ==========================================
// TETRIS GAME LOGIC & CONSTANTS
// ==========================================

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 25;

const TETROMINOS: Record<string, { shape: number[][], color: string }> = {
  I: { shape: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], color: '#c5a059' },
  J: { shape: [[1, 0, 0], [1, 1, 1], [0, 0, 0]], color: '#c5a059' },
  L: { shape: [[0, 0, 1], [1, 1, 1], [0, 0, 0]], color: '#c5a059' },
  O: { shape: [[1, 1], [1, 1]], color: '#c5a059' },
  S: { shape: [[0, 1, 1], [1, 1, 0], [0, 0, 0]], color: '#c5a059' },
  T: { shape: [[0, 1, 0], [1, 1, 1], [0, 0, 0]], color: '#c5a059' },
  Z: { shape: [[1, 1, 0], [0, 1, 1], [0, 0, 0]], color: '#c5a059' },
};

const randomTetromino = () => {
  const keys = Object.keys(TETROMINOS);
  const key = keys[Math.floor(Math.random() * keys.length)];
  return { ...TETROMINOS[key], pos: { x: Math.floor(COLS / 2) - 1, y: 0 } };
};

const DataChompsTetris: React.FC<{ labels: any }> = ({ labels }) => {
  const [active, setActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [board, setBoard] = useState<string[][]>(Array.from({ length: ROWS }, () => Array(COLS).fill('')));
  const [piece, setPiece] = useState(randomTetromino());
  const [dropTime, setDropTime] = useState(800);

  const requestRef = useRef<number>(null);
  const lastTimeRef = useRef<number>(0);

  const isValidMove = (p: any, b: string[][], moveX: number, moveY: number, rotatedShape?: number[][]) => {
    const shape = rotatedShape || p.shape;
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const newX = p.pos.x + x + moveX;
          const newY = p.pos.y + y + moveY;
          if (newX < 0 || newX >= COLS || newY >= ROWS || (newY >= 0 && b[newY][newX])) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const rotate = (matrix: number[][]) => {
    return matrix[0].map((_, index) => matrix.map(col => col[index]).reverse());
  };

  const clearLines = useCallback((b: string[][]) => {
    const newBoard = b.filter(row => row.some(cell => !cell));
    const linesCleared = ROWS - newBoard.length;
    if (linesCleared > 0) {
      setScore(s => s + (linesCleared * 100));
      const filler = Array.from({ length: linesCleared }, () => Array(COLS).fill(''));
      return [...filler, ...newBoard];
    }
    return b;
  }, []);

  const drop = useCallback(() => {
    if (isValidMove(piece, board, 0, 1)) {
      setPiece(prev => ({ ...prev, pos: { ...prev.pos, y: prev.pos.y + 1 } }));
    } else {
      const newBoard = board.map(row => [...row]);
      piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            const boardY = piece.pos.y + y;
            const boardX = piece.pos.x + x;
            if (boardY >= 0) newBoard[boardY][boardX] = piece.color;
          }
        });
      });

      const stabilizedBoard = clearLines(newBoard);
      setBoard(stabilizedBoard);

      const nextPiece = randomTetromino();
      if (!isValidMove(nextPiece, stabilizedBoard, 0, 0)) {
        setGameOver(true);
      } else {
        setPiece(nextPiece);
      }
    }
  }, [piece, board, clearLines]);

  // Touch Controls Handlers
  const moveLeft = () => {
    if (isValidMove(piece, board, -1, 0)) setPiece(prev => ({ ...prev, pos: { ...prev.pos, x: prev.pos.x - 1 } }));
  };

  const moveRight = () => {
    if (isValidMove(piece, board, 1, 0)) setPiece(prev => ({ ...prev, pos: { ...prev.pos, x: prev.pos.x + 1 } }));
  };

  const moveDown = () => {
    drop();
  };

  const rotatePiece = () => {
    const rotated = rotate(piece.shape);
    if (isValidMove(piece, board, 0, 0, rotated)) setPiece(prev => ({ ...prev, shape: rotated }));
  };

  const update = useCallback((time: number) => {
    if (gameOver) return;
    const deltaTime = time - lastTimeRef.current;
    if (deltaTime > dropTime) {
      drop();
      lastTimeRef.current = time;
    }
    requestRef.current = requestAnimationFrame(update);
  }, [drop, dropTime, gameOver]);

  useEffect(() => {
    if (active && !gameOver) {
      requestRef.current = requestAnimationFrame(update);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [active, gameOver, update]);

  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (!active || gameOver) return;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) e.preventDefault();

      switch (e.key) {
        case 'ArrowLeft': moveLeft(); break;
        case 'ArrowRight': moveRight(); break;
        case 'ArrowDown': moveDown(); break;
        case 'ArrowUp': rotatePiece(); break;
      }
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [active, gameOver, piece, board, drop]);

  const resetGame = () => {
    setBoard(Array.from({ length: ROWS }, () => Array(COLS).fill('')));
    setPiece(randomTetromino());
    setScore(0);
    setGameOver(false);
    lastTimeRef.current = 0;
  };

  return (
    <div className="relative w-full max-w-[600px] mx-auto bg-slate-900 border border-fintechGold/10 rounded-xl overflow-hidden shadow-2xl group/game font-mono animate-slide-up delay-500">
      <div className="bg-fintechGold/5 border-b border-fintechGold/10 p-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Monitor size={12} className="text-fintechGold" />
          <span className="text-[13px] tracking-[0.3em] text-fintechGold uppercase font-bold">STABILIZER_V01 // DATA_CHOMPS</span>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <div className="text-[13px] text-slate-400 tracking-widest uppercase">{labels.score}</div>
            <div className="text-[20px] text-fintechGold font-bold leading-none">{score.toString().padStart(5, '0')}</div>
          </div>
        </div>
      </div>

      <div className="relative h-[550px] bg-slate-950 flex items-center justify-center p-2">
         <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(#c5a059 1px, transparent 1px), linear-gradient(90deg, #c5a059 1px, transparent 1px)',
            backgroundSize: `${BLOCK_SIZE}px ${BLOCK_SIZE}px`
          }}></div>

        {!active ? (
          <div className="text-center p-4 relative z-20">
            <div className="mb-4 flex justify-center">
              <div className="p-3 rounded-full bg-fintechGold/5 border border-fintechGold/20 animate-pulse">
                <Workflow size={32} className="text-fintechGold" />
              </div>
            </div>
            <p className="text-slate-400 text-[15px] mb-6 leading-relaxed uppercase tracking-widest px-4">
              {labels.desc}
            </p>
            <button
              onClick={() => setActive(true)}
              className="bg-fintechGold text-slate-900 px-8 py-3 text-[13px] font-bold tracking-[0.2em] uppercase rounded hover:bg-white transition-all shadow-[0_0_15px_rgba(197,160,89,0.2)] flex items-center gap-2 mx-auto"
            >
              <Play size={12} fill="currentColor" />
              {labels.init}
            </button>
          </div>
        ) : (
          <div className="relative w-[250px] h-[500px] border border-slate-700/30 bg-slate-900/80">
            {board.map((row, y) => row.map((cell, x) => (
               cell && (
                 <div
                   key={`cell-${x}-${y}`}
                   className="absolute border border-black/20"
                   style={{
                     left: x * BLOCK_SIZE,
                     top: y * BLOCK_SIZE,
                     width: BLOCK_SIZE,
                     height: BLOCK_SIZE,
                     backgroundColor: cell,
                     boxShadow: 'inset 0 0 5px rgba(0,0,0,0.2)'
                   }}
                 />
               )
            )))}
            {piece.shape.map((row, y) => row.map((val, x) => (
              val ? (
                <div
                  key={`piece-${x}-${y}`}
                  className="absolute border border-black/20 shadow-[0_0_8px_rgba(197,160,89,0.3)]"
                  style={{
                    left: (piece.pos.x + x) * BLOCK_SIZE,
                    top: (piece.pos.y + y) * BLOCK_SIZE,
                    width: BLOCK_SIZE,
                    height: BLOCK_SIZE,
                    backgroundColor: piece.color
                  }}
                />
              ) : null
            )))}
            {gameOver && (
              <div className="absolute inset-0 z-30 bg-slate-900/95 flex flex-col items-center justify-center animate-in fade-in duration-500 backdrop-blur-sm">
                <div className="text-rose-500 text-[15px] tracking-[0.4em] mb-4 font-bold flex items-center gap-2 text-center px-4">
                  <Zap size={14} />
                  {labels.breach}
                </div>
                <div className="text-white text-3xl font-bold mb-6">{score}</div>
                <button
                  onClick={resetGame}
                  className="border border-fintechGold text-fintechGold px-6 py-2.5 text-[13px] font-bold tracking-[0.2em] uppercase rounded hover:bg-fintechGold hover:text-slate-900 transition-all flex items-center gap-2"
                >
                  <RotateCcw size={12} />
                  {labels.restart}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Desktop Controls Hint */}
        {active && !gameOver && (
           <div className="hidden md:flex absolute right-4 bottom-4 flex-col gap-2 opacity-30 group-hover/game:opacity-60 transition-opacity">
              <div className="flex gap-1 justify-center"><div className="p-1 border border-slate-500/20 rounded"><ArrowUp size={10} className="text-slate-400"/></div></div>
              <div className="flex gap-1">
                 <div className="p-1 border border-slate-500/20 rounded"><ArrowLeft size={10} className="text-slate-400"/></div>
                 <div className="p-1 border border-slate-500/20 rounded"><ArrowDown size={10} className="text-slate-400"/></div>
                 <div className="p-1 border border-slate-500/20 rounded"><ArrowRight size={10} className="text-slate-400"/></div>
              </div>
           </div>
        )}

        {/* Mobile Touch Controls */}
        {active && !gameOver && (
           <div className="md:hidden absolute inset-x-0 bottom-4 flex justify-center gap-8 z-30 px-4">
              <button
                className="w-12 h-12 bg-slate-800/80 border border-fintechGold/30 rounded-full flex items-center justify-center active:bg-fintechGold/20"
                onClick={rotatePiece}
              >
                <RotateCcw size={20} className="text-fintechGold" />
              </button>

              <div className="flex gap-2">
                <button
                  className="w-12 h-12 bg-slate-800/80 border border-slate-600/50 rounded-full flex items-center justify-center active:bg-slate-700"
                  onClick={moveLeft}
                >
                  <ArrowLeft size={20} className="text-slate-300" />
                </button>
                <button
                  className="w-12 h-12 bg-slate-800/80 border border-slate-600/50 rounded-full flex items-center justify-center active:bg-slate-700"
                  onClick={moveDown}
                >
                  <ArrowDown size={20} className="text-slate-300" />
                </button>
                <button
                  className="w-12 h-12 bg-slate-800/80 border border-slate-600/50 rounded-full flex items-center justify-center active:bg-slate-700"
                  onClick={moveRight}
                >
                  <ArrowRight size={20} className="text-slate-300" />
                </button>
              </div>
           </div>
        )}
      </div>

      <div className="bg-slate-900/90 border-t border-slate-700/30 p-2 flex items-center justify-between text-[11px] text-slate-500 tracking-widest uppercase font-black">
          <div className="flex items-center gap-2">
             <div className={`w-1 h-1 rounded-full ${gameOver ? 'bg-rose-500' : 'bg-emerald-500'} animate-pulse`}></div>
             {gameOver ? 'STACK_OVERFLOW' : 'NODE_STABLE'}
          </div>
          <div>LATENCY: 4.2ms</div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('EN');
  const [mounted, setMounted] = useState(false);
  const [activeContact, setActiveContact] = useState<{label: string, value: string} | null>(null);
  const [activeStack, setActiveStack] = useState<string | null>(null);
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  const aboutRef = useRef<HTMLElement>(null);
  const companyRef = useRef<HTMLElement>(null);
  const highlightsRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const educationRef = useRef<HTMLElement>(null);
  const labsRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const content = useMemo(() => {
    return lang === 'EN' ? PORTFOLIO_DATA.en : PORTFOLIO_DATA.es;
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => prev === 'EN' ? 'ES' : 'EN');
  };

  const toggleStack = (section: string) => {
    setActiveStack(prev => prev === section ? null : section);
  };

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const openCert = (certName: string) => {
    setSelectedCert(certName);
  };

  const closeCert = () => {
    setSelectedCert(null);
  };

  // Construct the image path using Vite's base URL handling
  const profileImgPath = `${import.meta.env.BASE_URL}Perfil.jpg`;

  return (
    <div className={`flex flex-col items-center justify-start md:justify-center w-full min-h-screen md:min-h-screen p-0 transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'} bg-slate-950`}>

      {/* Main Container Card */}
      <div className="relative w-full max-w-[96vw] bg-slate-900 border-0 md:border md:border-slate-700/30 rounded-none md:rounded-xl shadow-none md:shadow-[0_0_80px_rgba(15,23,42,0.6)] flex flex-col md:flex-row overflow-hidden md:overflow-hidden min-h-fit md:min-h-0 md:h-[92vh] group">

        <div className="scanline opacity-30"></div>

        {/* Sidebar */}
        <aside className="w-full md:w-[400px] lg:w-[450px] bg-slate-900 border-b md:border-b-0 md:border-r border-slate-700/30 p-4 md:p-6 lg:p-8 flex flex-col shrink-0 relative z-20 overflow-y-auto md:overflow-y-auto no-scrollbar animate-slide-up delay-100">

          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse"></div>
                <span className="text-[12px] font-mono text-emerald-500 tracking-widest uppercase font-bold">Node_Active</span>
             </div>
             <button
                onClick={toggleLanguage}
                className="px-3 py-1 bg-slate-800 border border-fintechGold/20 text-fintechGold font-mono text-[12px] tracking-widest hover:border-fintechGold hover:bg-fintechGold hover:text-slate-900 transition-all duration-300 rounded uppercase font-bold"
              >
                {lang}
              </button>
          </div>

          <div className="flex flex-col items-center mb-8">
            <div className="relative w-56 h-56 mb-5 group/profile shrink-0 overflow-hidden rounded-full border-4 border-slate-900">
              <div className="absolute -inset-1 border border-fintechGold/10 rounded-full animate-spin-slow opacity-40" style={{ animationDuration: '30s' }}></div>
              <div className="absolute inset-0 border border-fintechGold/30 rounded-full group-hover/profile:border-fintechGold transition-colors duration-500 z-20 pointer-events-none"></div>
              <img
                src={profileImgPath}
                alt="Erik Pedraza García"
                className="w-full h-full object-cover grayscale brightness-110 relative z-10 transition-all duration-500 group-hover/profile:grayscale-0"
              />
              <div className="absolute bottom-1 right-1 bg-fintechGold p-1.5 rounded-full z-30 shadow-lg">
                <ShieldCheck size={14} className="text-slate-900" />
              </div>
            </div>
            <div className="flex flex-col items-center text-center mt-2">
               <span className="text-slate-500 font-mono text-[11px] tracking-[0.3em] uppercase mb-1">AUTH: EXECUTIVE</span>
               <span className="text-slate-300 font-mono text-[12px] tracking-widest uppercase border border-slate-700/50 px-4 py-1.5 rounded bg-slate-800/50">
                ID // 0xBBVA_EPG
               </span>
            </div>
          </div>

          {/* Personal Bio [The Individual] - EXPAND ON HOVER */}
          <div className="mb-8 px-2 group relative">
            <h4 className="text-fintechGold/60 font-mono text-[12px] tracking-[0.4em] uppercase mb-4 flex items-center gap-2 font-bold border-b border-slate-800 pb-2">
              <User size={12} />
              {lang === 'EN' ? 'THE INDIVIDUAL' : 'EL INDIVIDUO'}
            </h4>
            <div className="relative">
              <p className="text-slate-400 text-[14px] leading-relaxed italic border-l border-slate-700 pl-4 max-h-[4.5rem] md:max-h-[6rem] overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-[20rem]">
                {content.personalBio}
              </p>
              <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-12 md:h-16 bg-gradient-to-t from-slate-900 to-transparent transition-opacity duration-500 group-hover:opacity-0"></div>
            </div>
          </div>

          <div className="mb-10 flex-grow">
            <h3 className="text-fintechGold/50 font-mono text-[13px] tracking-[0.4em] uppercase mb-8 border-b border-slate-700/30 pb-2 flex items-center gap-2 font-bold">
              <Activity size={14} />
              {content.sections.skills}
            </h3>
            <div className="space-y-6">

              <div>
                 <div
                    className={`cursor-pointer text-slate-500 text-[11px] tracking-widest uppercase mb-2 font-black flex items-center justify-between gap-2 border-b border-slate-800/50 pb-2 hover:text-fintechGold transition-colors ${activeStack === 'backend' ? 'text-fintechGold' : ''}`}
                    onClick={() => toggleStack('backend')}
                 >
                    <div className="flex items-center gap-2">
                        <Workflow size={10} /> Backend_Systems
                    </div>
                    <ChevronDown size={12} className={`transition-transform duration-300 opacity-50 ${activeStack === 'backend' ? 'rotate-180' : ''}`} />
                 </div>
                 <div className={`overflow-hidden transition-all duration-700 ease-in-out space-y-4 ${activeStack === 'backend' ? 'max-h-[1000px] opacity-100 pt-2' : 'max-h-0 opacity-0'}`}>
                    {content.technicalSkills.backend.map((skill, idx) => (
                      <StackIconItem
                        key={idx}
                        icon={skill.name.includes('JAVA') ? <Terminal size={14} /> : <Code2 size={14} />}
                        name={skill.name}
                        level={skill.level}
                        experience={skill.experience}
                        color="bg-fintechGold"
                      />
                    ))}
                 </div>
              </div>

              <div>
                 <div
                    className={`cursor-pointer text-slate-500 text-[11px] tracking-widest uppercase mb-2 font-black flex items-center justify-between gap-2 border-b border-slate-800/50 pb-2 hover:text-fintechGold transition-colors ${activeStack === 'data' ? 'text-fintechGold' : ''}`}
                    onClick={() => toggleStack('data')}
                 >
                    <div className="flex items-center gap-2">
                        <Database size={10} /> Data_Architecture
                    </div>
                    <ChevronDown size={12} className={`transition-transform duration-300 opacity-50 ${activeStack === 'data' ? 'rotate-180' : ''}`} />
                 </div>
                 <div className={`overflow-hidden transition-all duration-700 ease-in-out space-y-4 ${activeStack === 'data' ? 'max-h-[1000px] opacity-100 pt-2' : 'max-h-0 opacity-0'}`}>
                    {content.technicalSkills.data.map((skill, idx) => (
                      <StackIconItem
                        key={idx}
                        icon={skill.name.includes('ORACLE') ? <Database size={14} /> : <Server size={14} />}
                        name={skill.name}
                        level={skill.level}
                        experience={skill.experience}
                        color="bg-fintechGold"
                      />
                    ))}
                 </div>
              </div>

            </div>
          </div>

          <div className="mt-auto border-t border-slate-700/30 pt-6">
             <div className="grid grid-cols-4 gap-2 mb-4">
                <MiniContactLink
                  icon={<Mail size={16} />}
                  onHover={() => setActiveContact({label: 'CORPORATE_MAIL', value: content.contactLabels.email})}
                  onLeave={() => setActiveContact(null)}
                  href={`mailto:${content.contactLabels.email}`}
                />
                <MiniContactLink
                  icon={<Linkedin size={16} />}
                  onHover={() => setActiveContact({label: 'PRO_NETWORK', value: 'linkedin.com/in/erik-pedraza'})}
                  onLeave={() => setActiveContact(null)}
                  href="https://linkedin.com"
                />
                <MiniContactLink
                  icon={<Github size={16} />}
                  onHover={() => setActiveContact({label: 'DEVELOPER_GIT', value: 'github.com/erik-chomps'})}
                  onLeave={() => setActiveContact(null)}
                  href="https://github.com"
                />
                <MiniContactLink
                  icon={<MapPin size={16} />}
                  onHover={() => setActiveContact({label: 'CURRENT_GEO', value: content.contactLabels.location})}
                  onLeave={() => setActiveContact(null)}
                />
             </div>

             <div className="h-10 bg-slate-800/30 border border-slate-700/30 rounded p-2 flex flex-col justify-center overflow-hidden relative">
                <div className={`transition-all duration-200 ${activeContact ? 'opacity-100 transform-none' : 'opacity-10 translate-y-1'}`}>
                  <div className="text-fintechGold/70 font-mono text-[11px] tracking-[0.2em] uppercase mb-0.5">
                    {activeContact ? activeContact.label : 'STREAMS_IDLE...'}
                  </div>
                  <div className="text-slate-400 font-mono text-[12px] truncate">
                    {activeContact ? activeContact.value : 'Awaiting input_'}
                  </div>
                </div>
                {activeContact && (
                   <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-10">
                      <Lock size={10} className="text-fintechGold" />
                   </div>
                )}
             </div>
          </div>
        </aside>

        {/* Main Body */}
        <main ref={mainRef} className="flex-1 overflow-y-auto overflow-x-hidden p-3 md:p-4 lg:p-6 relative scroll-smooth bg-gradient-to-br from-slate-900 to-slate-800 no-scrollbar">

          <header className="mb-8 relative animate-slide-up delay-200">
            <div className="absolute -top-6 -left-6 text-[80px] font-bold text-slate-800/20 select-none uppercase font-mono tracking-tighter hidden lg:block">
              EPG
            </div>
            <div className="mb-4 flex items-center gap-3">
                <span className="text-fintechGold font-mono text-[14px] tracking-[0.5em] uppercase font-bold opacity-60">Software Associate II // BBVA</span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-fintechGold/10 to-transparent"></div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-100 tracking-[0.3em] mb-6 leading-none uppercase font-mono cursor-default">
              {PORTFOLIO_DATA.name.split(' ')[0]}<br/>
              <span className="text-fintechGold">{PORTFOLIO_DATA.name.split(' ').slice(1).join(' ')}</span>
            </h1>
            <div className="flex flex-col md:flex-row md:items-center gap-6">
               <div className="h-[2px] w-16 bg-fintechGold/60 shadow-[0_0_15px_rgba(197,160,89,0.3)]"></div>
               <span className="text-fintechGold/70 font-mono text-[15px] md:text-base tracking-[0.4em] uppercase font-bold">
                  {content.role}
               </span>
            </div>
          </header>

          <section ref={aboutRef} className="mb-16 animate-slide-up delay-300">
            <SectionTitle icon={<Search size={18}/>} text={content.sections.about} />
            <div className="relative group/about">
              <div className="absolute -inset-4 bg-fintechGold/[0.01] border border-fintechGold/5 rounded-xl scale-95 opacity-0 group-hover/about:scale-100 group-hover/about:opacity-100 transition-all duration-500"></div>
              <p className="text-slate-300 text-base md:text-lg lg:text-xl leading-relaxed font-light border-l-2 border-fintechGold/40 pl-8 max-w-4xl italic relative z-10">
                {content.aboutText}
              </p>
            </div>
          </section>

          <section ref={companyRef} className="mb-16 animate-slide-up delay-400">
            <SectionTitle icon={<Lightbulb size={18}/>} text={content.sections.company} />
            <div className="relative p-8 md:p-10 bg-slate-800/20 border border-fintechGold/10 rounded-xl overflow-hidden group/card hover:border-fintechGold/30 transition-all duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-5 hidden xl:block text-slate-500">
                <Server size={160} />
              </div>
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                  <div>
                    <div className="flex items-center gap-4 mb-1">
                       <h3 className="text-fintechGold font-mono text-xl md:text-2xl tracking-widest font-bold uppercase">
                        {content.companyHighlight.name}
                       </h3>
                       <span className="px-2 py-0.5 bg-fintechGold/10 text-fintechGold text-[12px] font-mono rounded border border-fintechGold/20 animate-pulse">
                          DEV_PHASE: ACTIVE
                       </span>
                    </div>
                    <div className="flex items-center gap-3">
                       <Zap size={10} className="text-fintechGold/50" />
                       <p className="text-slate-500 font-mono text-[15px] tracking-widest uppercase font-bold">
                        {content.companyHighlight.role}
                       </p>
                    </div>
                  </div>
                  <a href={`https://${content.companyHighlight.website}`} target="_blank" rel="noreferrer" className="w-fit bg-fintechGold/5 hover:bg-fintechGold text-fintechGold hover:text-slate-900 transition-all duration-300 font-mono text-[12px] tracking-widest border border-fintechGold/20 px-6 py-2 rounded uppercase flex items-center gap-3 font-bold">
                    DOMAIN_PREVIEW
                    <ExternalLink size={14} />
                  </a>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700/30 relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-fintechGold/20"></div>
                  <p className="text-slate-400 text-base md:text-lg leading-relaxed italic max-w-4xl font-light">
                    "{content.companyHighlight.mission}"
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section ref={highlightsRef} className="mb-16 animate-slide-up delay-500">
            <SectionTitle icon={<Star size={18}/>} text={content.sections.highlights} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.highlights.map((highlight, i) => (
                <div key={i} className="p-5 bg-slate-800/30 border border-slate-700/50 rounded hover:border-fintechGold/30 transition-all group/highlight">
                   <div className="flex gap-4">
                      <div className="mt-1 text-fintechGold/50 group-hover/highlight:text-fintechGold transition-colors">
                         <Zap size={16} />
                      </div>
                      <p className="text-slate-400 text-[13px] leading-relaxed" dangerouslySetInnerHTML={{ __html: highlight }}></p>
                   </div>
                </div>
              ))}
            </div>
          </section>

          <section ref={experienceRef} className="mb-16 animate-slide-up delay-500">
            <SectionTitle icon={<Workflow size={18}/>} text={content.sections.experience} />
            <div className="space-y-12 pl-6">
              {content.experience.map((exp, i) => (
                <div key={i} className="relative pl-12 border-l border-slate-700/50 group/item py-1">
                  <div className="absolute -left-[5.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-600 group-hover/item:border-fintechGold group-hover/item:bg-fintechGold transition-all duration-300"></div>
                  <div className="font-mono text-[14px] text-fintechGold/50 mb-2 tracking-[0.3em] font-bold">{exp.year}</div>
                  <h4 className="text-slate-100 text-lg md:text-xl font-bold tracking-wide uppercase mb-1 group-hover/item:text-fintechGold transition-colors">{exp.title}</h4>
                  <div className="text-slate-500 text-[15px] font-mono mb-4 uppercase tracking-widest font-medium flex items-center gap-2">
                    <Building2 size={12} />
                    {exp.company}
                  </div>
                  <p className="text-slate-400 text-base md:text-lg max-w-4xl leading-relaxed italic border-l border-slate-700/30 pl-6 group-hover/item:text-slate-300 transition-colors">
                    {exp.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section ref={educationRef} className="mb-16 grid grid-cols-1 xl:grid-cols-2 gap-16 animate-slide-up delay-500">
            <div>
               <SectionTitle icon={<GraduationCap size={18}/>} text={content.sections.education} />
               <div className="space-y-10">
                {content.academicExperience && content.academicExperience.map((exp, i) => (
                  <div key={`acad-${i}`} className="group/edu relative">
                    <div className="relative z-10">
                      <div className="text-fintechGold/40 font-mono text-[12px] mb-2 tracking-[0.3em] font-bold">{exp.year}</div>
                      <div className="text-slate-100 font-bold text-xl mb-1 group-hover/edu:text-fintechGold transition-colors">{exp.title}</div>
                      <div className="text-slate-500 text-[13px] font-mono uppercase tracking-widest mb-2">{exp.company}</div>
                      <p className="text-slate-400 text-[13px] leading-relaxed italic border-l border-slate-700/30 pl-4">{exp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionTitle icon={<Award size={18}/>} text="CREDENTIALS" />
              <div className="grid grid-cols-1 gap-4">
                {content.certs.map((cert, i) => (
                  <div
                    key={i}
                    onClick={() => openCert(cert.name)}
                    className="flex items-center gap-4 p-4 bg-slate-800/20 border border-slate-700/30 text-slate-500 text-[13px] font-mono hover:border-fintechGold/30 hover:text-slate-200 transition-all cursor-pointer group/cert rounded"
                  >
                    <div className="w-8 h-8 rounded bg-fintechGold/5 flex items-center justify-center text-fintechGold/30 group-hover/cert:text-fintechGold transition-colors">
                        <TrendingUp size={14} />
                    </div>
                    <span className="tracking-widest uppercase font-bold">{cert.name}</span>
                    <ChevronRight size={14} className="ml-auto text-fintechGold opacity-0 group-hover/cert:opacity-100 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section ref={labsRef} className="mb-20 pb-12 animate-slide-up delay-700">
            <SectionTitle icon={<Monitor size={18}/>} text={content.sections.labs} />
            <div className="relative">
               <div className="absolute -top-12 -right-8 opacity-5 text-fintechGold hidden xl:block">
                  <Dna size={200} />
               </div>
               <DataChompsTetris labels={content.gameLabels} />
            </div>
          </section>

          <footer className="mt-20 border-t border-fintechGold/10 animate-slide-up delay-700">
             <div className="bg-slate-900 border-b border-fintechGold/10 p-8 md:p-12 relative">

                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: 'linear-gradient(#c5a059 1px, transparent 1px), linear-gradient(90deg, #c5a059 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">

                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2 text-fintechGold/50 font-mono text-[10px] tracking-widest uppercase">
                            <Command size={12} /> SYSTEM_NAVIGATION
                        </div>
                        <div className="flex flex-col gap-3 items-start">
                           {[
                             { label: 'About', ref: aboutRef },
                             { label: 'Company', ref: companyRef },
                             { label: 'Highlights', ref: highlightsRef },
                             { label: 'Experience', ref: experienceRef },
                             { label: 'Education', ref: educationRef },
                             { label: 'Labs', ref: labsRef }
                           ].map((item, idx) => (
                             <button
                               key={idx}
                               onClick={() => scrollToSection(item.ref)}
                               className="text-[11px] font-mono tracking-widest uppercase text-slate-500 hover:text-fintechGold hover:pl-2 transition-all duration-300 flex items-center gap-2 group"
                             >
                               <span className="opacity-0 group-hover:opacity-100 transition-opacity text-fintechGold">›</span>
                               [{item.label}]
                             </button>
                           ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 items-center md:items-start">
                        <div className="flex items-center gap-2 text-fintechGold/50 font-mono text-[10px] tracking-widest uppercase">
                            <Hash size={12} /> IDENTITY_CORE
                        </div>
                        <div className="flex items-center gap-5 p-4 border border-slate-800/50 bg-slate-950/50 w-full">
                            <div className="w-12 h-12 bg-fintechGold/5 flex items-center justify-center border border-fintechGold/20">
                                <ShieldCheck size={24} className="text-fintechGold" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-mono text-[14px] text-slate-200 font-bold tracking-[0.2em]">ERIK PEDRAZA</span>
                                <span className="font-mono text-[9px] text-slate-600 tracking-[0.3em] uppercase mt-1">
                                    DATA_CHOMPS // 2025
                                </span>
                            </div>
                        </div>
                        <button
                          onClick={() => mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                          className="flex items-center gap-3 text-[10px] font-mono text-slate-500 hover:text-fintechGold transition-colors uppercase tracking-widest group"
                        >
                           <ArrowUpCircle size={14} className="group-hover:-translate-y-1 transition-transform" />
                           Return_To_Top
                        </button>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2 text-fintechGold/50 font-mono text-[10px] tracking-widest uppercase">
                            <Activity size={12} /> SYSTEM_METRICS
                        </div>
                        <div className="border border-slate-800/50 bg-slate-950/50 p-4 flex flex-col gap-4">
                           <div className="flex justify-between font-mono text-[9px] text-slate-500 tracking-widest uppercase">
                              <span>CPU_LOAD</span>
                              <span className="text-fintechGold">12%</span>
                           </div>
                           <div className="w-full h-1 bg-slate-800 overflow-hidden">
                              <div className="h-full bg-fintechGold/50 w-[12%] animate-pulse"></div>
                           </div>

                           <div className="flex justify-between font-mono text-[9px] text-slate-500 tracking-widest uppercase">
                              <span>MEMORY</span>
                              <span className="text-fintechGold">42%</span>
                           </div>
                           <div className="w-full h-1 bg-slate-800 overflow-hidden">
                              <div className="h-full bg-fintechGold/50 w-[42%] animate-pulse"></div>
                           </div>

                           <div className="flex items-end gap-1 h-8 mt-2 border-b border-slate-800/50 pb-1">
                              {[...Array(12)].map((_, i) => (
                                 <div
                                   key={i}
                                   className="w-full bg-fintechGold/20"
                                   style={{
                                     height: `${Math.max(20, Math.random() * 100)}%`,
                                     animation: `pulse ${0.5 + Math.random()}s cubic-bezier(0.4, 0, 0.6, 1) infinite`
                                   }}
                                 ></div>
                              ))}
                           </div>
                        </div>
                    </div>

                </div>
             </div>

             <div className="bg-slate-950 border-t border-fintechGold/10 p-2 flex justify-between items-center text-[9px] font-mono text-slate-600 tracking-widest uppercase px-8 md:px-12">
                <span>SECURE_CONNECTION_ESTABLISHED</span>
                <div className="flex gap-2">
                    <span>LATENCY: 4ms</span>
                    <span className="text-emerald-500">● ONLINE</span>
                </div>
             </div>
          </footer>

        </main>
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 border border-fintechGold/30 rounded-xl w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl relative">
            <button
              onClick={closeCert}
              className="absolute -top-4 -right-4 bg-fintechGold text-slate-900 p-2 rounded-full hover:bg-white transition-colors shadow-lg z-50"
            >
              <X size={20} />
            </button>

            <div className="p-4 border-b border-slate-700/50 flex items-center justify-between bg-slate-950/50 rounded-t-xl">
              <div className="flex items-center gap-3 text-fintechGold">
                <FileText size={18} />
                <span className="font-mono text-sm tracking-widest uppercase font-bold">{selectedCert}</span>
              </div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">SECURE_DOC_VIEWER_V1.0</div>
            </div>

            <div className="flex-1 bg-slate-800/50 p-8 flex items-center justify-center overflow-hidden relative">
               <div className="text-center">
                  <div className="mb-6 flex justify-center opacity-20">
                     <FileText size={80} className="text-fintechGold" />
                  </div>
                  <h3 className="text-slate-300 font-mono text-lg mb-2">DOCUMENT PREVIEW MODE</h3>
                  <p className="text-slate-500 text-sm max-w-md mx-auto mb-8">
                    In a production environment, the PDF file for <span className="text-fintechGold">"{selectedCert}"</span> would be rendered here.
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 border border-fintechGold/20 rounded text-fintechGold/50 text-xs font-mono uppercase tracking-widest">
                    <Lock size={12} /> Encrypted Connection
                  </div>
               </div>

               <div className="absolute inset-0 pointer-events-none opacity-10" style={{
                  backgroundImage: 'linear-gradient(rgba(197, 160, 89, 0.1) 1px, transparent 1px)',
                  backgroundSize: '100% 4px'
               }}></div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// ==========================================
// HELPER COMPONENTS
// ==========================================

const SectionTitle: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <h2 className="text-slate-200 font-mono text-[13px] tracking-[0.5em] mb-12 uppercase flex items-center gap-6">
    <div className="p-2.5 bg-fintechGold/5 rounded text-fintechGold border border-fintechGold/10 shadow-[0_0_20px_rgba(197,160,89,0.1)]">
      {icon}
    </div>
    <span className="font-bold opacity-30">{text}</span>
  </h2>
);

const StackIconItem: React.FC<{
  icon: React.ReactNode;
  name: string;
  level: number;
  experience: string;
  color: string
}> = ({ icon, name, level, experience, color }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group/stack cursor-help"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3 text-slate-500 group-hover/stack:text-fintechGold transition-colors">
          <span className="text-fintechGold/30 group-hover/stack:text-fintechGold transition-all bg-slate-800/50 p-1.5 rounded border border-slate-700/50">{icon}</span>
          <span className="font-mono text-[12px] tracking-[0.1em] font-black uppercase">{name}</span>
        </div>
        <span className="font-mono text-[11px] text-slate-600 font-bold">{level}%</span>
      </div>
      <div className="h-[1px] bg-slate-700/30 rounded-full overflow-hidden relative">
        <div className={`h-full ${color} opacity-20 group-hover/stack:opacity-80 transition-all duration-700 ease-out`} style={{ width: `${level}%` }}></div>
      </div>

      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isHovered ? 'max-h-40 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-fintechGold/[0.03] border border-fintechGold/10 p-3 rounded flex gap-3 items-start">
          <div className="pt-0.5">
            <MessageSquareCode size={10} className="text-fintechGold/40" />
          </div>
          <p className="text-[13px] font-mono text-slate-400 leading-relaxed tracking-tight italic">
            {experience}
          </p>
        </div>
      </div>
    </div>
  );
};

const MiniContactLink: React.FC<{
  icon: React.ReactNode;
  href?: string;
  onHover: () => void;
  onLeave: () => void;
}> = ({ icon, href, onHover, onLeave }) => {
  const content = (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="flex items-center justify-center p-3 bg-slate-800/30 border border-slate-700/30 hover:border-fintechGold/50 hover:bg-fintechGold/5 transition-all duration-300 text-slate-500 hover:text-fintechGold group relative rounded cursor-pointer"
    >
      {icon}
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block w-full">{content}</a>
  ) : (
    <div className="block w-full cursor-help">{content}</div>
  );
};

export default App;
