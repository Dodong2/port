/* types */
import type { HomeTypes } from "../types/shared-types";
/* images */
import Me from '../assets/images/Me.png'
import MyResume from '../assets/resume/Carl_Stephen_Arocha_Resume_ATS.png'
import ResumePDF from '../assets/resume/Carl_Stephen_Arocha_Resume_ATS.pdf'

export const HomeData: HomeTypes[] = [
    {
        id: '1',
        image: Me,
        resume: MyResume,
        resumePDF: ResumePDF,
        dialogue: [
            "Greetings! My name is Carl Stephen Arocha, a BS Information Technology graduate specializing in Web and Mobile Application Development.",
            "I develop modern web and mobile applications with a focus on functionality, usability, and continuous improvement.",
            "Please continue to explore my resume, technical skills, and project portfolio.",
            "Thank you for visiting my portfolio."
        ],
        buttonLabels: [
            { label: 'Resume/Stats' },
            { label: 'continue' },
        ]
    }
]  