import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Building2, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const isHome = location.pathname === '/';

  const scrollToSection = (id: string) => {
    if (!isHome) {
      // If not on home, we just navigate to home with hash (handled by useEffect in Home or simple anchor)
      // For simplicity in this demo, we'll use a Link with hash or programmatic navigation
      window.location.href = `/#${id}`;
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
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
        className="pointer-events-auto backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center justify-between gap-8"
      >
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="https://s1.directupload.eu/images/260224/kgemdfqa.png" alt="Crank Facility Management" className="h-10 object-contain" />
        </Link>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 whitespace-nowrap">
          <button onClick={() => scrollToSection('leistungen')} className="hover:text-primary-600 transition-colors">Leistungen</button>
          <button onClick={() => scrollToSection('preise')} className="hover:text-primary-600 transition-colors">Preise</button>
          <button onClick={() => scrollToSection('karriere')} className="hover:text-primary-600 transition-colors">Karriere</button>
          <button onClick={() => scrollToSection('faq')} className="hover:text-primary-600 transition-colors">FAQ</button>
          <button onClick={() => scrollToSection('kontakt')} className="hover:text-primary-600 transition-colors">Kontakt</button>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button onClick={() => scrollToSection('kontakt')} className="hidden md:flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap">
            Anfrage
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-slate-900 w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="absolute top-24 left-4 right-4 bg-white rounded-3xl shadow-2xl p-6 pointer-events-auto md:hidden border border-slate-100"
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
    </nav>
  );
}
