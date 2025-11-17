'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Project } from '../../src/app/types';
import { getFeaturedProjects } from '../../lib/projectService';

// Charger OptimizedImage en lazy loading
const OptimizedImage = dynamic(
  () => import('../UI/OptimizedImage'),
  { 
    loading: () => (
      <div className="w-full h-48 bg-gray-300 animate-pulse rounded-lg"></div>
    )
  }
);

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleProjects, setVisibleProjects] = useState(6); // Commencer avec 6 projets

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const featuredProjects = await getFeaturedProjects();
        setProjects(featuredProjects);
      } catch (error) {
        console.error('Erreur chargement projets:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Charger plus de projets quand on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        setVisibleProjects(prev => Math.min(prev + 3, projects.length));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [projects.length]);

  if (loading) {
    return (
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 relative">
      {/* Effets d'arrière-plan */}
      <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-purple-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-cyan-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 relative inline-block animate-fade-in-up">
          Mes projets
          <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-purple-600 to-cyan-500"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, visibleProjects).map((project, index) => (
            <ProjectCard key={project.id} project={project} priority={index < 3} />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Aucun projet à afficher pour le moment.</p>
          </div>
        )}

        {visibleProjects < projects.length && (
          <div className="text-center mt-12">
            <button 
              onClick={() => setVisibleProjects(prev => Math.min(prev + 6, projects.length))}
              className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
            >
              Charger plus de projets
            </button>
            <p className="text-gray-400 mt-2">
              {visibleProjects} sur {projects.length} projets affichés
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

// Composant séparé pour la carte de projet avec lazy loading
const ProjectCard: React.FC<{ project: Project; priority?: boolean }> = ({ project, priority = false }) => {
  return (
    <div className="project-card group rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl">
      {/* Container de l'image avec effet de survol */}
      <div className="relative h-48 overflow-hidden">
        {/* Remplacement de Image par OptimizedImage avec lazy loading */}
        <OptimizedImage
          src={project.image}
          alt={project.title}
          width={400}
          height={250}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          priority={priority} // Priorité pour les premières images
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Badge technologies */}
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs px-2 py-1 rounded-full">
            {project.technologies[0]}
          </span>
        </div>
        
        {/* Icônes d'action */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {project.github && (
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-dark/80 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
              aria-label="Voir le code sur GitHub"
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          )}
          
          <a 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 bg-dark/80 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors"
            aria-label="Voir le projet en direct"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      {/* Contenu texte de la carte */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-light group-hover:text-gradient transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-300 mb-4 leading-relaxed">
          {project.description}
        </p>
        
        {/* Technologies utilisées */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.map((tech, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-purple-900/30 text-purple-300 text-xs rounded-md border border-purple-500/20"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Liens de projet */}
        <div className="flex gap-4">
          <a 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 font-medium flex items-center gap-2 transition-all duration-300 hover:gap-3 hover:text-cyan-300"
          >
            Voir le projet
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          
          {project.github && (
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 font-medium flex items-center gap-2 transition-all duration-300 hover:gap-3 hover:text-white"
            >
              Code
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;