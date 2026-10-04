import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Github, Linkedin, Mail, ChevronDown, Download, FileText } from 'lucide-react';
import { PROFILE } from '../data/content';
import { useToast } from './Toast';
import { playSuccessChime } from '../utils/sound';
import profilePic from '../assets/picofme.png';
import resumePdf from '../assets/Shahriar_Alam_Patwary_Resume.pdf';
import { Magnetic } from './Magnetic';
import './Hero.css';

import type { Variants } from 'framer-motion';

const nameWords = "Shahriar Alam Patwary".split(' ');

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.35,
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 25, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export const Hero = () => {
  const { showToast } = useToast();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero__content container">
        {/* Avatar */}
        <motion.div
          className="hero__avatar-frame"
          initial={{ opacity: 0, scale: 0.85, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero__avatar-glow" />
          <img
            src={profilePic}
            alt={PROFILE.name}
            className="hero__avatar-img"
          />
        </motion.div>

        {/* Staggered name (single line) */}
        <motion.h1
          className="hero__name"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label={PROFILE.name}
        >
          {nameWords.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className="hero__word"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="hero__tagline"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {PROFILE.tagline}
        </motion.p>

        {/* Actions & Social links */}
        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <Magnetic strength={0.3}>
            <a
              href={resumePdf}
              download="Shahriar_Alam_Patwary_Resume.pdf"
              className="hero__resume-btn"
              target="_blank"
              rel="noreferrer"
              aria-label="Download Resume"
            >
              <FileText size={16} />
              <span>Resume</span>
              <Download size={14} className="hero__resume-icon" />
            </a>
          </Magnetic>

          <div className="hero__divider" />

          <div className="hero__links">
            <Magnetic strength={0.35}>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="hero__link"
                aria-label="GitHub"
              >
                <Github size={19} />
              </a>
            </Magnetic>
            <Magnetic strength={0.35}>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hero__link"
                aria-label="LinkedIn"
              >
                <Linkedin size={19} />
              </a>
            </Magnetic>
            <Magnetic strength={0.35}>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(PROFILE.email);
                  playSuccessChime();
                  showToast(`Copied ${PROFILE.email} to clipboard!`);
                }}
                className="hero__link hero__email-btn"
                aria-label="Email (click to copy)"
                title="Click to copy email address"
              >
                <Mail size={19} />
              </button>
            </Magnetic>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="hero__scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          style={{ opacity: scrollHintOpacity }}
        >
          <ChevronDown size={20} className="hero__scroll-icon" />
        </motion.div>
      </div>
    </section>
  );
};
