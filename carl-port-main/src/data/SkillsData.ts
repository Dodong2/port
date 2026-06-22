/* data */
import type { SkillsType } from "../types/shared-types";

export const SkillsData: SkillsType[] = [
    {
        id: '1',
        cardTitle: 'Programming Languages',
        programs: [
            "• Javascript",
            "• Typescript",
            "• PHP",
            "• Python",
            "• Rust"
        ],
        programStats: [
            { label: "Javascript", value: 80 },
            { label: "Typescript", value: 60 },
            { label: "PHP", value: 50 },
            { label: "Python", value: 30 },
            { label: "rust", value: 10 }
        ]
    },
    {
        id: '2',
        cardTitle: 'Frontend',
        programs: [
            "• HTML",
            "• CSS",
            "• Tailwind",
            "• React.js/ts",
            "• React Native",
            "• Next.ts",
        ],
        programStats: [
            { label: "HTML", value: 91 },
            { label: "CSS", value: 93 },
            { label: "Tailwind", value: 82 },
            { label: "React.JS/TS", value: 73 },
            { label: "React Native", value: 68 },
            { label: "Next.ts", value: 65 },
        ]
    },
    {
        id: '3',
        cardTitle: 'Backend',
        programs: [
            "• Node.js",
            "• MongoDB",
            "• Firebase",
            "• MySQL",
            "• Prisma ORM",
            "• Postgresql",
        ],
        programStats: [
            { label: "Node.js", value: 58 },
            { label: "MongoDB", value: 44 },
            { label: "Firebase", value: 54 },
            { label: "MySQL", value: 61 },
            { label: "Prisma ORM", value: 66 },
            { label: "Postgresql", value: 73 },
        ]
    },
    {
        id: '4',
        cardTitle: 'Tools',
        programs: [
            "• VS Code",
            "• Postman",
            "• MongoDBCompass",
            "• Docker",
            "• Vite",
        ],
        programStats: [
            { label: "VS Code", value: 90 },
            { label: "Postman", value: 85 },
            { label: "MongoDBCompass", value: 74 },
            { label: "Docker", value: 67 },
            { label: "Vite", value: 97 },
        ]
    },

]