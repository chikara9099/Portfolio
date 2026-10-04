import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SKILLS } from '../data/content';
import { SectionHeader } from './SectionHeader';
import './Skills.css';
import './SectionHeader.css';

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeader label="04" title="Technical Skills" />
        <div ref={ref} className="skills-grid">
          {SKILLS.map((category, catIndex) => (
            <motion.div
              key={category.label}
              className="skills-category"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: catIndex * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h3 className="skills-category__label">{category.label}</h3>
              <div className="skills-category__tags">
                {category.skills.map((skill) => (
                  <span key={skill} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
