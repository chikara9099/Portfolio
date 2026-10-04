import { motion, useScroll, useSpring } from 'framer-motion';
import './ScrollProgress.css';

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="scroll-progress-container" aria-hidden="true">
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX }}
      />
    </div>
  );
};
