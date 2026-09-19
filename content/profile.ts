/**
 * Single source of truth for everything the world renders.
 * Edit here, not in components.
 */

export type Stat = { label: string; value: string };

export type Checkpoint = {
  id: string;
  /** Mario-style level code shown on the plaque. */
  world: string;
  /** Short title on the signboard. */
  title: string;
  /** Organisation name, rendered under the title. */
  org: string;
  /** Free-text period, e.g. "2022 – 2026". */
  period: string;
  location?: string;
  /** Logo lives in /public/assets. Mounted on a white plaque, never recoloured. */
  logo?: { src: string; alt: string };
  /** Lead paragraph. One or two sentences, plain language. */
  intro?: string;
  /** Achievement bullets. */
  bullets: string[];
  /** Skills "collected" at this checkpoint, rendered as power-up items. */
  powerUps: string[];
  /** Score numbers tallied in the HUD when the checkpoint is reached. */
  stats: Stat[];
  /** Optional closing line, rendered large and alone as the player exits. */
  outro?: string;
};

export const profile = {
  name: 'Udit Sharma',
  role: 'Software Engineer',
  email: 'udit55sharma@gmail.com',
  linkedin: 'https://www.linkedin.com/in/udit55sharma',
  github: 'https://github.com/Udit55Sharma',
  leetcode: 'https://leetcode.com/u/udit55sharma',
  hackerrank: 'https://hackerrank.com/udit55sharma',
};

export const checkpoints: Checkpoint[] = [
  {
    id: 'glbajaj',
    world: '1-1',
    title: 'Where it started',
    org: 'GL Bajaj Institute of Technology & Management',
    period: '2022 – 2026',
    location: 'Greater Noida, UP',
    logo: { src: '/assets/glbajaj.png', alt: 'GL Bajaj Institute of Technology & Management' },
    intro:
      'B.Tech in Information Technology. Four years of fundamentals, late-night builds, and finding out which parts of computing actually stuck.',
    bullets: [
      'B.Tech, Information Technology — CGPA 7.71',
      'Jaypee Public School, Greater Noida — Class X 93%, Class XII 84%',
    ],
    powerUps: ['C++', 'Java', 'Python', 'SQL', 'Git'],
    stats: [{ label: 'CGPA', value: '7.71' }],
  },
  {
    id: 'amazon',
    world: '2-1',
    title: 'The power-up',
    org: 'Amazon ML Summer School 2025',
    period: 'Aug 2025',
    logo: { src: '/assets/amazon.svg', alt: 'Amazon' },
    intro:
      "Selected for Amazon's flagship machine learning programme — 3,000 students from more than 60,000 applicants.",
    bullets: [
      'Top 5% of applicants nationwide — 3,000 selected from 60,000+',
      'Supervised & unsupervised learning, deep neural networks, generative AI, reinforcement learning, causal inference, sequential learning',
      'Taught directly by Amazon Scientists on real-world ML systems',
    ],
    powerUps: ['Machine Learning', 'Deep Learning', 'Generative AI', 'scikit-learn', 'Pandas'],
    stats: [
      { label: 'Selected', value: 'Top 5%' },
      { label: 'Applicants', value: '60,000+' },
    ],
  },
  {
    id: 'maq-intern',
    world: '3-1',
    title: 'The grind',
    org: 'MAQ Software — Intern',
    period: 'TBC',
    location: 'Noida',
    logo: { src: '/assets/maq.png', alt: 'MAQ Software' },
    intro:
      'Countless hours of learning, making mistakes, asking questions, and debugging issues that made absolutely no sense at first — until things gradually started to make sense.',
    bullets: [
      'Got hands on technologies I had only read about: C#, .NET, Dynamics 365, Power Platform, Azure, Power Automate, Dataverse, and eventually Semantic Kernel',
      'Developed and enhanced enterprise CRM solutions using Microsoft Dynamics 365 and the Power Platform, contributing to end-to-end feature development and customisation of business requirements',
      'Designed and implemented custom Dynamics 365 plug-ins, Power Automate cloud flows, and model-driven Power Apps customisations to automate workflows and streamline CRM business processes',
      'Learned how software is designed before a single line of code is written',
      'Learned how teams collaborate to solve complex business problems',
      'Learned how to debug patiently instead of simply guessing',
      'Learned why clean, maintainable code matters in the long run',
    ],
    powerUps: ['C#', '.NET', 'Dynamics 365', 'Power Platform', 'Power Automate'],
    stats: [],
  },
  {
    id: 'maq-se1',
    world: '4-1',
    title: 'Shipping',
    org: 'MAQ Software — SE-1',
    period: 'Sept 2025 – Present',
    location: 'Noida',
    logo: { src: '/assets/maq.png', alt: 'MAQ Software' },
    intro:
      'Building AI-powered features inside enterprise CRM — from design through to production.',
    bullets: [
      'Built and deployed AI-powered chatbot features using C# and .NET, owning the complete software development lifecycle from design and implementation through testing and deployment',
      'Leveraged Semantic Kernel to design kernel functions, orchestrate LLM-driven conversational workflows, and implement intent-based response pipelines, improving automation and user query resolution',
      // --- agentic bullets below are DRAFT, pending Udit's confirmation ---
      'Designed agentic workflows where the model plans and invokes Semantic Kernel functions to complete multi-step CRM tasks autonomously',
      'Implemented tool and function calling so the agent can query Dataverse, trigger Power Automate flows, and write results back to Dynamics 365',
      'Built intent routing and conversation memory so the agent holds context across turns',
      'Added guardrails, retries, and response evaluation to keep agent output reliable in production',
    ],
    powerUps: ['Semantic Kernel', 'Agentic Workflows', 'LLM Orchestration', 'C#', '.NET'],
    stats: [],
    // Closes the whole MAQ arc, so it lands after SE-1 rather than mid-story.
    outro: 'And most importantly — how much there is still left to learn.',
  },
  {
    id: 'castle',
    world: '5-1',
    title: 'The castle',
    org: 'What comes next',
    period: 'Loading…',
    intro: 'This level is still being built.',
    bullets: [],
    powerUps: [],
    stats: [],
  },
];

export type Project = {
  id: string;
  /** Which checkpoint the block floats after. */
  afterCheckpoint: string;
  title: string;
  /** Short caption above the block in the world. */
  shortLabel: string;
  period: string;
  stack: string[];
  bullets: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    id: 'aktu',
    afterCheckpoint: 'glbajaj',
    title: 'AKTU PYQ Portal',
    shortLabel: 'PROJECT 01',
    period: 'Dec 2024',
    stack: ['Django', 'PostgreSQL', 'HTML', 'CSS', 'DocTR'],
    bullets: [
      'Full-stack web portal giving students centralised access to AKTU previous-year question papers',
      'Integrated an AI-powered solution generator producing contextual answers and explanations for exam questions',
      'Used DocTR OCR to extract text from question-paper PDFs for efficient content processing',
    ],
  },
  {
    id: 'churn',
    afterCheckpoint: 'amazon',
    title: 'Bank Customer Churn Model',
    shortLabel: 'PROJECT 02',
    period: 'Oct 2024',
    stack: ['Python', 'scikit-learn', 'Pandas', 'NumPy'],
    bullets: [
      'Machine learning model predicting customer churn from a banking customer dataset',
      'Preprocessed data and built models with pandas, NumPy, and scikit-learn',
      'Achieved 93% accuracy predicting churn',
    ],
  },
];

/** HUD counters — these tick up as the player moves right. */
export const coinTargets = {
  leetcode: 500,
  hackerrankSql: 5,
  hackerrankCpp: 4,
};
