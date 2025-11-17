'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';


// Composant Notification (à inclure dans le même fichier ou créer séparément)
function Notification({ message, type, isVisible, onClose }: {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}) {
  if (!isVisible) return null;

  const typeStyles = {
    success: 'bg-green-500 border-green-600',
    error: 'bg-red-500 border-red-600',
    info: 'bg-blue-500 border-blue-600'
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in-up">
      <div className={`${typeStyles[type]} text-white px-6 py-4 rounded-lg border shadow-lg max-w-sm`}>
        <div className="flex items-center justify-between">
          <span className="font-medium">{message}</span>
          <button
            onClick={onClose}
            className="ml-4 text-white hover:text-gray-200 transition-colors text-lg font-bold"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NewProject() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    image: '',
    link: '',
    github: '',
    category: 'web',
    featured: false,
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false
  });
  
  const router = useRouter();

  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type, isVisible: true });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const projectData = {
        title: formData.title,
        description: formData.description,
        technologies: formData.technologies.split(',').map(tech => tech.trim()),
        image: formData.image || '/projects/default.jpg',
        link: formData.link || '#',
        github: formData.github || '',
        category: formData.category,
        featured: formData.featured,
      };

      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la création');
      }

      await response.json();
      
      // SUCCÈS - Notification verte
      showNotification('Projet créé avec succès !', 'success');
      
      // Redirection après 2 secondes
      setTimeout(() => {
        router.push('/admin/projects');
      }, 2000);

    } catch (error: unknown) {
      console.error('Erreur création projet:', error);
      
      let errorMessage = 'Erreur lors de la création du projet';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      // ERREUR - Notification rouge
      showNotification(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#121212] p-4 md:p-8">
      {/* Notification */}
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Retour
          </button>
          <h1 className="text-3xl font-bold text-white">Nouveau Projet</h1>
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
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
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
              disabled={loading}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Création...
                </>
              ) : (
                'Créer le projet'
              )}
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