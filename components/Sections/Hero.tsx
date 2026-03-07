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
            <p className="text-xl md:text-2xl text-secondary mb-10 animate-fade-in-up delay-100">
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
              {/* Image personnelle */}
              <div
                className="relative w-full h-full rounded-full overflow-hidden shadow-2xl"
                style={{
                  border: '4px solid rgba(190, 255, 47, 0.2)',
                  boxShadow: '0 25px 50px rgba(190, 255, 47, 0.15)',
                }}
              >
                <Image
                  src="/projects/imageAyad.webp"
                  alt="Tiegnan Ayad Hassan - Développeur Fullstack"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Effet de glow autour de l'image */}
              <div
                className="absolute inset-0 rounded-full animate-pulse-slow -z-10"
                style={{
                  background: 'radial-gradient(circle, rgba(190,255,47,0.12) 0%, rgba(0,230,180,0.08) 100%)',
                }}
              />

              {/* Élément décoratif 1 */}
              <div
                className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-xl animate-float"
                style={{ background: 'rgba(0, 230, 180, 0.12)' }}
              />

              {/* Élément décoratif 2 */}
              <div
                className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full blur-xl animate-float-reverse"
                style={{ background: 'rgba(190, 255, 47, 0.1)' }}
              />
            </div>

            {/* Badge animé */}
            <div
              className="absolute -bottom-4 -right-4 px-4 py-2 rounded-full shadow-lg animate-bounce-slow"
              style={{
                background: 'linear-gradient(135deg, rgb(190, 255, 47), rgb(0, 230, 180))',
                color: '#0d0f0a',
                fontWeight: 600,
              }}
            >
              <span className="text-sm font-semibold">Disponible</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
