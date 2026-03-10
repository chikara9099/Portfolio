import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BOOT_LOGS = [
    "INITIALIZING KERNEL...",
    "ATTACHING DISK VOLUMES...",
    "MOUNTING /DEV/SDA1 AT /ROOT",
    "CHECKING SYSTEM INTEGRITY... OK",
    "LOADING NEURAL INTERFACE... 100%",
    "DECRYPTING ARCHIVE_DATA.BIN",
    "USER IDENTIFIED: SHAHRIAR ALAM PATWARY",
    "ESTABLISHING SECURE CONNECTION...",
    "ACCESS GRANTED.",
    "BOOT SEQUENCE COMPLETE."
];

export const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
    const [logs, setLogs] = useState<string[]>([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < BOOT_LOGS.length) {
            const timeout = setTimeout(() => {
                setLogs(prev => [...prev, BOOT_LOGS[index]]);
                setIndex(index + 1);
            }, Math.random() * 200 + 100);
            return () => clearTimeout(timeout);
        } else {
            const finishTimeout = setTimeout(onComplete, 1000);
            return () => clearTimeout(finishTimeout);
        }
    }, [index, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-obsidian flex items-center justify-center p-8 overflow-hidden"
            exit={{
                opacity: [1, 0.8, 0, 1, 0],
                x: [0, -10, 10, -5, 0],
                filter: ["none", "blur(2px)", "invert(1)", "none"],
                transition: { duration: 0.5 }
            }}
        >
            <div className="max-w-xl w-full font-mono text-neon-green text-sm sm:text-base">
                <div className="flex flex-col gap-1">
                    {logs.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.1 }}
                        >
                            <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString()}]</span>
                            <span>{log}</span>
                        </motion.div>
                    ))}
                    {index < BOOT_LOGS.length && (
                        <motion.div
                            animate={{ opacity: [0, 1] }}
                            transition={{ repeat: Infinity, duration: 0.5 }}
                            className="w-2 h-4 bg-neon-green inline-block align-middle ml-1"
                        />
                    )}
                </div>
            </div>
        </motion.div>
    );
};
