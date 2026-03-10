import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor = () => {
    const [isPointer, setIsPointer] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            const target = e.target as HTMLElement;
            if (target) {
                setIsPointer(
                    ['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(target.tagName) ||
                    target.closest('button') !== null ||
                    target.closest('a') !== null ||
                    getComputedStyle(target).cursor === 'pointer'
                );
            }
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [cursorX, cursorY]);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-6 h-6 border border-cyber-pink pointer-events-none z-[9999] flex items-center justify-center"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <div className="w-1 h-1 bg-cyber-pink" />
            </motion.div>
            <motion.div
                className="fixed top-0 left-0 w-12 h-12 border border-cyber-pink/20 pointer-events-none z-[9998]"
                animate={{
                    scale: isPointer ? 1.5 : 1,
                    rotate: isPointer ? 45 : 0,
                }}
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
            {/* Scanline effect */}
            <div className="fixed inset-0 pointer-events-none z-[10000] opacity-[0.03] overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
            </div>
        </>
    );
};
