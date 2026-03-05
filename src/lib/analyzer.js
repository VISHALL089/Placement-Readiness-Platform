import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

const SKILL_CATEGORIES = {
    "Core CS": ["DSA", "OOP", "DBMS", "OS", "Networks"],
    "Languages": ["Java", "Python", "JavaScript", "TypeScript", "C", "C++", "C#", "Go"],
    "Web": ["React", "Next.js", "Node.js", "Express", "REST", "GraphQL"],
    "Data": ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis"],
    "Cloud/DevOps": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux"],
    "Testing": ["Selenium", "Cypress", "Playwright", "JUnit", "PyTest"]
};

const QUESTIONS_BANK = {
    "SQL": "Explain indexing and when it helps.",
    "React": "Explain state management options in React.",
    "DSA": "How would you optimize search in sorted data?",
    "Java": "Explain the difference between interface and abstract class.",
    "Python": "What are decorators and how do they work?",
    "Node.js": "Explain the event loop in Node.js.",
    "Docker": "What is the difference between an image and a container?",
    "AWS": "What is S3 and what is it used for?",
    "DBMS": "What is normalization and why is it important?",
    "OS": "What is virtual memory and how does it work?",
    "Networks": "Explain the OSI model layers.",
    "JavaScript": "What is hoisting and closure?",
    "TypeScript": "What are the advantages of using TypeScript over JavaScript?",
    "System Design": "How would you design a scalable notification system?",
    "REST": "What are the key principles of RESTful APIs?",
    "MongoDB": "When would you choose NoSQL over SQL?",
    "Linux": "Explain the file permission model in Linux.",
    "CI/CD": "What is the importance of a CI/CD pipeline?",
    "Testing": "What is the difference between unit and integration testing?"
};

