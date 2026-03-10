import { useState, useEffect } from 'react';
import { Activity, Cpu, HardDrive } from 'lucide-react';

export const SystemMonitor = () => {
    const [uptime, setUptime] = useState(0);
    const [memory, setMemory] = useState(42.5);
    const [keystrokes, setKeystrokes] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setUptime(u => u + 1), 1000);
        const memInterval = setInterval(() => {
            setMemory(m => Math.min(100, Math.max(10, m + (Math.random() - 0.5) * 2)));
        }, 3000);

        const handleKey = () => setKeystrokes(k => k + 1);
        window.addEventListener('keydown', handleKey);

        return () => {
            clearInterval(timer);
            clearInterval(memInterval);
            window.removeEventListener('keydown', handleKey);
        };
    }, []);

    const formatUptime = (s: number) => {
        const hrs = Math.floor(s / 3600);
        const mins = Math.floor((s % 3600) / 60);
        const secs = s % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-mono text-[10px] space-y-2 pointer-events-none select-none">
            <div className="bg-obsidian/80 border border-cyber-blue/30 p-2 backdrop-blur-sm flex flex-col gap-1 w-32 shadow-[0_0_15px_rgba(0,163,255,0.1)]">
                <div className="flex items-center justify-between text-cyber-blue">
                    <div className="flex items-center gap-1">
                        <Activity size={10} />
                        <span>UPTIME</span>
                    </div>
                    <span>{formatUptime(uptime)}</span>
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-cyber-pink">
                        <div className="flex items-center gap-1">
                            <Cpu size={10} />
                            <span>MEM</span>
                        </div>
                        <span>{memory.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-dark overflow-hidden border border-cyber-pink/20">
                        <div
                            className="h-full bg-cyber-pink transition-all duration-1000"
                            style={{ width: `${memory}%` }}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between text-cyber-yellow">
                    <div className="flex items-center gap-1">
                        <HardDrive size={10} />
                        <span>INPUT</span>
                    </div>
                    <span>{keystrokes} KYS</span>
                </div>

                <div className="mt-1 pt-1 border-t border-cyber-blue/20 text-cyber-blue/50 text-right">
                    STATUS: OPTIMAL
                </div>
            </div>
        </div>
    );
};
