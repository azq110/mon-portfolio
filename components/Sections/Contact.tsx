

'use client';

import React, { useState } from 'react';
import { ContactInfo } from '../../src/app/types';
import Button from '../UI/Button';
import { sendContactEmail, sendEmailFallback,  } from '../../lib/emailService';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const contactItems: ContactInfo[] = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      content: 'tiegnanhassan@gmail.com' // Remplacez par votre email
    },
    {
      icon: 'fas fa-phone',
      title: 'Téléphone',
      content: '+226 66 85 86 02'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Localisation',
      content: 'Bobo Dioulasso, Burkina Faso'
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert(null);

    // Validation basique
    if (!formData.name || !formData.email || !formData.message) {
      setAlert({
        type: 'error',
        message: 'Veuillez remplir tous les champs obligatoires.'
      });
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setAlert({
        type: 'error',
        message: 'Veuillez entrer une adresse email valide.'
      });
      setIsLoading(false);
      return;
    }

    try {
      // Essayez d'envoyer avec EmailJS, sinon utilisez la version de secours
      const result = await sendContactEmail(formData);
      
      if (result.success) {
        setAlert({
          type: 'success',
          message: result.message
        });
        setFormData({ name: '', email: '', message: '' }); // Reset du formulaire
      } else {
        setAlert({
          type: 'error',
          message: result.message
        });
      }
    } catch  {
      // Fallback en cas d'erreur
      const fallbackResult = await sendEmailFallback(formData);
      setAlert({
        type: fallbackResult.success ? 'success' : 'error',
        message: fallbackResult.message
      });
      
      if (fallbackResult.success) {
        setFormData({ name: '', email: '', message: '' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-secondary relative">
      {/* Effets de background décoratif */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-cyan-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 relative inline-block animate-fade-in-up text-primary">
          Me contacter
          <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-purple-600 to-cyan-500"></span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">Parlons de votre projet</h3>
              <p className="text-secondary mb-8">
                Vous avez un projet en tête ? Une question particulière ? 
                N&apos;hésitez pas à me contacter, je serai ravi de discuter avec vous.
              </p>
            </div>

            {contactItems.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className={`${item.icon} text-white text-lg`}></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-primary">{item.title}</h3>
                  <p className="text-secondary">{item.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Formulaire de contact */}
          <div className="bg-card-bg border border-theme rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Alertes */}
              {alert && (
                <div className={`p-4 rounded-lg border ${
                  alert.type === 'success' 
                    ? 'bg-green-900/20 border-green-800 text-green-400' 
                    : 'bg-red-900/20 border-red-800 text-red-400'
                }`}>
                  {alert.message}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="name" className="block font-medium text-primary">
                  Nom complet *
                </label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" 
                  placeholder="Votre nom et prénom"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block font-medium text-primary">
                  Email *
                </label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" 
                  placeholder="votre@email.com"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block font-medium text-primary">
                  Message *
                </label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="form-input w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" 
                  placeholder="Décrivez votre projet ou votre demande..."
                  disabled={isLoading}
                  required
                ></textarea>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Envoi en cours...
                  </>
                ) : (
                  'Envoyer le message'
                )}
              </Button>

              <p className="text-sm text-secondary text-center">
                * Champs obligatoires
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;