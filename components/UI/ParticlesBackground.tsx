'use client';

import React, { useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container } from "@tsparticles/engine";

const ParticlesBackground: React.FC = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log("Particles loaded", container);
  };

  // CONFIGURATION SIMPLIFIÉE ET FONCTIONNELLE
  const options = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: ["#8a2be2", "#00b4d8", "#6a0dad", "#ff6b6b", "#4ecdc4"],
      },
      links: {
        enable: true,
        color: "#8a2be2",
        distance: 150,
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        outModes: {
          default: "out",
        },
      },
      number: {
        value: 80,
        density: {
          enable: true,
          area: 800,
        },
      },
      opacity: {
        value: { min: 0.1, max: 0.5 },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
        resize: {
          enable: true,
        },
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.3,
          },
        },
        push: {
          quantity: 4,
        },
      },
    },
    detectRetina: true,
  };

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />
    );
  }

  return <></>;
};

export default ParticlesBackground;