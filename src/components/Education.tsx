import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import { EDUCATION } from '../data/content';
import { SectionHeader } from './SectionHeader';
import './Education.css';
import './SectionHeader.css';

export const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="education" className="section">
      <div className="container">
        <SectionHeader label="02" title="Education" />
        <motion.div
          ref={ref}
          className="education__card"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="education__header">
            <div className="education__icon-wrap">
              <GraduationCap size={24} />
            </div>
            <div>
              <h3 className="education__institution">{EDUCATION.institution}</h3>
              <p className="education__degree">{EDUCATION.degree}</p>
            </div>
          </div>

          <div className="education__meta">
            <div className="education__meta-item">
              <span className="education__meta-label">CGPA</span>
              <span className="education__meta-value education__cgpa">{EDUCATION.cgpa}</span>
            </div>
            <div className="education__meta-item">
              <MapPin size={14} className="education__meta-icon" />
              <span className="education__meta-value">{EDUCATION.location}</span>
            </div>
            <div className="education__meta-item">
              <Calendar size={14} className="education__meta-icon" />
              <span className="education__meta-value">{EDUCATION.graduation}</span>
            </div>
          </div>

          <div className="education__coursework">
            <h4 className="education__coursework-label">Relevant Coursework</h4>
            <div className="education__tags">
              {EDUCATION.coursework.map((course) => (
                <span key={course} className="tag">
                  {course}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
