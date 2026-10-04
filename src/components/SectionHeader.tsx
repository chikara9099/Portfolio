import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface SectionHeaderProps {
  label: string;
  title: string;
  children?: ReactNode;
}

export const SectionHeader = ({ label, title }: SectionHeaderProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className="section-header"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="section-header__label">{label}</span>
      <h2 className="section-header__title">{title}</h2>
    </motion.div>
  );
};
