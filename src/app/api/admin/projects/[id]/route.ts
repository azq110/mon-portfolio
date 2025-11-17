import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Interfaces pour le typage (doivent être les mêmes que dans l'autre route)
interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
  github: string;
  category: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProjectsData {
  projects: Project[];
}

interface ProjectInput {
  title?: string;
  description?: string;
  technologies?: string[];
  image?: string;
  link?: string;
  github?: string;
  category?: string;
  featured?: boolean;
}

// Interface pour les paramètres de route
interface RouteParams {
  params: {
    id: string;
  };
}

// Chemin vers le fichier JSON
const projectsFilePath = path.join(process.cwd(), 'public', 'data', 'project.json');

// Lire les projets depuis le JSON
async function readProjects(): Promise<ProjectsData> {
  try {
    const data = await fs.readFile(projectsFilePath, 'utf8');
    return JSON.parse(data);
  } catch  {
    // Si le fichier n'existe pas, retourner une structure vide
    return { projects: [] };
  }
}

// Écrire les projets dans le JSON
async function writeProjects(data: ProjectsData): Promise<boolean> {
  try {
    await fs.mkdir(path.dirname(projectsFilePath), { recursive: true });
    await fs.writeFile(projectsFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Erreur écriture:', error);
    return false;
  }
}

// GET - Récupérer un projet spécifique par ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const data = await readProjects();
    
    const project = data.projects.find((p: Project) => p.id === parseInt(id));
    
    if (!project) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(project);
  } catch  {
    return NextResponse.json(
      { error: 'Erreur lors de la lecture du projet' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un projet
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const body: ProjectInput = await request.json();
    const data = await readProjects();
    
    const projectIndex = data.projects.findIndex((p: Project) => p.id === parseInt(id));
    
    if (projectIndex === -1) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      );
    }
    
    // Mettre à jour le projet
    data.projects[projectIndex] = {
      ...data.projects[projectIndex],
      ...body,
      id: parseInt(id), // Garder l'ID original
      updatedAt: new Date().toISOString()
    };
    
    const success = await writeProjects(data);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Erreur lors de la sauvegarde' },
        { status: 500 }
      );
    }

    return NextResponse.json(data.projects[projectIndex]);
    
  } catch (error) {
    console.error('Erreur mise à jour projet:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du projet' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un projet
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const data = await readProjects();
    
    const projectIndex = data.projects.findIndex((p: Project) => p.id === parseInt(id));
    
    if (projectIndex === -1) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      );
    }
    
    // Supprimer le projet
    const deletedProject = data.projects.splice(projectIndex, 1)[0];
    
    const success = await writeProjects(data);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Erreur lors de la sauvegarde' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      message: 'Projet supprimé avec succès',
      project: deletedProject 
    });
    
  } catch (error) {
    console.error('Erreur suppression projet:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du projet' },
      { status: 500 }
    );
  }
}