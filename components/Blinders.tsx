'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Blinders() {
  const [isPresent, setIsPresent] = useState(true);

  useEffect(() => {
    // Remove the element from DOM after the animation is completely finished
    const timeout = setTimeout(() => setIsPresent(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (!isPresent) return null;

  return (
    <div className="blinders-container" aria-hidden="true">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="blinder"
          initial={{ scaleY: 1.05 }}
          animate={{ scaleY: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
            delay: i * 0.04,
          }}
        />
      ))}
    </div>
  );
}
