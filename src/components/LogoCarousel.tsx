import React from 'react';
import { motion } from 'motion/react';

const logos = [
  "https://s1.directupload.eu/images/260325/8boe7syr.webp",
  "https://s1.directupload.eu/images/260325/l6emnmib.webp",
  "https://s1.directupload.eu/images/260325/e8a6e23f.webp",
  "https://s1.directupload.eu/images/260325/scylucit.webp",
  "https://s1.directupload.eu/images/260325/pgjsxm6u.webp",
  "https://s1.directupload.eu/images/260325/39kuppq6.webp"
];

export default function LogoCarousel() {
  return (
    <section className="py-12 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest">
          Vertraut von über 50+ Unternehmen in der Region
        </p>
      </div>
      
      <div className="relative w-full flex overflow-hidden">
        {/* Transparent fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10"></div>
        
        <motion.div 
          className="flex gap-16 md:gap-24 items-center whitespace-nowrap px-8"
          animate={{ x: [0, -1035] }} // Approximate width of one set of logos
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {/* First set of logos */}
          {logos.map((logo, index) => (
            <img 
              key={`logo-1-${index}`} 
              src={logo} 
              alt={`Partner Logo ${index + 1}`} 
              className="h-12 md:h-16 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              loading="lazy"
            />
          ))}
          {/* Second set of logos for seamless loop */}
          {logos.map((logo, index) => (
            <img 
              key={`logo-2-${index}`} 
              src={logo} 
              alt={`Partner Logo ${index + 1}`} 
              className="h-12 md:h-16 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              loading="lazy"
            />
          ))}
          {/* Third set of logos for seamless loop on ultra-wide screens */}
          {logos.map((logo, index) => (
            <img 
              key={`logo-3-${index}`} 
              src={logo} 
              alt={`Partner Logo ${index + 1}`} 
              className="h-12 md:h-16 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              loading="lazy"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
