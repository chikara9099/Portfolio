import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { RESEARCH_INTERESTS } from '../data/content';
import { SectionHeader } from './SectionHeader';
import './Research.css';
import './SectionHeader.css';

export const Research = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="research" className="section">
      <div className="container">
        <SectionHeader label="06" title="Research Interests" />
        <div ref={ref} className="research__interests">
          {RESEARCH_INTERESTS.map((interest, i) => (
            <motion.span
              key={interest}
              className="research__item"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.4,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {interest}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};
