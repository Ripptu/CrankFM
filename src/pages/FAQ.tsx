import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, ChevronDown } from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';
import SEO from '../components/SEO';

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { q: "Bieten Sie auch einmalige Reinigungen an?", a: "Ja, wir bieten sowohl regelmäßige Unterhaltsreinigungen als auch einmalige Grund- oder Sonderreinigungen an." },
    { q: "Wie schnell können Sie mit der Arbeit beginnen?", a: "In der Regel können wir nach einer Objektbesichtigung und Angebotsannahme innerhalb von 3-5 Werktagen starten. Bei Notfällen auch schneller." },
    { q: "Bringen Sie Reinigungsmittel und Geräte selbst mit?", a: "Selbstverständlich. Wir arbeiten ausschließlich mit professionellem, umweltschonendem Equipment und bringen alle benötigten Materialien selbst mit." },
    { q: "Gibt es eine Mindestvertragslaufzeit?", a: "Das hängt vom gewünschten Service ab. Bei der Unterhaltsreinigung haben wir in der Regel eine kurze Kündigungsfrist von 4 Wochen, um Ihnen maximale Flexibilität zu bieten." },
    { q: "Sind Ihre Mitarbeiter versichert?", a: "Ja, alle unsere Mitarbeiter sind fest angestellt, sozialversichert und über eine Betriebshaftpflichtversicherung umfassend abgesichert." }
  ];

  return (
    <>
      <SEO 
        title="Häufig gestellte Fragen (FAQ) | Gebäudereinigung"
        description="Antworten auf die häufigsten Fragen rund um unsere Dienstleistungen: Gebäudereinigung, Hausmeisterservice und Winterdienst."
        url="/faq"
      />

      <div className="pt-32 pb-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-sans font-bold tracking-tight text-white mb-6">
              Häufig gestellte <span className="text-primary-500">Fragen</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Hier finden Sie Antworten auf die wichtigsten Fragen. Sollte Ihre Frage nicht dabei sein, kontaktieren Sie uns gerne.
            </p>
          </Reveal>
        </div>
      </div>

      <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-8">
              <MessageCircle className="w-3.5 h-3.5 text-primary-600" />
              <span className="text-xs font-semibold tracking-wide text-slate-700 uppercase">FAQ</span>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 text-slate-600 leading-relaxed border-t border-slate-50 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
