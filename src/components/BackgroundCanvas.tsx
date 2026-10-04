import { useEffect, useRef, useState } from 'react';
import { getCurrentTheme, subscribeToTheme } from '../utils/theme';
import type { ThemeColor } from '../utils/theme';
import './BackgroundCanvas.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  alpha: number;
}

export const BackgroundCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [theme, setTheme] = useState<ThemeColor>(getCurrentTheme());
  const themeRef = useRef<ThemeColor>(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  // Subscribe to theme color changes
  useEffect(() => {
    const unsubscribe = subscribeToTheme((newTheme) => {
      setTheme(newTheme);
      themeRef.current = newTheme;
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive particle count
    const particleCount = width < 768 ? 36 : 72;
    const maxDistance = width < 768 ? 95 : 135;
    const mouseRadius = 160;

    const mouse = {
      x: -1000,
      y: -1000,
      active: false,
    };

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 1.5 + 1;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        baseRadius: radius,
        radius,
        alpha: Math.random() * 0.5 + 0.25,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    let lastTime = performance.now();

    const render = (time: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Delta time normalization
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      const speedFactor = dt * 60;
      const currentRgb = themeRef.current.accentRgb;

      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx * speedFactor;
        p.y += p.vy * speedFactor;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // Mouse repulsion & interaction
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius) {
            const force = (mouseRadius - dist) / mouseRadius;
            const angle = Math.atan2(dy, dx);
            p.x -= Math.cos(angle) * force * 2.5;
            p.y -= Math.sin(angle) * force * 2.5;
            p.radius = p.baseRadius + force * 1.5;

            // Draw line to mouse
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${currentRgb}, ${force * 0.35})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          } else {
            p.radius = p.baseRadius;
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.9})`;
        ctx.shadowColor = `rgba(${currentRgb}, 0.55)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.16;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${currentRgb}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="bg-canvas-wrapper" aria-hidden="true">
      {/* Dynamic Aurora Ambient Glow Orbs */}
      <div
        className="bg-aurora bg-aurora--top-cyan"
        style={{
          background: `radial-gradient(circle, ${theme.accent} 0%, rgba(${theme.accentRgb}, 0) 70%)`,
        }}
      />
      <div className="bg-aurora bg-aurora--mid-purple" />
      <div
        className="bg-aurora bg-aurora--bottom-blue"
        style={{
          background: `radial-gradient(circle, ${theme.aurora} 0%, rgba(2, 132, 199, 0) 70%)`,
        }}
      />
      <canvas ref={canvasRef} className="bg-canvas" />
    </div>
  );
};
