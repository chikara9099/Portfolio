import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/content';
import './Contact.css';

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <footer id="contact" className="section contact">
      <div className="container">
        <motion.div
          ref={ref}
          className="contact__content"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="contact__label">07 — Contact</span>
          <h2 className="contact__heading">Let's connect</h2>
          <p className="contact__subtext">
            Open to research opportunities, collaborations, and interesting conversations.
          </p>

          <div className="contact__links">
            <a href={`mailto:${PROFILE.email}`} className="contact__link-item">
              <Mail size={18} />
              <span>{PROFILE.email}</span>
              <ArrowUpRight size={14} className="contact__arrow" />
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="contact__link-item"
            >
              <Github size={18} />
              <span>GitHub</span>
              <ArrowUpRight size={14} className="contact__arrow" />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="contact__link-item"
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
              <ArrowUpRight size={14} className="contact__arrow" />
            </a>
          </div>

          <div className="contact__footer">
            <p>&copy; {new Date().getFullYear()} {PROFILE.name}</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
