const portfolioData = {
    personal: {
        name: "Your Name",
        profileImage: "https://via.placeholder.com/200",
        about: "I am a passionate [Your Role] with expertise in [Your Expertise]."
    },
    skills: {
        technical: [
            { name: "JavaScript", icon: "fab fa-js", level: 90 },
            { name: "HTML5", icon: "fab fa-html5", level: 85 },
            { name: "CSS3", icon: "fab fa-css3-alt", level: 80 }
        ],
        soft: [
            { name: "Problem Solving", icon: "fas fa-lightbulb", level: 95 }
        ],
        tools: [
            { name: "Git", icon: "fab fa-git-alt", level: 88 }
        ]
    },
    experience: [
        {
            position: "Senior Developer",
            company: "Tech Solutions",
            period: "Jan 2022 - Present",
            description: "Developed and maintained web applications.",
            achievements: ["Increased performance by 30%", "Mentored junior developers"]
        }
    ],
    leadership: [
        {
            role: "Team Lead",
            organization: "Tech Solutions",
            period: "2023 - Present",
            description: "Led a team of 5 developers.",
            achievements: ["Successfully delivered two major projects on time."]
        }
    ],
    certifications: [
        {
            name: "Certified Cyber Security Professional",
            issuer: "Global Cyber Institute",
            date: "Nov 2024",
            status: "Completed",
            icon: "fas fa-shield-alt",
            color: "#ff5f56"
        }
    ],
    projects: [
        {
            title: "Portfolio Website",
            description: "A personal portfolio site showcasing skills and projects.",
            technologies: ["HTML", "CSS", "JavaScript"],
            features: ["Responsive Design", "Interactive UI"],
            status: "Complete",
            category: "web"
        }
    ]
};

const terminalCommands = [
    {
        command: "whoami",
        output: "A versatile developer with a passion for cybersecurity and clean code."
    },
    {
        command: "ls projects",
        output: "Portfolio, Secure-Chat-App, Cyber-Threat-Dashboard"
    }
];