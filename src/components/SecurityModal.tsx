import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Terminal, Lock, Unlock, Cpu } from 'lucide-react';
import type { Project } from '../utils/projects';

export const SecurityModal = ({ project, onClose, onUnlock }: { project: Project, onClose: () => void, onUnlock: () => void }) => {
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        // Case-insensitive solution check for better UX, or exact depending on preference
        if (input.toLowerCase().trim() === project.solution.toLowerCase().trim()) {
            setLoading(true);
            setTimeout(() => {
                onUnlock();
            }, 800);
        } else {
            setError(true);
            setTimeout(() => setError(false), 500);
        }
    };

    const skip = () => {
        setInput(project.solution);
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-md">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, x: error ? [-2, 2, -2, 2, 0] : 0 }}
                className="max-width-[480px] w-full bg-slate-dark border-2 border-cyber-yellow p-6 font-mono relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-cyber-yellow animate-pulse" />

                <div className="flex items-center justify-between text-cyber-yellow mb-4">
                    <div className="flex items-center gap-3">
                        <ShieldAlert size={24} />
                        <h2 className="text-xl font-bold uppercase tracking-tighter">Security Override Required</h2>
                    </div>
                    <div className="text-[10px] bg-cyber-yellow/10 px-2 py-0.5 border border-cyber-yellow/40">
                        CIPHER_{project.encryptionType.toUpperCase()}
                    </div>
                </div>

                <div className="bg-obsidian/50 p-4 border border-cyber-yellow/20 mb-6 space-y-4">
                    <div>
                        <div className="flex items-center gap-2 text-cyber-yellow/70 text-[10px] uppercase font-bold mb-1">
                            <Terminal size={12} />
                            <span>Encrypted_Payload</span>
                        </div>
                        <p className="text-cyber-yellow break-all text-xs font-bold bg-cyber-yellow/10 p-3 border border-cyber-yellow/10">
                            {project.cipher}
                        </p>
                    </div>

                    {project.encryptionType === 'rsa' && (
                        <div className="pt-2 border-t border-cyber-yellow/10">
                            <div className="flex items-center gap-2 text-cyber-yellow/50 text-[8px] uppercase font-bold mb-1">
                                <Cpu size={10} />
                                <span>RSA_Public_Key_Metadata</span>
                            </div>
                            <p className="text-[8px] text-cyber-yellow/40 break-all leading-tight italic">
                                --BEGIN RSA PUBLIC KEY--
                                MIIBCgKCAQEAvH2v... [TRUNCATED_FOR_SECURITY]
                                --END RSA PUBLIC KEY--
                            </p>
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <input
                            autoFocus
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="DECRYPTION_KEY_"
                            className="w-full bg-obsidian border border-cyber-yellow/40 p-3 text-cyber-yellow focus:outline-none focus:border-cyber-yellow placeholder:text-cyber-yellow/30 uppercase text-sm"
                        />
                        <Lock className="absolute right-3 top-3.5 text-cyber-yellow/30" size={16} />
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={skip}
                            className="flex-1 border border-cyber-yellow/20 py-2.5 text-[9px] text-cyber-yellow/50 hover:bg-cyber-yellow/5 transition-colors uppercase font-bold tracking-widest"
                        >
                            RECRUITER_BYPASS
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-[2] bg-cyber-yellow text-obsidian py-2.5 font-bold hover:bg-cyber-yellow/90 transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
                        >
                            {loading ? (
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                                    <Terminal size={18} />
                                </motion.div>
                            ) : (
                                <>
                                    <Unlock size={18} />
                                    Execute
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-cyber-yellow/30 hover:text-cyber-yellow transition-colors"
                >
                    <Terminal size={16} />
                </button>
            </motion.div>
        </div>
    );
};
