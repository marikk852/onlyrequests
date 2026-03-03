"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const COLORS = ["#FF7675", "#006266", "#ff9a99", "#1a8a8e", "#ffb3b2", "#4da3a6", "#94a3b8"];
const SHAPES = ["square", "circle", "rect"];

interface Particle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  rotation: number;
  shape: string;
}

export default function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const count = 60;
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100 - 10,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 4 + Math.random() * 6,
      rotation: Math.random() * 360,
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: -20,
            width: p.shape === "rect" ? p.size * 2 : p.size,
            height: p.size,
            borderRadius: p.shape === "circle" ? "50%" : 2,
            backgroundColor: p.color,
          }}
          initial={{ opacity: 0, y: 0, rotate: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [0, "100vh"],
            rotate: p.rotation + 720,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}
