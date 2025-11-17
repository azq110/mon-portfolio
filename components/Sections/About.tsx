
import React from 'react';
import { Skill } from '../../src/app/types';
import Image from 'next/image';

const About: React.FC = () => {
  const skills: Skill[] = [
    { name: 'JavaScript' },
    { name: 'React' },
    { name: 'Next.js' },
    { name: 'Node.js' },
    { name: 'TypeScript' },
    { name: 'Tailwind CSS' },
    { name: 'MongoDB' },
    { name: 'UI/UX Design' },
  ];

  return (
    <section id="about" className="py-20 bg-darker relative">
      {/* Effet de background décoratif */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-cyan-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 relative inline-block animate-fade-in-up">
          À propos de moi
          <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-purple-600 to-cyan-500"></span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up delay-100">
            <h3 className="text-2xl font-bold mb-6 text-gradient">Un passionné de développement et de design</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Je suis un développeur fullstack avec plus de 5 ans d&apos;expérience dans la création 
              d&apos;applications web modernes et réactives. Mon expertise couvre à la fois le frontend 
              et le backend, me permettant de livrer des solutions complètes et performantes.
            </p>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Je suis constamment à la recherche de nouvelles technologies et tendances pour 
              améliorer mes compétences et offrir des produits à la pointe de l&apos;innovation.
            </p>

            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-gray-800 rounded-full text-sm transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-500 hover:-translate-y-1 hover:shadow-lg"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center animate-fade-in-up delay-200">
            <div className="relative group">
              {/* Image secondaire ou illustration */}
              <div className="relative w-80 h-80 rounded-2xl overflow-hidden border-2 border-purple-500/20 shadow-2xl shadow-purple-500/20">
                <Image
                  src="/projects/imageAyad.webp" // Remplacez par une autre image si nécessaire
                  alt="Alexandre au travail"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darker/80 to-transparent"></div>
              </div>
              
              {/* Élément décoratif */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-1000"></div>
              
              {/* Badge animé */}
              <div className="absolute -top-4 -left-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-4 py-2 rounded-full shadow-lg">
                <span className="text-sm font-semibold">5+ ans XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;