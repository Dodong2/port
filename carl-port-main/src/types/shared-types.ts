/* Loading */
export interface PageLoaderProps {
    minLoadTime: number
    onComplete?: () => void
}

// types/retro-card-types.ts
export interface CardStat {
    label: string;
    value: number;
}

export interface RetroCardData {
    id: string;
    name: string;
    game: string;
    badge: string;
    image: string;
    stats: CardStat[];
    specialMove: string;
}

export type ViewMode = 'grid' | 'list';

/* Home Types */
interface buttonLabel {
    label: string
}
export interface HomeTypes {
    id: string
    image: string
    resume: string
    resumePDF: string
    dialogue: string[]
    buttonLabels: buttonLabel[]
}

/* Skills Types */
interface SkillStats {
    label: string;
    value: number;
}

export interface SkillsType {
    id: string
    cardTitle: string
    programs: string[]
    programStats: SkillStats[]
}

/* Projects Types */
interface ProjectsStats {
    label: string
    value: number
}
export interface ProjectsTypes {
    id: string
    projectTitle: string
    created: string
    image: string
    descriptions: string[]
    projectStats: ProjectsStats[]

}

/* Contact Types */
export interface ContactTypes {
    id: string
    message: string[]
    services: string[]
    links: string[]
}

export interface BotTypes {
    id: string
    botImg: string
    descriptions: string
}

export type ChatRole = "user" | "bot";

export interface ChatMessage {
  role: ChatRole;
  text: string;
  time: string;
}