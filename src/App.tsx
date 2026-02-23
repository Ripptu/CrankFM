/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Star, CheckCircle2, Building2, Leaf, Snowflake, Wrench, ArrowRight, Menu, PhoneCall } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-white overflow-hidden selection:bg-primary-100 selection:text-primary-700">
      {/* Navbar */}
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 rounded-full px-6 py-3 flex items-center justify-between w-full max-w-5xl"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900 tracking-tight">Crank</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#leistungen" className="hover:text-primary-600 transition-colors">Leistungen</a>
            <a href="#ueber-uns" className="hover:text-primary-600 transition-colors">Über uns</a>
            <a href="#preise" className="hover:text-primary-600 transition-colors">Preise</a>
            <a href="#kontakt" className="hover:text-primary-600 transition-colors">Kontakt</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5">
              Kostenlose Anfrage
            </button>
            <button className="md:hidden text-slate-900">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-50 via-white to-white"></div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-8"
        >
          <Star className="w-3.5 h-3.5 text-primary-600 fill-primary-600" />
          <span className="text-xs font-semibold tracking-wide text-slate-700 uppercase">Ihr Premium Partner</span>
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl font-serif text-slate-900 max-w-4xl tracking-tight leading-[1.1] mb-6"
        >
          Werterhalt und Pflege mit <span className="italic text-primary-600">höchstem</span> Standard.
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg md:text-xl text-slate-500 max-w-2xl mb-10 leading-relaxed"
        >
          Die All-in-One Lösung für Ihr Gebäude. Von der Gebäudereinigung über Landschaftsbau bis zum Winterdienst – wir machen es Ihnen einfach.
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-20"
        >
          <button className="w-full sm:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-all hover:shadow-xl hover:shadow-primary-600/20 hover:-translate-y-0.5 flex items-center justify-center gap-2">
            Jetzt Angebot einholen
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-full font-medium transition-all hover:shadow-md">
            Unsere Leistungen
          </button>
        </motion.div>

        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative w-full max-w-5xl aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop" 
            alt="Modernes Bürogebäude" 
            className="w-full h-full object-cover"
          />
          
          {/* Floating UI Elements */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="absolute top-6 left-6 md:top-10 md:left-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/20"
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-900">100% Zuverlässigkeit</p>
              <p className="text-xs text-slate-500">Rundum-Sorglos Paket</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="absolute bottom-6 right-6 md:bottom-10 md:right-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/20"
          >
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <Star className="w-5 h-5 text-primary-600 fill-primary-600" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-900">4.9/5 Sterne</p>
              <p className="text-xs text-slate-500">Kundenbewertung</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="leistungen" className="py-24 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
              <Star className="w-3.5 h-3.5 text-primary-600 fill-primary-600" />
              <span className="text-xs font-semibold tracking-wide text-slate-700 uppercase">Unsere Expertise</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">Alles aus einer <span className="italic text-primary-600">Hand</span></h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">Maßgeschneiderte Lösungen für den perfekten Zustand Ihrer Immobilie.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Building2 className="w-6 h-6 text-primary-600" />,
                title: "Gebäude- & Hausreinigung",
                desc: "Unterhaltsreinigung, Fenster, Treppenhaus und Spezialreinigungen."
              },
              {
                icon: <Leaf className="w-6 h-6 text-primary-600" />,
                title: "Garten- & Landschaftsbau",
                desc: "Rasenmähen, Hecken schneiden, Unkrautentfernung und Pflege."
              },
              {
                icon: <Snowflake className="w-6 h-6 text-primary-600" />,
                title: "Winterdienst",
                desc: "Zuverlässige Räumung und Streudienst nach gesetzlichen Vorgaben."
              },
              {
                icon: <Wrench className="w-6 h-6 text-primary-600" />,
                title: "Hausmeisterdienste",
                desc: "Regelmäßige Kontrollen, kleine Reparaturen und Instandhaltung."
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-all hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]"
              >
                <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
              <Star className="w-3.5 h-3.5 text-primary-600 fill-primary-600" />
              <span className="text-xs font-semibold tracking-wide text-slate-700 uppercase">Warum Wir?</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6 leading-tight">
              Ein Ansprechpartner für das <span className="italic text-primary-600">komplette</span> Objekt.
            </h2>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
              Sparen Sie sich die Koordination von 5 verschiedenen Dienstleistern. Wir bündeln alle Kompetenzen für Pflege, Werterhalt und Sicherheit in einem zentralen Service.
            </p>
            <ul className="space-y-4 mb-8">
              {['Ein zentraler Ansprechpartner', 'Transparente Kostenstruktur', 'Zertifizierte Fachkräfte', '24/7 Notdienst verfügbar'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button className="px-6 py-3 bg-white border-2 border-slate-200 hover:border-primary-600 hover:text-primary-600 text-slate-900 rounded-full font-medium transition-colors">
              Mehr über uns erfahren
            </button>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2940&auto=format&fit=crop" 
                alt="Professionelle Reinigung" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Dashboard Element */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-[0_20px_40px_rgb(0,0,0,0.1)] border border-slate-100 max-w-xs hidden md:block"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-slate-900">Effizienz-Score</span>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+24%</span>
              </div>
              <div className="space-y-3">
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-600 w-[85%] rounded-full"></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Zeit gespart</span>
                  <span className="font-medium text-slate-900">12 Std/Monat</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-primary-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-[3rem]">
            <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[150%] bg-white/10 blur-3xl rounded-full transform rotate-12"></div>
            <div className="absolute -bottom-[50%] -right-[10%] w-[70%] h-[150%] bg-primary-400/20 blur-3xl rounded-full transform -rotate-12"></div>
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
              Bereit für eine <span className="italic">sorgenfreie</span> Immobilie?
            </h2>
            <p className="text-primary-100 text-lg md:text-xl mb-10">
              Kontaktieren Sie uns für ein unverbindliches Erstgespräch vor Ort. Wir erstellen ein Konzept, das genau zu Ihren Anforderungen passt.
            </p>
            <button className="px-8 py-4 bg-white text-primary-900 hover:bg-slate-50 rounded-full font-bold text-lg transition-all hover:shadow-xl hover:-translate-y-1 flex items-center gap-2 mx-auto">
              <PhoneCall className="w-5 h-5" />
              Jetzt Kontakt aufnehmen
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
              <Building2 className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-slate-900">Crank Facility Management</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-primary-600 transition-colors">Impressum</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Datenschutz</a>
            <a href="#" className="hover:text-primary-600 transition-colors">AGB</a>
          </div>
          <p className="text-sm text-slate-400">© 2026 Crank Facility Management. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
}
