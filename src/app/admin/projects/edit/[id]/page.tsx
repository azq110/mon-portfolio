'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

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
}

export default function EditProject() {
  const [formData, setFormData] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin-auth') === 'true';
    if (!isLoggedIn) {
      router.push('/admin');
      return;
    }

    // DÉPLACER loadProject DANS LE useEffect
    const loadProject = async () => {
      try {
        const response = await fetch(`/api/admin/projects/${projectId}`);
        
        if (!response.ok) {
          throw new Error('Projet non trouvé');
        }
        
        const project = await response.json();
        setFormData(project);
      } catch (error) {
        console.error('Erreur chargement:', error);
        alert('Impossible de charger le projet');
        router.push('/admin/projects');
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [router, projectId]); // ← Plus de warning !

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setSaving(true);

    try {
      const response = await fetch(`/api/admin/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Projet modifié avec succès!');
        router.push('/admin/projects');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la modification');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la modification: ' + (error as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (!formData) return;

    setFormData(prev => ({
      ...prev!,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleTechnologiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    
    const technologiesArray = e.target.value.split(',').map(tech => tech.trim());
    setFormData(prev => ({
      ...prev!,
      technologies: technologiesArray
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] p-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <span className="ml-4 text-white">Chargement du projet...</span>
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-[#121212] p-8">
        <div className="text-center">
          <p className="text-red-400 text-lg">Projet non trouvé</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Retour
          </button>
          <h1 className="text-3xl font-bold text-white">Modifier le Projet</h1>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="bg-[#0a0a0a] p-8 rounded-2xl border border-gray-800 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Titre *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Catégorie</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
              >
                <option value="web">Web</option>
                <option value="mobile">Mobile</option>
                <option value="desktop">Desktop</option>
                <option value="other">Autre</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Technologies (séparées par des virgules) *
            </label>
            <input
              type="text"
              value={formData.technologies.join(', ')}
              onChange={handleTechnologiesChange}
              placeholder="React, Node.js, MongoDB"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Image</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="/projects/nom-image.jpg"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Lien du projet</label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://mon-projet.com"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">GitHub (optionnel)</label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/utilisateur/projet"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-700 rounded focus:ring-purple-500"
            />
            <label className="text-white text-sm">Mettre en avant sur la page d&apos;accueil</label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {saving ? 'Sauvegarde...' : 'Modifier le projet'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/projects')}
              className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}