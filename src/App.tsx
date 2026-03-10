import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CustomCursor } from './components/CustomCursor';
import { SystemMonitor } from './components/SystemMonitor';
import { BootSequence } from './components/BootSequence';
import { ScrapYard } from './components/ScrapYard';
import { Whiteboard } from './components/Whiteboard';
import { GatekeeperNPC } from './components/GatekeeperNPC';
import { GlitchBackground } from './components/GlitchBackground';
import { SignalHUD } from './components/SignalHUD';
import { FileText, BookOpen, Construction } from 'lucide-react';

function App() {
  const [isBooting, setIsBooting] = useState(true);

  return (
    <div className="min-h-screen bg-obsidian text-slate-300 relative selection:bg-cyber-pink selection:text-obsidian pb-8 overflow-x-hidden">
      <GlitchBackground />
      <CustomCursor />
      <SystemMonitor />

      <AnimatePresence mode="wait">
        {isBooting ? (
          <BootSequence key="boot" onComplete={() => setIsBooting(false)} />
        ) : (
          <motion.main
            key="interface"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 sm:p-6 lg:p-8 min-h-screen relative z-10"
          >
            <div className="max-w-[1500px] mx-auto space-y-4">
              {/* Header: Enhanced Visibility */}
              <header className="border-b border-cyber-blue/20 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h1 className="text-3xl md:text-5xl font-mono font-bold text-cyber-blue glitch-text" data-text="SHAHRIAR ALAM PATWARY">
                    SHAHRIAR ALAM PATWARY
                  </h1>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 pt-2">
                    <p className="text-cyber-pink font-mono text-sm md:text-base font-bold uppercase tracking-widest shadow-cyber-pink/20 drop-shadow-sm">
                      Computer Science Enthusiast <span className="text-cyber-blue opacity-50 px-1">//</span> willing to learn on the go
                    </p>
                    <span className="hidden sm:block w-px h-6 bg-white/20" />
                    <p className="text-xs md:text-sm font-mono text-cyber-blue font-black uppercase tracking-tighter animate-pulse">
                      SOPHOMORE @ <span className="bg-cyber-blue/20 px-2 py-0.5 rounded-sm">BUET CSE</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="font-mono text-[10px] text-cyber-yellow border-2 border-cyber-yellow p-2 bg-cyber-yellow/10 h-fit whitespace-nowrap font-bold shadow-[0_0_10px_rgba(255,255,0,0.2)] uppercase tracking-widest">
                    SYSTEM_STATUS: MAHORAGA
                  </div>
                  <div className="w-full md:w-80 h-12">
                    <SignalHUD />
                  </div>
                </div>
              </header>

              {/* Main Dashboard: Integrated Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Main Column (8/12) */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Projects Area */}
                  <div className="bg-slate-dark/20 border border-slate-800/50 p-4">
                    <ScrapYard />
                  </div>

                  {/* Academic & Coursework Side-by-Side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Academic Papers */}
                    <section className="space-y-4">
                      <div className="flex items-center gap-4">
                        <h2 className="text-lg font-mono font-bold text-cyber-magenta flex items-center gap-2 uppercase">
                          <FileText size={18} />
                          Papers.lib
                        </h2>
                        <div className="h-px flex-1 bg-cyber-magenta/10" />
                      </div>
                      <div className="bg-slate-dark/30 border-2 border-dashed border-cyber-magenta/20 p-8 flex flex-col items-center justify-center gap-3 group relative overflow-hidden">
                        <Construction className="text-cyber-magenta/30 group-hover:animate-bounce" size={32} />
                        <p className="font-mono text-cyber-magenta/50 uppercase tracking-[0.2em] text-[10px]">Restoring_Archives...</p>
                        <div className="absolute inset-0 bg-cyber-magenta/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                    </section>

                    {/* Courseworks */}
                    <section className="space-y-4">
                      <div className="flex items-center gap-4">
                        <h2 className="text-lg font-mono font-bold text-cyber-blue flex items-center gap-2 uppercase">
                          <BookOpen size={18} />
                          Courses.bin
                        </h2>
                        <div className="h-px flex-1 bg-cyber-blue/10" />
                      </div>
                      <div className="bg-slate-dark/30 border-2 border-dashed border-cyber-blue/20 p-8 flex flex-col items-center justify-center gap-3 group relative overflow-hidden">
                        <Construction className="text-cyber-blue/30 group-hover:animate-bounce" size={32} />
                        <p className="font-mono text-cyber-blue/50 uppercase tracking-[0.2em] text-[10px]">Syncing_Lab_Nodes...</p>
                        <div className="absolute inset-0 bg-cyber-blue/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                    </section>
                  </div>
                </div>

                {/* Side Column (4/12) */}
                <div className="lg:col-span-4 space-y-6 flex flex-col">
                  {/* Skills Section */}
                  <div className="bg-slate-dark/25 border border-slate-800/40 p-4 flex-1">
                    <Whiteboard />
                  </div>

                  {/* Contact Section */}
                  <div className="bg-slate-dark/25 border border-slate-800/40 p-4">
                    <GatekeeperNPC />
                  </div>
                </div>

              </div>

              {/* Footer Indicator */}
              <footer className="mt-8 border-t border-white/5 pt-4 text-center">
                <p className="font-mono text-[8px] text-white/20 uppercase tracking-[0.5em]">
                  Digital Archive // v3.2.0
                </p>
              </footer>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
