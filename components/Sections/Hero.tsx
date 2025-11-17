import React from 'react';
import Button from '../UI/Button';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center relative pt-20">
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texte de présentation */}
          <div className="order-2 lg:order-1">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              Salut, je suis <span className="text-gradient">Ayad Hassan</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 animate-fade-in-up delay-100">
              Développeur Fullstack & Designer UI/UX
            </p>
            <div className="animate-fade-in-up delay-200">
              <Button href="#projects">
                Voir mes projets
              </Button>
            </div>
          </div>

          {/* Container pour votre image avec effets visuels */}
          <div className="order-1 lg:order-2 relative animate-fade-in-up">
            <div className="relative mx-auto lg:mx-0 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Votre image personnelle */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-purple-500/20 shadow-2xl shadow-purple-500/30">
                <Image
                  src="/projects/imageAyad.webp" // Remplacez par le chemin de votre image
                  alt="Tiegnan Ayad Hassan - Développeur Fullstack"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Effet de glow autour de l'image */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 to-cyan-500/20 animate-pulse-slow -z-10"></div>
              
              {/* Élément décoratif 1 */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl animate-float"></div>
              
              {/* Élément décoratif 2 */}
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-600/10 rounded-full blur-xl animate-float-reverse"></div>
            </div>

            {/* Badge animé */}
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-4 py-2 rounded-full shadow-lg animate-bounce-slow">
              <span className="text-sm font-semibold">Disponible</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;