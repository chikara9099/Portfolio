export type EncryptionType = 'base64' | 'hex' | 'rot13' | 'rsa';

export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    cipher: string;
    solution: string;
    encryptionType: EncryptionType;
    link?: string;
}

export const PROJECTS: Project[] = [
    {
        id: "001",
        title: "TICK_TICKI",
        description: "A ticket booking system for transportation. Implemented for the sessional project of Database Course in 2nd year 1st semester",
        tags: ["Postgres", "Express", "React", "Node.js", "Fullstack"],
        cipher: "VGlja1RpY2tpIDIgTG9hZGVk",
        solution: "TickTicki 2 Loaded",
        encryptionType: "base64",
        link: "https://github.com/chikara9099/TickTicki2"
    },
    {
        id: "002",
        title: "DHEU_OCEAN_WATCH",
        description: "Coastal monitoring and ocean data visualization platform for tracking environmental changes. NASA Space Apps Challenge 2025.",
        tags: ["FastAPI", "Gemini API", "React", "AI/ML"],
        cipher: "4f6365616e2044617461204163717569726564",
        solution: "Ocean Data Acquired",
        encryptionType: "hex",
        link: "https://github.com/chikara9099/dheu-ocean-watch"
    },
    {
        id: "003",
        title: "BADHAN_DBMS",
        description: "Centralized blood donation management system consolidating reports across 180+ units nationwide.",
        tags: ["Fastify", "React", "Postgres", "DBMS"],
        cipher: "Onquna Aber...",
        solution: "Badhan Nore...",
        encryptionType: "rot13",
    }
];
