'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../../components/layout/Navbar';
import Hero from '../../components/Sections/Hero';
import About from '../../components/Sections/About';
import Projects from '../../components/Sections/Projects';
import Contact from '../../components/Sections/Contact';
import Footer from '../../components/layout/Footer';

// Charger les particles seulement après le rendu initial
const ParticlesBackground = dynamic(
  () => import('../../components/UI/ParticlesBackground'),
  { 
    ssr: false, // Pas de rendu côté serveur
    loading: () => (
      <div className="fixed inset-0 bg-primary z-0 particles-overlay"></div>
    )
  }
);

export default function Home() {
  const [showParticles, setShowParticles] = useState(false);

  // Afficher les particles après le chargement initial
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowParticles(true);
    }, 2000); // 2 secondes après le chargement

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-primary text-primary relative overflow-hidden">
      {/* Particles en lazy loading */}
      {showParticles && <ParticlesBackground />}
      
      {/* Overlay pour mieux voir le contenu */}
      <div className="particles-overlay"></div>
      
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
