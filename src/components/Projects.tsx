import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Trophy } from 'lucide-react';
import { PROJECTS } from '../data/content';
import type { Project } from '../data/content';
import { SectionHeader } from './SectionHeader';
import './Projects.css';
import './SectionHeader.css';

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.article
      ref={ref}
      className="project-card"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
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
            className="project-card__link"
            aria-label={`Live demo of ${project.title}`}
          >
            <ExternalLink size={16} />
            <span>Live</span>
          </a>
        )}
      </div>
    </motion.article>
  );
};

export const Projects = () => {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader label="03" title="Projects & Achievements" />
        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
