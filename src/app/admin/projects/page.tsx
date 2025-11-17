'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '../../src/../types';

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin-auth') === 'true';
    if (!isLoggedIn) {
      router.push('/admin');
      return;
    }
    loadProjects();
  }, [router]);

  // Charger les projets via l'API
  const loadProjects = async () => {
    try {
      setError(null);
      const response = await fetch('/api/admin/projects');
      
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Erreur chargement:', error);
      setError('Impossible de charger les projets depuis l\'API');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un projet via l'API
  const deleteProject = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return;

    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Recharger la liste après suppression
        await loadProjects();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur suppression:', error);
      alert('Erreur lors de la suppression: ' + (error as Error).message);
    }
  };

  // Basculer le statut "featured" via l'API
 // Basculer le statut "featured" via l'API
const toggleFeatured = async (id: number) => {
  try {
    const project = projects.find(p => p.id === id);
    if (!project) return;

    const response = await fetch(`/api/admin/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...project,
        featured: !project.featured
      }),
    });

    if (response.ok) {
      const updatedProject = await response.json();
      // Mettre à jour l'état local immédiatement
      setProjects(projects.map(p => 
        p.id === id ? updatedProject : p
      ));
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erreur lors de la mise à jour');
    }
  } catch (error) {
    console.error('Erreur mise à jour:', error);
    alert('Erreur lors de la mise à jour: ' + (error as Error).message);
  }
};

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] p-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <span className="ml-4 text-white">Chargement des projets...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Gestion des Projets</h1>
            <p className="text-gray-400 mt-2">
              {projects.length} projet{projects.length > 1 ? 's' : ''} au total
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/admin/projects/new')}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              + Nouveau Projet
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('admin-auth');
                router.push('/');
              }}
              className="bg-gray-700 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-400">{error}</p>
            <button 
              onClick={loadProjects}
              className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Liste des projets */}
        <div className="bg-[#0a0a0a] rounded-2xl border border-gray-800 overflow-hidden">
          {projects.length === 0 && !error ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg mb-4">Aucun projet pour le moment</p>
              <button
                onClick={() => router.push('/admin/projects/new')}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Créer votre premier projet
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-semibold">Projet</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Technologies</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Statut</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-900/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {project.title.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{project.title}</h3>
                            <p className="text-gray-400 text-sm line-clamp-2 max-w-md">
                              {project.description}
                            </p>
                            <div className="flex gap-2 mt-1">
                              {project.image && (
                                <span className="text-xs text-cyan-400">📷 Image</span>
                              )}
                              {project.github && (
                                <span className="text-xs text-green-400">🐙 GitHub</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {project.technologies.slice(0, 3).map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-purple-900/30 text-purple-300 text-xs rounded"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleFeatured(project.id)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                            project.featured
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                          }`}
                        >
                          {project.featured ? '⭐ En avant' : 'Standard'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => router.push(`/admin/projects/edit/${project.id}`)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => deleteProject(project.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Statut API */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 bg-green-900/20 text-green-400 px-4 py-2 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm">API connectée - {projects.length} projet(s) chargé(s)</span>
          </div>
        </div>
      </div>
    </div>
  );
}