import { useState, useEffect } from 'react';
import { Terminal, Github, Linkedin, User, Globe } from 'lucide-react';

export const GatekeeperNPC = () => {
    const [text, setText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [command, setCommand] = useState("");
    const [history, setHistory] = useState<string[]>([]);

    const fullText = "GREETINGS_TRAVELLER. I AM THE ARCHIVE_CURSOR. CURRENT STATUS: BUET CSE SOPHOMORE. TYPE 'contact' OR SELECT A LINK BELOW TO PROCEED.";

    useEffect(() => {
        let i = 0;
        setIsTyping(true);
        const interval = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) {
                clearInterval(interval);
                setIsTyping(false);
            }
        }, 30);
        return () => clearInterval(interval);
    }, []);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = command.toLowerCase().trim();
        if (cmd === 'contact') {
            setHistory(prev => [...prev.slice(-4), "> contact", "SOURCE_NODES_FOUND...", "GH: github.com/chikara9099", "LI: linkedin.com/in/shahriar-alam-patwary-9173b8211/"]);
        } else if (cmd === 'clear') {
            setHistory([]);
        } else if (cmd) {
            setHistory(prev => [...prev.slice(-4), `> ${cmd}`, `ERR: CMD_NOT_FOUND`]);
        }
        setCommand("");
    };

    return (
        <section className="space-y-4">
            <div className="flex items-center gap-4">
                <h2 className="text-xl font-mono font-bold text-cyber-blue flex items-center gap-2">
                    <Globe size={20} />
                    COMMS_GATEWAY.EXE
                </h2>
                <div className="h-px flex-1 bg-cyber-blue/10" />
            </div>

            <div className="bg-slate-dark/40 border-2 border-cyber-blue p-4 relative flex flex-col gap-4">
                <div className="absolute -top-3 left-4 bg-cyber-blue text-obsidian px-2 py-0.5 text-[8px] font-bold uppercase">
                    IO_STREAM
                </div>

                <div className="font-mono text-cyber-blue text-xs leading-relaxed min-h-[48px]">
                    {text}
                    {isTyping && <span className="w-1.5 h-3 bg-cyber-blue inline-block animate-pulse ml-1 align-middle" />}
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <a
                        href="https://github.com/chikara9099"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 p-2 bg-obsidian border border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-obsidian transition-all group overflow-hidden"
                    >
                        <Github size={14} className="shrink-0" />
                        <span className="font-mono text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">GITHUB</span>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/shahriar-alam-patwary-9173b8211/"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 p-2 bg-obsidian border border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-obsidian transition-all group overflow-hidden"
                    >
                        <Linkedin size={14} className="shrink-0" />
                        <span className="font-mono text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">LINKEDIN</span>
                    </a>
                </div>

                <div className="bg-obsidian/50 p-2 border border-cyber-blue/20">
                    <div className="flex-1 overflow-y-auto space-y-0.5 text-cyber-blue/40 text-[8px] font-mono mb-2 max-h-[40px]">
                        {history.map((line, idx) => (
                            <div key={idx} className="truncate">{line}</div>
                        ))}
                    </div>
                    <form onSubmit={handleCommand} className="flex items-center gap-2">
                        <Terminal size={12} className="text-cyber-blue/50 shrink-0" />
                        <input
                            type="text"
                            value={command}
                            onChange={(e) => setCommand(e.target.value)}
                            placeholder="CMD_IN..."
                            className="flex-1 bg-transparent border-none outline-none text-cyber-blue font-mono text-[9px] placeholder:text-cyber-blue/20 uppercase"
                        />
                    </form>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-cyber-blue/10">
                    <div className="w-8 h-8 border border-cyber-blue bg-obsidian flex items-center justify-center shrink-0">
                        <User size={16} className="text-cyber-blue" />
                    </div>
                    <div>
                        <div className="text-[7px] text-cyber-blue font-bold tracking-widest">ID: ARCHIVE_CURSOR_09</div>
                        <div className="text-[7px] text-cyber-blue/50 uppercase">STATUS: INTERFACING...</div>
                    </div>
                </div>
            </div>
        </section>
    );
};
