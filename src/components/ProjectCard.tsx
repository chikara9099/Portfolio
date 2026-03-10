import { motion } from 'framer-motion';
import { Terminal, Folder, ExternalLink } from 'lucide-react';
import type { Project } from '../utils/projects';

export const ProjectCard = ({ project, onSelect, isUnlocked }: { project: Project, onSelect: () => void, isUnlocked: boolean }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            onClick={onSelect}
            className={`group relative bg-slate-dark/40 border border-slate-700 p-6 flex flex-col gap-4 cursor-none overflow-hidden transition-colors ${isUnlocked ? 'border-cyber-blue/30 hover:border-cyber-blue' : 'hover:border-cyber-pink/50'}`}
        >
            {/* Glitch Overlay Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-cyber-blue translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000" />
            </div>

            <div className="flex items-center justify-between">
                <div className={`p-2 bg-slate-800 ${isUnlocked ? 'text-cyber-blue' : 'text-cyber-pink'} border border-current/20`}>
                    <Folder size={18} />
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    Node_{project.id}
                </span>
            </div>

            <div>
                <h3 className={`text-xl font-mono font-bold tracking-tighter ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                    {project.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed">
                    {project.description}
                </p>
            </div>

            <div className="mt-auto pt-4 flex flex-wrap gap-2 border-t border-slate-700/50">
                {project.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-mono px-2 py-0.5 bg-slate-800 border border-slate-700 text-slate-400">
                        {tag}
                    </span>
                ))}
            </div>

            {!isUnlocked && (
                <div className="absolute top-2 right-2 flex items-center gap-1 text-[9px] font-mono text-cyber-pink opacity-0 group-hover:opacity-100 transition-opacity">
                    <Terminal size={10} />
                    LOCKED
                </div>
            )}

            {isUnlocked && (
                <div className="absolute top-2 right-2 flex items-center gap-1 text-[9px] font-mono text-cyber-blue opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={10} />
                    VIEW_DATA
                </div>
            )}
        </motion.div>
    );
};
