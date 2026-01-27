export type Language = 'EN' | 'ES';

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  desc: string;
}

export interface ProjectItem {
  title: string;
  tags: string[];
  desc: string;
}

export interface SkillDetail {
  name: string;
  level: number;
  experience: string;
}

export interface LocalizationStrings {
  role: string;
  sections: {
    about: string;
    highlights: string; // Added
    experience: string;
    education: string;
    projects: string;
    contact: string;
    skills: string;
    company: string;
    labs: string;
  };
  aboutText: string;
  personalBio: string;
  highlights: string[]; // Added
  companyHighlight: {
    name: string;
    role: string;
    mission: string;
    website: string;
  };
  experience: TimelineItem[];
  academicExperience: TimelineItem[];
  education: {
    degree: string;
    school: string;
    year: string;
  }[];
  // Busca la definición de certs en tus interfaces y cámbiala a esto:
  certs: { name: string; url: string | null }[];
  contactLabels: {
    email: string;
    location: string;
  };
  technicalSkills: {
    backend: SkillDetail[];
    data: SkillDetail[];
  };
  gameLabels: {
    init: string;
    score: string;
    highScore: string;
    stability: string;
    breach: string;
    restart: string;
    desc: string;
  };
}

export interface PortfolioData {
  name: string;
  en: LocalizationStrings;
  es: LocalizationStrings;
}
