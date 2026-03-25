import React from 'react';
import { motion } from 'motion/react';

export function Reveal({ children, delay = 0, y = 50, className = "" }: { children: React.ReactNode, delay?: number, y?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
