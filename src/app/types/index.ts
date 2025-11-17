export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;          // Remplace 'icon'
  link: string;
  github?: string;
  category: string;
  featured: boolean;        // Optionnel: lien vers le code source
}

export interface Skill {
  name: string;
}

export interface ContactInfo {
  icon: string;
  title: string;
  content: string;
}