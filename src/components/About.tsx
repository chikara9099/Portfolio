import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { PROFILE } from '../data/content';
import { SectionHeader } from './SectionHeader';
import './About.css';
import './SectionHeader.css';

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeader label="01" title="About" />
        <motion.div
          ref={ref}
          className="about__content"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="about__accent-bar" />
          <p className="about__text">{PROFILE.bio}</p>
        </motion.div>
      </div>
    </section>
  );
};
