/**
 * MAI Agent Registry
 * Defines the persona, role, and trigger keywords for each agent.
 */
export const AGENT_REGISTRY = {
    // --- EXECUTIVE BOARD ---
    'CEO': {
        role: 'Chief Executive Officer',
        description: 'Strategy, Vision, ROI, Business Model',
        keywords: ['strategy', 'business', 'money', 'invest', 'vision', 'roadmap', 'startup', 'market', 'ceo']
    },
    'CTO': {
        role: 'Chief Technology Officer',
        description: 'Tech Stack, Architecture, Feasibility',
        keywords: ['tech', 'stack', 'architecture', 'database', 'server', 'cloud', 'framework', 'cto', 'scale']
    },
    'CPO': {
        role: 'Chief Product Officer',
        description: 'Product Features, UX Roadmap, MVP',
        keywords: ['product', 'feature', 'user', 'ux', 'roadmap', 'mvp', 'requirements', 'cpo']
    },
    'CMO': {
        role: 'Chief Marketing Officer',
        description: 'Branding, Growth, Go-to-Market',
        keywords: ['marketing', 'brand', 'growth', 'ad', 'social', 'campaign', 'launch', 'cmo']
    },

    // --- ENGINEERING ---
    'ARCHITECT': {
        role: 'System Architect',
        description: 'System Design, Patterns, Scalability',
        keywords: ['system', 'design', 'pattern', 'microservice', 'monolith', 'api', 'structure', 'architect']
    },
    'DEV': {
        role: 'Full-Stack Developer',
        description: 'Implementation, Code, Bugs, Features',
        keywords: ['code', 'implement', 'bug', 'fix', 'function', 'react', 'node', 'javascript', 'typescript', 'dev']
    },
    'QA': {
        role: 'Quality Assurance',
        description: 'Testing, Bugs, Risk, Stability',
        keywords: ['test', 'qa', 'bug', 'error', 'fail', 'stable', 'risk', 'quality']
    },
    'DEVOPS': {
        role: 'DevOps Engineer',
        description: 'CI/CD, AWS, Docker, Deployment',
        keywords: ['deploy', 'aws', 'docker', 'kubernetes', 'ci/cd', 'pipeline', 'server', 'linux', 'cloud']
    },
    'MOBILE': {
        role: 'Mobile Developer',
        description: 'iOS, Android, React Native, Flutter',
        keywords: ['mobile', 'app', 'ios', 'android', 'flutter', 'react native', 'phone', 'tablet']
    },
    'DATA': {
        role: 'Data Scientist',
        description: 'Analytics, AI, ML, Data Struct',
        keywords: ['data', 'analytics', 'ai', 'ml', 'python', 'sql', 'database', 'model', 'train']
    },
    'CISO': {
        role: 'Chief Info Security Officer',
        description: 'Security, Pen-test, Compliance',
        keywords: ['security', 'hack', 'auth', 'oauth', 'token', 'secret', 'compliance', 'gdpr', 'safe']
    },

    // --- PRODUCT & DESIGN ---
    'UXR': {
        role: 'UX Researcher',
        description: 'User Interviews, Personas, Usability',
        keywords: ['research', 'interview', 'survey', 'usability', 'user flow', 'journey']
    },
    'CDO': {
        role: 'Chief Design Officer',
        description: 'UI Design, Aesthetics, Brand Identity',
        keywords: ['design', 'ui', 'color', 'font', 'logo', 'sketch', 'figma', 'mockup']
    },
    'SOCIAL': {
        role: 'Social Media Manager',
        description: 'Content, Twitter, LinkedIn, Viral',
        keywords: ['social', 'twitter', 'linkedin', 'instagram', 'post', 'viral', 'content']
    }
};

/**
 * Default agents that should almost always be present for specific workflow types
 */
export const WORKFLOW_DEFAULTS = {
    'brainstorm': ['CEO', 'CTO', 'CPO'],
    'party': ['ARCHITECT', 'DEV', 'QA'],
    'debug': ['ARCHITECT', 'DEV'],
    'test': ['QA', 'CISO'],
    'scenario': ['CEO', 'COO'],
    'develop': ['ARCHITECT', 'DEV', 'QA', 'UXR']
};

/**
 * Defines the next logical workflow to suggest after completion.
 */
export const WORKFLOW_CHAIN = {
    'brainstorm': {
        next: 'develop',
        message: '🚀 Plan approved? Proceed to DEVELOPMENT?'
    },
    'party': {
        next: 'test',
        message: '🎉 Party over. Run QA TESTS?'
    },
    'debug': {
        next: 'test',
        message: '🐞 Bug fixed? Verify with TESTS?'
    },
    'scenario': {
        next: 'brainstorm',
        message: '🌪️ Crisis simulated. BRAINSTORM solutions?'
    }
};
