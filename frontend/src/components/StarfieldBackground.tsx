// src/components/StarfieldBackground.tsx
"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from 'next-themes'; // We'll add this later, for now let's assume dark

const particlesOptions: ISourceOptions = {
  background: {
    color: {
      value: "transparent",
    },
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      repulse: {
        distance: 60,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: false,
      opacity: 0.1,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "out",
      },
      random: true,
      speed: 0.1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 400, // Number of stars
    },
    opacity: {
      value: { min: 0.1, max: 0.7 },
      animation: {
        enable: true,
        speed: 1,
        sync: false,
      }
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 0.5, max: 1.5 },
      animation: {
        enable: true,
        speed: 2,
        sync: false,
      }
    },
  },
  detectRetina: true,
};

export function StarfieldBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={particlesOptions}
        className="absolute inset-0 -z-50"
      />
    );
  }

  return null;
}