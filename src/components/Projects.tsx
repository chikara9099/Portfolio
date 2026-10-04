import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Trophy, Sparkles } from 'lucide-react';
import { PROJECTS } from '../data/content';
import type { Project } from '../data/content';
import { SectionHeader } from './SectionHeader';
import { SpotlightCard } from './SpotlightCard';
import { playBlip } from '../utils/sound';
import './Projects.css';
import './SectionHeader.css';

type Category = 'all' | 'ai' | 'systems' | 'fullstack';

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'ai', label: 'AI & Machine Learning' },
  { id: 'systems', label: 'Systems & Embedded' },
  { id: 'fullstack', label: 'Full-Stack & Production' },
];

function matchesCategory(project: Project, cat: Category): boolean {
  if (cat === 'all') return true;
  const techLower = project.tech.map((t) => t.toLowerCase());
  if (cat === 'ai') {
    return (
      techLower.some((t) => t.includes('ai') || t.includes('openai') || t.includes('gemini') || t.includes('lancedb') || t.includes('groq')) ||
      project.id === 'agrisense' ||
      project.id === 'dheu'
    );
  }
  if (cat === 'systems') {
    return (
      techLower.some((t) => t.includes('atmega') || t.includes('avr') || t.includes('pwm') || t.includes('sensors') || t.includes('embedded')) ||
      project.id === 'companion-buddy'
    );
  }
  if (cat === 'fullstack') {
    return (
      techLower.some((t) => t.includes('docker') || t.includes('express') || t.includes('postgresql') || t.includes('react') || t.includes('supabase')) ||
      project.id === 'badhan' ||
      project.id === 'agrisense'
    );
  }
  return true;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <SpotlightCard className="project-card-spotlight">
      <div className="project-card__content">
        {project.achievement && (
          <div className="project-card__badge">
            <Trophy size={13} />
            <span>{project.achievement}</span>
          </div>
        )}

        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>

        <div className="project-card__tech">
          {project.tech.map((t) => (
            <span key={t} className="project-card__tag">
              {t}
            </span>
          ))}
        </div>

        <div className="project-card__links">
          {project.github && project.github !== '#' && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="project-card__link"
              aria-label={`GitHub repo for ${project.title}`}
              onClick={() => playBlip(1600)}
            >
              <Github size={16} />
              <span>Source</span>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="project-card__link project-card__link--live"
              aria-label={`Live demo of ${project.title}`}
              onClick={() => playBlip(1800)}
            >
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
};

export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filteredProjects = PROJECTS.filter((p) => matchesCategory(p, activeCategory));

  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat);
    playBlip(1300);
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="projects__header-row">
          <SectionHeader label="03" title="Projects & Achievements" />
          <div className="projects__pulse-tag">
            <Sparkles size={13} className="projects__pulse-icon" />
            <span>{PROJECTS.length} Featured Systems</span>
          </div>
        </div>

        {/* Interactive Filter Pills */}
        <div className="projects__filters" role="tablist" aria-label="Filter projects">
          {CATEGORIES.map((cat) => {
            const count = PROJECTS.filter((p) => matchesCategory(p, cat.id)).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                className={`projects__filter-btn ${isActive ? 'projects__filter-btn--active' : ''}`}
                onClick={() => handleCategoryChange(cat.id)}
              >
                <span>{cat.label}</span>
                <span className="projects__filter-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid with layout animation */}
        <motion.div layout className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
