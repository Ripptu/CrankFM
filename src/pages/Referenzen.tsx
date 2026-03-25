import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Building2, CheckCircle2 } from 'lucide-react';
import { Link, useOutletContext } from 'react-router-dom';
import { Reveal } from '../components/ui/Reveal';
import SEO from '../components/SEO';

export default function Referenzen() {
  const { setIsContactPopupOpen } = useOutletContext<{ setIsContactPopupOpen: (v: boolean) => void }>();

  const projects = [
    {
      id: 1,
      title: "Bürokomplex 'Neue Mitte'",
      category: "Ganzheitliches FM",
      image: "https://s1.directupload.eu/images/260325/mm266n7p.webp",
      stats: [
        { label: "Fläche", value: "12.500 m²" },
        { label: "Betreuung seit", value: "2018" },
        { label: "Gewerke", value: "Technik, Reinigung, Außenanlagen" }
      ],
      description: "Vollumfängliche Betreuung eines modernen Bürokomplexes mit 15 Mietparteien. Implementierung eines digitalen Störungsmanagements und Optimierung der Energiekosten um 15%."
    },
    {
      id: 2,
      title: "Logistikzentrum Süd",
      category: "Technisches FM",
      image: "https://s1.directupload.eu/images/260325/3gccmbuh.webp",
      stats: [
        { label: "Fläche", value: "45.000 m²" },
        { label: "Betreuung seit", value: "2020" },
        { label: "Fokus", value: "24/7 Rufbereitschaft, Brandschutz" }
      ],
      description: "Sicherstellung der technischen Verfügbarkeit für einen reibungslosen Logistikbetrieb. Wartung der komplexen Fördertechnik und Sprinkleranlagen."
    },
    {
      id: 3,
      title: "Wohnquartier 'Am Park'",
      category: "Infrastrukturelles FM",
      image: "https://s1.directupload.eu/images/260325/cdodq4bt.webp",
      stats: [
        { label: "Einheiten", value: "250 Wohnungen" },
        { label: "Betreuung seit", value: "2015" },
        { label: "Leistungen", value: "Grünpflege, Winterdienst, Treppenhausreinigung" }
      ],
      description: "Pflege der weitläufigen Außenanlagen und Sicherstellung der Verkehrssicherungspflicht im Winter. Hohe Zufriedenheit der Eigentümergemeinschaft."
    }
  ];

  return (
    <>
      <SEO 
        title="Referenzen | CRANK Facility Management"
        description="Entdecken Sie unsere erfolgreich umgesetzten Projekte im Bereich Facility Management. Von Bürokomplexen bis hin zu Logistikzentren."
        url="/referenzen"
      />

      <div className="pt-32 pb-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-sans font-bold tracking-tight text-white mb-6">
              Unsere <span className="text-primary-500">Referenzen</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Erfolgreiche Projekte und zufriedene Kunden sind der beste Beweis für unsere Kompetenz. Überzeugen Sie sich selbst.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {projects.map((project, index) => (
              <div key={project.id}>
                <Reveal delay={index * 0.1}>
                  <div className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
                    <div className="w-full md:w-1/2">
                      <div className="inline-block px-4 py-1.5 bg-primary-50 text-primary-600 font-semibold rounded-full text-sm mb-6">
                        {project.category}
                      </div>
                      <h2 className="text-3xl font-bold text-slate-900 mb-4">{project.title}</h2>
                      <p className="text-lg text-slate-600 mb-8 leading-relaxed">{project.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        {project.stats.map((stat, i) => (
                          <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <div className="text-sm text-slate-500 mb-1">{stat.label}</div>
                            <div className="font-bold text-slate-900">{stat.value}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-10">
                        <button 
                          onClick={() => setIsContactPopupOpen(true)}
                          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold uppercase tracking-wider transition-all hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center gap-2 active:scale-95"
                        >
                          Ähnliches Projekt anfragen
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2">
                      <div className="aspect-[4/3] rounded-3xl bg-slate-100 overflow-hidden relative shadow-lg">
                        <img 
                          src={project.image} 
                          alt={project.title} 
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
