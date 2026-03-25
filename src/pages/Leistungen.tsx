import React from 'react';
import { motion } from 'motion/react';
import { Building2, Leaf, Snowflake, Wrench, CheckCircle2, ArrowRight } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { Reveal } from '../components/ui/Reveal';
import SEO from '../components/SEO';

export default function Leistungen() {
  const { setIsContactPopupOpen } = useOutletContext<{ setIsContactPopupOpen: (v: boolean) => void }>();

  const services = [
    {
      id: 'technisch',
      image: "https://s1.directupload.eu/images/260325/3gccmbuh.webp",
      title: "Technisches Facility Management",
      desc: "Sicherstellung der Anlagenverfügbarkeit und Werterhalt durch professionelle Wartung und Instandhaltung.",
      details: [
        "Wartung & Inspektion von TGA",
        "Störungsmanagement & 24/7 Notdienst",
        "Energiemanagement & Optimierung",
        "Prüfung nach DGUV V3",
        "Modernisierung & Umbau"
      ]
    },
    {
      id: 'infrastrukturell',
      image: "https://s1.directupload.eu/images/260325/mm266n7p.webp",
      title: "Infrastrukturelles Facility Management",
      desc: "Optimale Arbeitsbedingungen und ein repräsentatives Erscheinungsbild Ihrer Immobilien.",
      details: [
        "Unterhalts- & Glasreinigung",
        "Sicherheits- & Empfangsdienste",
        "Grünanlagenpflege & Winterdienst",
        "Hausmeisterdienste",
        "Abfallmanagement"
      ]
    },
    {
      id: 'kaufmaennisch',
      image: "https://s1.directupload.eu/images/260325/cdodq4bt.webp",
      title: "Kaufmännisches Facility Management",
      desc: "Transparente Kostenkontrolle und effiziente Verwaltung Ihrer Immobilienportfolios.",
      details: [
        "Objektbuchhaltung & Nebenkostenabrechnung",
        "Vertragsmanagement",
        "Beschaffungsmanagement",
        "Reporting & Controlling",
        "Flächenmanagement"
      ]
    }
  ];

  return (
    <>
      <SEO 
        title="Unsere Leistungen | CRANK Facility Management"
        description="Entdecken Sie unsere umfassenden Dienstleistungen: Technisches, Infrastrukturelles und Kaufmännisches Facility Management."
        url="/leistungen"
      />

      <div className="pt-32 pb-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-sans font-bold tracking-tight text-white mb-6">
              Unsere <span className="text-primary-500">Leistungen</span> im Detail
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Wir bieten Ihnen ein umfassendes Portfolio an Dienstleistungen rund um Ihre Immobilie. Alles aus einer Hand, mit höchstem Qualitätsanspruch.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div key={service.id}>
                <Reveal delay={index * 0.1}>
                  <div className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
                    <div className="w-full md:w-1/2">
                      <h2 className="text-3xl font-bold text-slate-900 mb-4">{service.title}</h2>
                      <p className="text-lg text-slate-600 mb-8 leading-relaxed">{service.desc}</p>
                      <ul className="space-y-4">
                        {service.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-slate-700 font-medium">{detail}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-10">
                        <button 
                          onClick={() => setIsContactPopupOpen(true)}
                          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold uppercase tracking-wider transition-all hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center gap-2 active:scale-95"
                        >
                          Angebot für {service.title.split(' ')[0]} anfordern
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2">
                      <div className="aspect-square rounded-3xl bg-slate-100 overflow-hidden relative shadow-lg">
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Bereit für Ihr nächstes Projekt?
            </h2>
            <p className="text-xl text-slate-300 mb-10">
              Lassen Sie uns gemeinsam herausfinden, wie wir den Betrieb Ihrer Immobilie optimieren können.
            </p>
            <button 
              onClick={() => setIsContactPopupOpen(true)}
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold uppercase tracking-wider transition-all hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center gap-2 active:scale-95 text-lg"
            >
              Kostenlose Erstberatung vereinbaren
              <ArrowRight className="w-5 h-5" />
            </button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
