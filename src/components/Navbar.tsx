import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Building2, Menu, X, PhoneCall } from 'lucide-react';
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
      window.location.href = "/admin";
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
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="/" onClick={handleLogoClick} className="flex items-center gap-2 shrink-0">
          <img src="https://s1.directupload.eu/images/260325/syt3moyl.webp" alt="CRANK Logo" className={`h-10 w-auto transition-all duration-300 ${isScrolled ? 'brightness-0' : ''}`} />
        </a>
        
        {/* Center Links */}
        <div className={`hidden lg:flex items-center gap-8 text-sm font-semibold uppercase tracking-wider transition-colors duration-300 ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
          <Link to="/" className={`hover:text-primary-600 transition-colors ${isHome ? 'text-primary-600' : ''}`}>Home</Link>
          <Link to="/leistungen" className={`hover:text-primary-600 transition-colors ${location.pathname === '/leistungen' ? 'text-primary-600' : ''}`}>Leistungen</Link>
          <Link to="/referenzen" className={`hover:text-primary-600 transition-colors ${location.pathname === '/referenzen' ? 'text-primary-600' : ''}`}>Referenzen</Link>
          <Link to="/karriere" className={`hover:text-primary-600 transition-colors ${location.pathname === '/karriere' ? 'text-primary-600' : ''}`}>Karriere</Link>
          <Link to="/kontakt" className={`hover:text-primary-600 transition-colors ${location.pathname === '/kontakt' ? 'text-primary-600' : ''}`}>Kontakt</Link>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`text-sm font-bold transition-colors duration-300 ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
              Tel: +49 30 1234567
            </div>
          </div>
          <Link to="/kontakt" className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold uppercase tracking-wider px-6 py-3 transition-colors rounded-lg">
            Kontakt
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden w-10 h-10 flex items-center justify-center transition-colors rounded-lg ${isScrolled ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-20 left-0 right-0 bg-white shadow-xl border-t border-slate-100 lg:hidden z-[55]"
        >
          <div className="flex flex-col p-4 text-sm font-bold text-slate-700 uppercase tracking-wider divide-y divide-slate-100">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="py-4 hover:text-primary-600">Home</Link>
            <Link to="/leistungen" onClick={() => setIsMobileMenuOpen(false)} className="py-4 hover:text-primary-600">Leistungen</Link>
            <Link to="/referenzen" onClick={() => setIsMobileMenuOpen(false)} className="py-4 hover:text-primary-600">Referenzen</Link>
            <Link to="/karriere" onClick={() => setIsMobileMenuOpen(false)} className="py-4 hover:text-primary-600">Karriere</Link>
            <Link to="/kontakt" onClick={() => setIsMobileMenuOpen(false)} className="py-4 hover:text-primary-600">Kontakt</Link>
            <div className="pt-4 pb-2">
              <Link to="/kontakt" onClick={() => setIsMobileMenuOpen(false)} className="block text-center bg-primary-600 text-white py-3 font-bold rounded-lg">Angebot einholen</Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
