import { Activity, Waves } from 'lucide-react';
import { useEffect, useRef } from 'react';

export const SignalHUD = () => {
    const signalRef = useRef<HTMLCanvasElement>(null);
    const fftRef = useRef<HTMLCanvasElement>(null);
    const velocityBuffer = useRef<number[]>(new Array(100).fill(0));
    const lastMousePos = useRef({ x: 0, y: 0, time: Date.now() });

    useEffect(() => {
        const sCanvas = signalRef.current;
        const fCanvas = fftRef.current;
        if (!sCanvas || !fCanvas) return;
        const sCtx = sCanvas.getContext('2d');
        const fCtx = fCanvas.getContext('2d');
        if (!sCtx || !fCtx) return;

        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            const dt = now - lastMousePos.current.time;
            if (dt > 0) {
                const dx = e.clientX - lastMousePos.current.x;
                const dy = e.clientY - lastMousePos.current.y;
                const vel = Math.sqrt(dx * dx + dy * dy) / dt;
                velocityBuffer.current.push(vel * 50);
                velocityBuffer.current.shift();
            }
            lastMousePos.current = { x: e.clientX, y: e.clientY, time: now };
        };

        window.addEventListener('mousemove', handleMouseMove);

        let animationId: number;
        const render = () => {
            sCtx.clearRect(0, 0, sCanvas.width, sCanvas.height);
            fCtx.clearRect(0, 0, fCanvas.width, fCanvas.height);

            const drawSignal = () => {
                sCtx.beginPath();
                sCtx.strokeStyle = 'rgba(0, 163, 255, 0.8)';
                sCtx.lineWidth = 1.5;
                velocityBuffer.current.forEach((v, i) => {
                    const x = (i / velocityBuffer.current.length) * sCanvas.width;
                    const y = sCanvas.height - (v % sCanvas.height);
                    if (i === 0) sCtx.moveTo(x, y);
                    else sCtx.lineTo(x, y);
                });
                sCtx.stroke();
            };

            const drawFFT = () => {
                fCtx.beginPath();
                fCtx.strokeStyle = 'rgba(255, 0, 255, 0.8)';
                fCtx.lineWidth = 1.5;
                const fftData = new Array(60).fill(0).map((_, i) => {
                    const avgVel = velocityBuffer.current.reduce((a, b) => a + b, 0) / 100;
                    return Math.sin(i * 0.4 + Date.now() * 0.001) * avgVel * 0.4 + (Math.random() * avgVel * 0.15);
                });

                fftData.forEach((v, i) => {
                    const x = (i / fftData.length) * fCanvas.width;
                    const h = Math.abs(v);
                    fCtx.moveTo(x, fCanvas.height);
                    fCtx.lineTo(x, fCanvas.height - h);
                });
                fCtx.stroke();
            };

            drawSignal();
            drawFFT();

            animationId = requestAnimationFrame(render);
        };

        render();
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className="grid grid-cols-2 gap-4 h-full">
            <div className="bg-slate-dark/40 border border-cyber-blue/30 p-2 relative backdrop-blur-sm shadow-[0_0_15px_rgba(0,163,255,0.05)]">
                <div className="text-[7px] font-mono text-cyber-blue absolute top-1 left-2 uppercase opacity-70 flex items-center gap-1 font-bold">
                    <Activity size={8} /> SIGNAL_STREAM_X01: VEL_TIME
                </div>
                <canvas ref={signalRef} width={250} height={40} className="w-full h-full min-h-[40px]" />
            </div>
            <div className="bg-slate-dark/40 border border-cyber-pink/30 p-2 relative backdrop-blur-sm shadow-[0_0_15px_rgba(255,0,255,0.05)]">
                <div className="text-[7px] font-mono text-cyber-pink absolute top-1 left-2 uppercase opacity-70 flex items-center gap-1 font-bold">
                    <Waves size={8} /> FREQ_DOMAIN_X02: FFT_ANALYSIS
                </div>
                <canvas ref={fftRef} width={250} height={40} className="w-full h-full min-h-[40px]" />
            </div>
        </div>
    );
};
