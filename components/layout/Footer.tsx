



import React from 'react';

const Footer: React.FC = () => {
 const socialLinks = [
    { icon: 'fab fa-github', url: '#' },
    { icon: 'fab fa-linkedin-in', url: '#' },
    { icon: 'fab fa-twitter', url: '#' },
    { icon: 'fab fa-dribbble', url: '#' },
  ];

  return (
    <footer className="py-12 bg-tertiary border-t border-theme">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-8">
          {socialLinks.map((link, index) => (
            <a 
              key={index}
              href={link.url} 
              className="w-12 h-12 bg-secondary hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-500 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 border border-theme"
            >
              <i className={`${link.icon} text-primary`}></i>
            </a>
          ))}
        </div>
        <p className="text-secondary">© 2025 Tous droits réservés. Conçu avec ❤️</p>
      </div>
    </footer>
  );
};

export default Footer;