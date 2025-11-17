/*import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Chemin vers le fichier JSON
const projectsFilePath = path.join(process.cwd(), 'public','data', 'project.json');

// Lire les projets depuis le JSON
async function readProjects() {
  try {
    const data = await fs.readFile(projectsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // Si le fichier n'existe pas, retourner une structure vide
    return { projects: [] };
  }
}

// Écrire les projets dans le JSON
async function writeProjects(data: any) {
  try {
    await fs.mkdir(path.dirname(projectsFilePath), { recursive: true });
    await fs.writeFile(projectsFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Erreur écriture:', error);
    return false;
  }
}

// GET - Récupérer tous les projets
export async function GET() {
  try {
    const data = await readProjects();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la lecture des projets' },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau projet
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = await readProjects();
    
    // Générer un nouvel ID
    const newId = data.projects.length > 0 
      ? Math.max(...data.projects.map((p: any) => p.id)) + 1 
      : 1;

    const newProject = {
      id: newId,
      title: body.title || '',
      description: body.description || '',
      technologies: body.technologies || [],
      image: body.image || '/projects/default.jpg',
      link: body.link || '#',
      github: body.github || '',
      category: body.category || 'web',
      featured: body.featured || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    data.projects.push(newProject);
    
    const success = await writeProjects(data);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Erreur lors de la sauvegarde' },
        { status: 500 }
      );
    }

    return NextResponse.json(newProject, { status: 201 });
    
  } catch (error) {
    console.error('Erreur création projet:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du projet' },
      { status: 500 }
    );
  }
}*/
import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Interfaces pour le typage
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

const projectsFilePath = path.join(process.cwd(), 'public', 'data', 'project.json');

async function readProjects(): Promise<ProjectsData> {
  try {
    const data = await fs.readFile(projectsFilePath, 'utf8');
    return JSON.parse(data);
  } catch  {
    return { projects: [] };
  }
}

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

// GET - Récupérer TOUS les projets (pour l'admin)
export async function GET() {
  try {
    const data = await readProjects();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Erreur lors de la lecture des projets' },
      { status: 500 }
    );
  }
}

// POST - Créer un NOUVEAU projet
export async function POST(request: NextRequest) {
  try {
    const body: ProjectInput = await request.json();
    const data = await readProjects();
    
    const newId = data.projects.length > 0 
      ? Math.max(...data.projects.map((p: Project) => p.id)) + 1 
      : 1;

    const newProject: Project = {
      id: newId,
      title: body.title || '',
      description: body.description || '',
      technologies: body.technologies || [],
      image: body.image || '/projects/default.jpg',
      link: body.link || '#',
      github: body.github || '',
      category: body.category || 'web',
      featured: body.featured || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    data.projects.push(newProject);
    
    const success = await writeProjects(data);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Erreur lors de la sauvegarde' },
        { status: 500 }
      );
    }

    return NextResponse.json(newProject, { status: 201 });
    
  } catch (error) {
    console.error('Erreur création projet:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du projet' },
      { status: 500 }
    );
  }
}