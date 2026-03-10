import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PROJECTS } from '../utils/projects';
import type { Project } from '../utils/projects';
import { ProjectCard } from './ProjectCard';
import { SecurityModal } from './SecurityModal';
import { X, ExternalLink, Github, Terminal } from 'lucide-react';

export const ScrapYard = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isCtfOpen, setIsCtfOpen] = useState(false);
    const [unlockedProjects, setUnlockedProjects] = useState<string[]>([]);
    const [activeDetails, setActiveDetails] = useState<Project | null>(null);

    const handleCardClick = (project: Project) => {
        if (unlockedProjects.includes(project.id)) {
            setActiveDetails(project);
        } else {
            setSelectedProject(project);
            setIsCtfOpen(true);
        }
    };

    const handleUnlock = () => {
        if (selectedProject) {
            setUnlockedProjects([...unlockedProjects, selectedProject.id]);
            setIsCtfOpen(false);
            setActiveDetails(selectedProject);
            setSelectedProject(null);
        }
    };

    return (
        <section className="space-y-8">
            <div className="flex items-center gap-4">
                <h2 className="text-2xl font-mono font-bold text-cyber-blue flex items-center gap-2">
                    <Terminal size={24} />
                    SCRAP_YARD.BIN
                </h2>
                <div className="h-px flex-1 bg-cyber-blue/10" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {PROJECTS.map(project => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        isUnlocked={unlockedProjects.includes(project.id)}
                        onSelect={() => handleCardClick(project)}
                    />
                ))}
            </div>

            <AnimatePresence>
                {isCtfOpen && selectedProject && (
                    <SecurityModal
                        project={selectedProject}
                        onUnlock={handleUnlock}
                        onClose={() => setIsCtfOpen(false)}
                    />
                )}

                {activeDetails && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-obsidian/95 backdrop-blur-xl">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="max-w-2xl w-full bg-slate-dark border border-cyber-blue/30 p-8 font-mono relative"
                        >
                            <button
                                onClick={() => setActiveDetails(null)}
                                className="absolute top-4 right-4 text-slate-500 hover:text-cyber-pink transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex items-start justify-between mb-8">
                                <div>
                                    <span className="text-xs text-cyber-blue/50 mb-1 block">NODE::{activeDetails.id}</span>
                                    <h2 className="text-3xl font-bold text-white tracking-tighter uppercase glitch-text" data-text={activeDetails.title}>{activeDetails.title}</h2>
                                </div>
                                <div className="px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue text-[10px]">
                                    ENCRYPTION: BYPASSED
                                </div>
                            </div>

                            <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                                {activeDetails.description}
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xs text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2 font-bold">
                                        <Terminal size={14} />
                                        Technical_Stack
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {activeDetails.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-obsidian border border-slate-700 text-cyber-pink text-xs uppercase tracking-tighter">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    {activeDetails.link && (
                                        <a
                                            href={activeDetails.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex-1 bg-cyber-blue text-obsidian py-3 flex items-center justify-center gap-2 font-bold hover:bg-cyber-blue/90 transition-all uppercase"
                                        >
                                            <ExternalLink size={18} />
                                            Source_Origin
                                        </a>
                                    )}
                                    <a
                                        href="https://github.com/chikara9099"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 border border-cyber-blue/30 text-cyber-blue py-3 flex items-center justify-center gap-2 hover:bg-cyber-blue/5 transition-all uppercase"
                                    >
                                        <Github size={18} />
                                        Archive_Profile
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};
