// src/types/index.tsx
export interface EducationEntry {
  id: string; // A unique ID for React keys, e.g., a timestamp
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
}