export function analyzeJD(company, role, jdText) {
    const text = jdText.toLowerCase();
    const extractedSkills = {};
    let categoriesFound = 0;

    Object.entries(SKILL_CATEGORIES).forEach(([category, skills]) => {
        const foundInCat = skills.filter(skill =>
            text.includes(skill.toLowerCase())
        );
        if (foundInCat.length > 0) {
            extractedSkills[category] = foundInCat;
            categoriesFound++;
        }
    });

    const skillList = Object.values(extractedSkills).flat();
    const hasSkills = skillList.length > 0;

    // 35 start + 5 per category (max 30) + 10 company + 10 role + 10 length
    let readinessScore = 35;
    readinessScore += Math.min(categoriesFound * 5, 30);
    if (company.trim()) readinessScore += 10;
    if (role.trim()) readinessScore += 10;
    if (jdText.length > 800) readinessScore += 10;
    readinessScore = Math.min(readinessScore, 100);

    const checklist = [
        {
            round: "Round 1: Aptitude / Basics",
            items: ["Quantitative aptitude", "Logical reasoning", "English communication", "Core CS fundamentals", "Basic problem solving"]
        },
        {
            round: "Round 2: DSA + Core CS",
            items: [
                "Data Structures basics",
                "Algorithm analysis",
                ... (extractedSkills["Core CS"] || []).map(s => `${s} advanced concepts`),
                "Time & Space complexity"
            ].slice(0, 8)
        },
        {
            round: "Round 3: Tech interview (projects + stack)",
            items: [
                "Project walkthrough",
                "Deep dive into tech stack",
                ...skillList.map(s => `${s} implementation details`),
                "System architecture"
            ].slice(0, 8)
        },
        {
            round: "Round 4: Managerial / HR",
            items: ["Behavioral questions", "Teamwork experience", "Conflict resolution", "Salary negotiation", "Cultural fitment"]
        }
    ];

    const plan = [
        { day: "Day 1–2", task: "Basics + core CS", detail: `Focus on ${extractedSkills["Core CS"]?.join(", ") || "Fundamentals"}` },
        { day: "Day 3–4", task: "DSA + coding practice", detail: "Solve 10 algorithm problems" },
        { day: "Day 5", task: "Project + resume alignment", detail: `Highlight ${skillList.slice(0, 3).join(", ")} projects` },
        { day: "Day 6", task: "Mock interview questions", detail: `Focus on ${role} specific scenarios` },
        { day: "Day 7", task: "Revision + weak areas", detail: "Quick recap of all core concepts" }
    ];

    // Adapt plan based on specific skills
    if (text.includes("react")) {
        plan[0].detail += " & Frontend fundamentals";
    }
    if (text.includes("sql") || text.includes("database")) {
        plan[0].detail += " & Database design";
    }

    const questions = [];
    const skillKeys = Object.keys(QUESTIONS_BANK);

    // Try to get specific questions
    skillList.forEach(skill => {
        const matchingKey = skillKeys.find(k => k.toLowerCase() === skill.toLowerCase());
        if (matchingKey && questions.length < 10) {
            questions.push(QUESTIONS_BANK[matchingKey]);
        }
    });

    // Fill up to 10 if needed
    if (questions.length < 10) {
        const fallbacks = ["Explain your most complex project.", "What is your preferred programming language and why?", "How do you handle deadlines?"];
        while (questions.length < 10 && fallbacks.length > 0) {
            questions.push(fallbacks.shift());
        }
    }

    // Company Intel Heuristics
    const enterpriseNames = ["google", "amazon", "microsoft", "meta", "apple", "netflix", "infosys", "tcs", "wipro", "accenture", "cognizant", "ibm", "oracle", "sap", "adobe", "salesforce"];
    const isEnterprise = enterpriseNames.some(n => company.toLowerCase().includes(n));
    const companySize = isEnterprise ? "Enterprise (2000+)" : "Startup (<200)";
    const hiringFocus = isEnterprise
        ? "Structured DSA + Deep Computer Science Fundamentals"
        : "Practical Problem Solving + Direct Stack Implementation Depth";

    // Dynamic Round Mapping Engine
    const hasDSA = text.includes("dsa") || text.includes("algorithm") || text.includes("structure");
    const hasPractical = text.includes("react") || text.includes("node") || text.includes("javascript") || text.includes("python");

    const roundMapping = isEnterprise ? [
        {
            round: "Round 1: Online Assessment",
            type: "DSA + Aptitude",
            why: "Filters candidates based on speed and core problem-solving accuracy.",
            items: ["70 mins duration", "2-3 coding problems", "20 MCQs (OS, DBMS)"]
        },
        {
            round: "Round 2: Technical Interview I",
            type: "Core DSA",
            why: "Deep dive into your logical thinking and code optimization skills.",
            items: ["Live coding", "Complexity analysis", "Edge case handling"]
        },
        {
            round: "Round 3: Technical Interview II",
            type: "System Design/Project",
            why: "Assesses how you handle complex architectures and scale.",
            items: ["LLD/HLD discussion", "Project deep dive", "Database schema design"]
        },
        {
            round: "Round 4: HR & Behavioral",
            type: "Culture Fit",
            why: "Ensures alignment with company values and long-term retention.",
            items: ["Leadership principles", "Conflict resolution", "Salary discussion"]
        }
    ] : [
        {
            round: "Round 1: Machine Coding",
            type: "Practical Task",
            why: "Verifies you can build a working feature from scratch in limited time.",
            items: ["Build a small app/component", "Code quality check", "UI/UX awareness"]
        },
        {
            round: "Round 2: Technical Discussion",
            type: "Stack Depth",
            why: "Ensures you understand the 'how' and 'why' of your primary tools.",
            items: ["Framework internals", "State management", "API optimization"]
        },
        {
            round: "Round 3: Founder/CTO Round",
            type: "Mindset & Fit",
            why: "Critical for startups to ensure you are adaptable and high-ownership.",
            items: ["Product vision", "Agile experience", "Compensation & Equity"]
        }
    ];

    const result = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        company,
        role,
        jdText,
        extractedSkills: hasSkills ? extractedSkills : { "General": ["General fresher stack"] },
        plan,
        checklist,
        questions,
        baseReadinessScore: readinessScore,
        readinessScore: readinessScore,
        skillConfidenceMap: {},
        companyIntel: {
            name: company || "Unknown Company",
            industry: "Technology Services",
            size: companySize,
            hiringFocus: hiringFocus
        },
        roundMapping
    };

    return result;
}

export function updateAnalysis(updated) {
    const history = getHistory();
    const index = history.findIndex(a => a.id === updated.id);
    if (index !== -1) {
        history[index] = updated;
        localStorage.setItem('analysis_history', JSON.stringify(history));
    }
}

export function saveToHistory(analysis) {
    const history = JSON.parse(localStorage.getItem('analysis_history') || '[]');
    history.unshift(analysis);
    localStorage.setItem('analysis_history', JSON.stringify(history));
}

export function getHistory() {
    return JSON.parse(localStorage.getItem('analysis_history') || '[]');
}

export function getAnalysisById(id) {
    const history = getHistory();
    return history.find(a => a.id === id);
}
