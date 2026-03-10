import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

const THEORY_SKILLS = [
    { name: "DSA", val: "65%" },
    { name: "OOP", val: "80%" },
    { name: "Low Level Design", val: "70%" },
    { name: "Digital Logic Design", val: "65%" },
    { name: "Theory of Computation", val: "70%" },
    { name: "Computer Architecture", val: "67%" },
    { name: "Signal and Systems", val: "80%" }
];

const PRACTICAL_SKILLS = [
    { name: "Frontend", val: "30%" },
    { name: "Backend", val: "55%" },
    { name: "Database", val: "40%" },
    { name: "Machine Learning", val: "35%" },
    { name: "DevOps", val: "20%" }
];

export const Whiteboard = () => {
    const SkillBar = ({ skill, color = "cyber-blue" }: { skill: { name: string, val: string }, color?: string }) => (
        <div key={skill.name} className="bg-slate-dark/30 border border-slate-700 p-2.5 group hover:border-current transition-colors" style={{ color: `var(--color-${color})` }}>
            <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] md:text-xs font-mono text-slate-300 group-hover:text-current uppercase tracking-wider truncate pr-1">{skill.name}</span>
                {/* Explicit percentage removed per user request */}
            </div>
            <div className="w-full h-1.5 bg-obsidian border border-slate-800 overflow-hidden relative">
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: skill.val }}
                    transition={{ duration: 2, ease: "circOut", delay: 0.1 }}
                    className="h-full absolute top-0 left-0"
                    style={{
                        backgroundColor: color === 'cyber-blue' ? '#00A3FF' : '#FF00FF',
                        boxShadow: color === 'cyber-blue' ? '0 0 10px #00A3FF' : '0 0 10px #FF00FF'
                    }}
                />
            </div>
        </div>
    );

    return (
        <section className="space-y-4">
            <div className="flex items-center gap-4">
                <h2 className="text-xl font-mono font-bold text-cyber-yellow flex items-center gap-2">
                    <Cpu size={20} />
                    SKILLS.LOG
                </h2>
                <div className="h-px flex-1 bg-cyber-yellow/10" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                    <h3 className="text-[11px] md:text-xs font-mono text-cyber-blue/70 uppercase tracking-[0.2em] border-l-2 border-cyber-blue pl-2 font-bold">Theoretical</h3>
                    {THEORY_SKILLS.map(skill => <SkillBar key={skill.name} skill={skill} color="cyber-blue" />)}
                </div>
                <div className="space-y-3">
                    <h3 className="text-[11px] md:text-xs font-mono text-cyber-pink/70 uppercase tracking-[0.2em] border-l-2 border-cyber-pink pl-2 font-bold">Practical</h3>
                    {PRACTICAL_SKILLS.map(skill => <SkillBar key={skill.name} skill={skill} color="cyber-pink" />)}
                </div>
            </div>
        </section>
    );
};
