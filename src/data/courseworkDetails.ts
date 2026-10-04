export interface CourseDetail {
  title: string;
  code?: string;
  focus: string;
  highlights: string[];
  tools?: string[];
}

export const COURSEWORK_DETAILS: Record<string, CourseDetail> = {
  "Operating Systems": {
    title: "Operating Systems",
    code: "CSE 314",
    focus: "Kernel architecture, process synchronization, memory virtualization, and storage management.",
    highlights: [
      "xv6 UNIX Kernel: Implemented customized system calls and trap handlers",
      "Process Scheduling: Preemptive round-robin, multi-level priority queues, and context switching",
      "Concurrency & IPC: Semaphores, mutex locks, condition variables, reader-writer locks, and race condition prevention",
    ],
    tools: ["C", "xv6", "Linux", "GDB", "QEMU"],
  },
  "Compiler": {
    title: "Compiler",
    code: "CSE 310",
    focus: "End-to-end compiler design from lexical tokenization to target code emission.",
    highlights: [
      "Symbol Table: Implementation of symbol table with nested scoping, type checking, and error diagnostics",
      "Lexical Analysis: Token extraction and regular expressions using Flex",
      "Parsing & Grammars: Context-free grammars, ALL(*) parsing using ANTLR4",
      "Intermediate Representation: On the fly FASM, syntax-directed translation, and AST traversal",
    ],
    tools: ["C++", "ANTLR4", "Flex", "FASM"],
  },
  "Microcontrollers & Embedded Systems": {
    title: "Microcontrollers & Embedded Systems",
    code: "CSE 316",
    focus: "Low-level bare-metal hardware control, peripheral interfacing, and real-time firmware.",
    highlights: [
      "ATmega32 / AVR Architecture: Register-level programming in AVR C without OS abstraction",
      "Timers & Waveforms: Hardware timers, CTC mode, Fast PWM motor speed control, and frequency generation",
      "Interrupt Service Routines (ISRs): External hardware interrupts, timer overflow, and pin change triggers",
      "Protocols & Peripherals: Interfaced OLED displays via I2C, UART serial telemetry, ADC sensors, and ultrasonic rangers",
    ],
    tools: ["ATmega32", "AVR C", "Microchip Studio", "Proteus", "I2C", "PWM"],
  },
  "Artificial Intelligence": {
    title: "Artificial Intelligence",
    code: "CSE 318",
    focus: "Heuristic search, adversarial games, constraint satisfaction, and intelligent agent architectures.",
    highlights: [
      "State Space Search: A* search with admissible heuristics, IDA*, bidirectional search",
      "Adversarial Decision Making: Minimax algorithm, Alpha-Beta pruning, heuristic evaluation functions",
      "Constraint Satisfaction (CSP): Forward checking, arc consistency (AC-3), MRV & degree heuristics",
      "Probabilistic Reasoning & Planning: Markov decision processes, belief networks, and reinforcement learning",
    ],
    tools: ["Python", "NumPy", "Search Algorithms", "Optimization"],
  },
  "Computer Architecture": {
    title: "Computer Architecture",
    code: "CSE 209",
    focus: "Instruction set design, pipelining, memory hierarchy, and quantitative performance analysis.",
    highlights: [
      "MIPS Datapath: Single-cycle, multi-cycle, and 5-stage pipelined processor implementations",
      "Pipeline Hazards: Forwarding units, stall detection, dynamic branch prediction, and branch delay slots",
      "Memory Hierarchy: Cache organization (direct-mapped, set-associative), cache replacement algorithms, and miss penalties",
      "Parallel Processing: Instruction-level parallelism (ILP), superscalar execution, and vector processing",
    ],
    tools: ["Logisim", "MIPS Assembly", "Simulators"],
  },
  "Data Structures & Algorithms": {
    title: "Data Structures & Algorithms",
    code: "CSE 207",
    focus: "Rigorous algorithmic complexity analysis, asymptotic bounds, and advanced data structures.",
    highlights: [
      "Graph Algorithms: Dijkstra, Bellman-Ford, Floyd-Warshall, Kruskal, Prim, Max Flow (Ford-Fulkerson)",
      "Balanced Trees: Red-Black Trees, AVL Trees, Splay Trees, B-Trees, and Disjoint Set Unions (DSU)",
      "Paradigm Mastery: Dynamic programming with bitmask, greedy optimization, divide & conquer",
      "String Processing: KMP, Rabin-Karp, Tries, Suffix Arrays, and Hashing schemes",
    ],
    tools: ["C++", "STL", "Algorithmic Analysis"],
  },
  "Object-Oriented Programming": {
    title: "Object-Oriented Programming",
    code: "CSE 108",
    focus: "Modular architecture, clean software design principles, concurrency, and event-driven systems.",
    highlights: [
      "Design Patterns: Factory, Singleton, Observer, Strategy, and MVC architectures",
      "Core OOP Pillars: Encapsulation, Polymorphism, Abstraction, and Class Hierarchies",
      "Java Networking & GUI: Multi-threaded client-server sockets, non-blocking I/O, and JavaFX interfaces",
      "SOLID Principles: Dependency injection, interface segregation, and maintainable codebase patterns",
    ],
    tools: ["Java", "JavaFX", "Socket Programming", "C++"],
  },
  "Software Engineering": {
    title: "Software Engineering",
    code: "CSE 214",
    focus: "End-to-end SDLC, architectural patterns, automated testing, and agile team workflows.",
    highlights: [
      "Architectural Design: Microservices vs. monolithic patterns, layered systems, and RESTful API standards",
      "Requirement Analysis: Use-case modeling, user stories, UML diagrams, and software specifications",
      "Testing & Quality Assurance: Unit testing, integration testing, test-driven development (TDD), CI/CD pipelines",
      "Agile & Scrum: Sprint planning, code reviews, Git branching strategies, and production deployments",
    ],
    tools: ["Git", "Docker", "CI/CD", "UML", "Agile"],
  },
  "Discrete Mathematics": {
    title: "Discrete Mathematics",
    code: "CSE 103",
    focus: "Mathematical foundations of computer science, proof techniques, and structural reasoning.",
    highlights: [
      "Logic & Proofs: Propositional & predicate logic, induction, contradiction, and invariant reasoning",
      "Combinatorics: Permutations, combinations, Pigeonhole Principle, recurrence relations, and generating functions",
      "Graph Theory: Trees, Eulerian & Hamiltonian paths, planar graphs, and graph coloring",
      "Relations & Automata: Equivalence relations, partial orders, lattices, and discrete probability",
    ],
    tools: ["Mathematical Proofs", "Graph Theory", "Logic"],
  },
  "Linear Algebra": {
    title: "Linear Algebra",
    code: "MATH 143",
    focus: "Vector spaces, linear transformations, matrix factorizations, and machine learning foundations.",
    highlights: [
      "Matrix Factorizations: LU decomposition, QR factorization, and Singular Value Decomposition (SVD)",
      "Spectral Theory: Eigenvalues, eigenvectors, diagonalization, and symmetric matrices",
      "Vector Spaces: Basis, dimension, rank-nullity theorem, Gram-Schmidt orthogonalization",
      "ML Foundations: Least squares regression, projection matrices, and principal component analysis",
    ],
    tools: ["Matrix Algebra", "NumPy", "Eigen Decomposition"],
  },
  "Probability & Statistics": {
    title: "Probability & Statistics",
    code: "MATH 243",
    focus: "Statistical modeling, probabilistic inference, stochastic processes, and data analysis.",
    highlights: [
      "Probability Theory: Conditional probability, Bayes theorem, continuous & discrete random variables",
      "Distributions: Gaussian, Poisson, Binomial, Exponential distributions, and Central Limit Theorem",
      "Statistical Inference: Maximum Likelihood Estimation (MLE), hypothesis testing, and confidence intervals",
      "Stochastic Analysis: Markov chains, random walks, and covariance matrices",
    ],
    tools: ["Bayesian Inference", "Python", "Statistical Testing"],
  },
  "Calculus": {
    title: "Differential & Integral Calculus",
    code: "MATH 141",
    focus: "Mathematical analysis, multivariable optimization, vector calculus, and continuous dynamics.",
    highlights: [
      "Differential Calculus: Taylor series approximations, partial derivatives, and gradient vectors",
      "Optimization: Lagrange multipliers, stationary points, and directional derivatives for gradient descent",
      "Integral Calculus: Multiple integrals, Green's theorem, divergence theorem, and surface integrals",
      "Differential Equations: First and second-order ordinary differential equations and dynamical modeling",
    ],
    tools: ["Multivariable Calculus", "Optimization"],
  },
};
