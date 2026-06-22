/* data */
import type { ProjectsTypes } from "../types/shared-types";
/* images */
import Lms from '../assets/images/LMS.png'
import Inventory from '../assets/images/inventory.png'
import AppCon from '../assets/images/appcon.png'
import Bao from '../assets/images/bao.png'

export const ProjectData: ProjectsTypes[] = [
    {
        id: "1",
        projectTitle: "LMS",
        created: '2025',
        image: Lms,
        descriptions: [
            'EduLink is a Learning Management System (LMS) capstone web application. As part of a group project, I served as the programmer, responsible for coding and deployment.',
        ],
        projectStats: [
            { label: 'Next.ts', value: 100 },
            { label: 'Prisma ORM', value: 100 },
            { label: 'Postgresql', value: 100 },
            { label: 'Docker', value: 100 }
        ]
    },
    {
        id: "2",
        projectTitle: "Inventory",
        created: '2025',
        image: Inventory,
        descriptions: [
            'This was a freelance project for one of my subjects. My client was Jep Shop, a motorcycle parts business. Together with my classmates, I developed an inventory management system for them.',
        ],
        projectStats: [
            { label: 'MongoDB', value: 100 },
            { label: 'Express.js', value: 100 },
            { label: 'React.js', value: 100 },
            { label: 'Node.js', value: 100 }
        ]
    },
    {
        id: "3",
        projectTitle: "Healthcare app",
        created: '2023-2024',
        image: AppCon,
        descriptions: [
            'Health Electronic Alert Network AppCon is a competition focused on developing web or mobile applications that aim to resolve social issues in the Philippines. Since this is a team project, my contributions were in front-end development, where I coded the UI design into the website and hosted it.'
        ],
        projectStats: [
            { label: 'React.js', value: 100 },
            { label: 'Css', value: 100 },
            { label: 'Tailwind.css', value: 100 },
        ]
    },
    {
        id: "4",
        projectTitle: "E-commerce",
        created: '2024',
        image: Bao,
        descriptions: [
            'Business Affairs Office. This is my final project in the subjects Multimedia Systems and Web Systems and Technologies, where my classmates handled the website design while I coded its UI and deployed it.'
        ],
        projectStats: [
            { label: 'React.js', value: 100 },
            { label: 'Tailwind.css', value: 100 },
        ]
    }
]