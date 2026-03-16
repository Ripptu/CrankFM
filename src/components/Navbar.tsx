import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Building2, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
    
    const previous = scrollY.getPrevious() || 0;
    if (latest < 100) {
      setIsVisible(true);
    } else if (latest > previous && latest > 150) {
      setIsVisible(false);
      setIsMobileMenuOpen(false); // Close mobile menu when hiding navbar
    } else if (latest < previous) {
      setIsVisible(true);
    }
  });

  const isHome = location.pathname === '/';

  const scrollToSection = (id: string) => {
    if (!isHome) {
      window.location.href = `/#${id}`;
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const [clickCount, setClickCount] = useState(0);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount === 5) {
      setClickCount(0);
      const password = prompt("Passwort eingeben:");
      if (password === "vamela") {
        sessionStorage.setItem('adminAuth', 'true');
        window.location.href = "/admin";
      } else {
        alert("Falsches Passwort");
      }
    } else {
      if (isHome) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.location.href = "/";
      }
    }
  };

  return (
    <motion.nav 
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -150 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
    >
      <motion.div 
        layout
        initial={{ width: "90%", maxWidth: "1024px", borderRadius: "9999px" }}
        animate={{ 
          width: isScrolled ? "auto" : "90%",
          maxWidth: isScrolled ? "fit-content" : "1024px",
          padding: isScrolled ? "0.75rem 1.5rem" : "0.75rem 1.5rem",
          backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.8)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="pointer-events-auto backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hidden md:flex items-center justify-between gap-8"
      >
        <a href="/" onClick={handleLogoClick} className="flex items-center gap-2 shrink-0">
          <img src="https://s1.directupload.eu/images/260224/kgemdfqa.png" alt="Crank Facility Management" className="h-10 w-auto object-contain hidden md:block" width="150" height="40" loading="eager" fetchPriority="high" />
        </a>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 whitespace-nowrap">
          <button onClick={() => scrollToSection('leistungen')} className="hover:text-primary-600 transition-colors">Leistungen</button>
          <button onClick={() => scrollToSection('preise')} className="hover:text-primary-600 transition-colors">Preise</button>
          <button onClick={() => scrollToSection('karriere')} className="hover:text-primary-600 transition-colors">Karriere</button>
          <button onClick={() => scrollToSection('faq')} className="hover:text-primary-600 transition-colors">FAQ</button>
          <button onClick={() => scrollToSection('kontakt')} className="hover:text-primary-600 transition-colors">Kontakt</button>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button onClick={() => scrollToSection('kontakt')} className="hidden md:flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95 whitespace-nowrap">
            Anfrage
          </button>
        </div>
      </motion.div>

      {/* Mobile Hamburger Button (Fixed top right) */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-6 right-6 z-[60] text-slate-900 w-12 h-12 bg-white/90 backdrop-blur-md shadow-lg border border-slate-100 flex items-center justify-center rounded-full hover:bg-slate-50 transition-colors pointer-events-auto"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="fixed top-24 left-4 right-4 bg-white rounded-3xl shadow-2xl p-6 pointer-events-auto md:hidden border border-slate-100 z-[55]"
        >
          <div className="flex flex-col gap-4 text-center font-medium text-slate-600">
            <button onClick={() => scrollToSection('leistungen')} className="py-2 hover:text-primary-600">Leistungen</button>
            <button onClick={() => scrollToSection('preise')} className="py-2 hover:text-primary-600">Preise</button>
            <button onClick={() => scrollToSection('karriere')} className="py-2 hover:text-primary-600">Karriere</button>
            <button onClick={() => scrollToSection('faq')} className="py-2 hover:text-primary-600">FAQ</button>
            <button onClick={() => scrollToSection('kontakt')} className="py-2 hover:text-primary-600">Kontakt</button>
            <button onClick={() => scrollToSection('kontakt')} className="bg-primary-600 text-white py-3 rounded-xl mt-2">Kostenlose Anfrage</button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
