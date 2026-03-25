import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Plus, Minus, ArrowRight } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { Reveal } from '../components/ui/Reveal';
import SEO from '../components/SEO';

export default function Karriere() {
  const { setIsContactPopupOpen } = useOutletContext<{ setIsContactPopupOpen: (v: boolean) => void }>();
  const [openJob, setOpenJob] = useState<number | null>(null);

  const jobs = [
    { 
      title: "Gebäudereiniger (m/w/d)", 
      reqs: "Erfahrung in der Unterhaltsreinigung, Zuverlässigkeit, Deutschkenntnisse.",
      type: "Vollzeit / Teilzeit",
      location: "Geretsried & Umgebung"
    },
    { 
      title: "Gärtner (m/w/d)", 
      reqs: "Abgeschlossene Ausbildung im Garten- und Landschaftsbau, Führerschein Klasse B.",
      type: "Vollzeit",
      location: "Geretsried & Umgebung"
    },
    { 
      title: "Hausmeister (m/w/d)", 
      reqs: "Handwerkliches Geschick, selbstständige Arbeitsweise, technisches Verständnis.",
      type: "Vollzeit",
      location: "Geretsried & Umgebung"
    }
  ];

  return (
    <>
      <SEO 
        title="Karriere & Jobs | Gebäudereinigung & Hausmeisterservice"
        description="Werden Sie Teil unseres Teams! Wir suchen motivierte Mitarbeiter für Gebäudereinigung, Gartenpflege und Hausmeisterservice in Geretsried."
        url="/karriere"
      />

      <div className="pt-32 pb-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-sans font-bold tracking-tight text-white mb-6">
              Werden Sie Teil unseres <span className="text-primary-500">Teams</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Wir suchen motivierte Mitarbeiter, die mit uns wachsen wollen. Entdecken Sie unsere aktuellen Stellenangebote.
            </p>
          </Reveal>
        </div>
      </div>

      <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-8">
              <Briefcase className="w-3.5 h-3.5 text-primary-600" />
              <span className="text-xs font-semibold tracking-wide text-slate-700 uppercase">Offene Stellen</span>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="space-y-4"
            >
              {jobs.map((job, i) => (
                <motion.div 
                  key={i} 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition-all"
                >
                  <button 
                    onClick={() => setOpenJob(openJob === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none hover:bg-slate-100/50 transition-colors"
                  >
                    <div>
                      <span className="font-bold text-slate-900 text-lg block">{job.title}</span>
                      <span className="text-sm text-slate-500 mt-1 block">{job.type} • {job.location}</span>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0 ml-4 ${openJob === i ? 'bg-primary-600 text-white' : 'bg-white text-slate-400 shadow-sm border border-slate-200'}`}>
                      {openJob === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openJob === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-slate-200/50">
                          <p className="text-slate-600 mb-6 leading-relaxed"><strong className="text-slate-900">Anforderungen:</strong> {job.reqs}</p>
                          <button 
                            onClick={() => setIsContactPopupOpen(true)}
                            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 active:scale-95"
                          >
                            In 60 Sekunden bewerben
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
