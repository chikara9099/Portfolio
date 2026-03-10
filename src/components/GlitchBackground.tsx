import { useEffect, useRef } from 'react';

interface Bit {
    x: number;
    y: number;
    char: string;
    active: boolean;
    opacity: number;
    scale: number;
    lastUpdate: number;
}

export const GlitchBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const grid = useRef<Bit[]>([]);
    const cellSize = 40;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const initGrid = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const cols = Math.ceil(canvas.width / cellSize);
            const rows = Math.ceil(canvas.height / cellSize);
            grid.current = [];
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    grid.current.push({
                        x: x * cellSize + cellSize / 2,
                        y: y * cellSize + cellSize / 2,
                        char: Math.random() > 0.5 ? '0' : '1',
                        active: false,
                        opacity: 0,
                        scale: 0.5,
                        lastUpdate: 0
                    });
                }
            }
        };

        window.addEventListener('resize', initGrid);
        initGrid();

        const handleMouseMove = (e: MouseEvent) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            grid.current.forEach(bit => {
                const dx = bit.x - mouseX;
                const dy = bit.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    bit.active = true;
                    // Stronger bloom
                    bit.opacity = Math.max(bit.opacity, (1 - dist / 120));
                    bit.scale = Math.max(bit.scale, 1.5 * (1 - dist / 120));
                    // Meta-glitch: swap characters occasionally
                    if (Math.random() > 0.95) bit.char = Math.random() > 0.5 ? '0' : '1';
                    bit.lastUpdate = Date.now();
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        let animationId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = 'bold 10px "Fira Code", monospace';

            grid.current.forEach(bit => {
                if (bit.opacity > 0) {
                    ctx.save();
                    ctx.translate(bit.x, bit.y);
                    ctx.scale(bit.scale, bit.scale);
                    ctx.fillStyle = `rgba(0, 255, 255, ${bit.opacity * 0.4})`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(bit.char, 0, 0);
                    ctx.restore();

                    // Decay
                    bit.opacity *= 0.95;
                    bit.scale = Math.max(0.5, bit.scale * 0.98);
                    if (bit.opacity < 0.01) {
                        bit.opacity = 0;
                        bit.active = false;
                    }
                }
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', initGrid);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[5]"
        />
    );
};
