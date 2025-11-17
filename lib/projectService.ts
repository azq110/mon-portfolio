import { Project } from '../src/app/types';
import projectsData from '../public/data/project.json';

// Fonction pour charger les projets depuis le JSON
export async function getProjects(): Promise<Project[]> {
  try {
    return projectsData.projects;
  } catch (error) {
    console.error('Erreur lors du chargement des projets:', error);
    return [];
  }
}

// Fonction pour obtenir les projets mis en avant
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter(project => project.featured);
}

// Fonction pour obtenir les projets par catégorie
export async function getProjectsByCategory(category: string): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter(project => project.category === category);
}

// Fonction pour ajouter un nouveau projet (si vous voulez une interface admin plus tard)
export async function addProject(newProject: Omit<Project, 'id'>): Promise<Project> {
  // Dans une vraie application, vous enverriez ça à une API
  // Pour l'instant, on simule l'ajout
  const projects = await getProjects();
  const project: Project = {
    ...newProject,
    id: Math.max(...projects.map(p => p.id)) + 1
  };
  
  // Ici, vous pourriez sauvegarder dans une base de données
  return project;
}