import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Star, CheckCircle2, Building2, Leaf, Snowflake, Wrench, ArrowRight, Quote, PhoneCall } from 'lucide-react';
import { Link, useOutletContext } from 'react-router-dom';
import { Reveal } from '../components/ui/Reveal';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import LogoCarousel from '../components/LogoCarousel';
import SEO from '../components/SEO';

export default function Home() {
  const { setIsContactPopupOpen } = useOutletContext<{ setIsContactPopupOpen: (v: boolean) => void }>();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroScale = useTransform(scrollY, [0, 500], [1.05, 1.15]);

  const currentMonth = new Date().getMonth();
  const baseServices = [
    { id: 'reinigung', icon: <Building2 className="w-5 h-5 text-primary-600" />, title: "Gebäude- & Hausreinigung", desc: "Unterhaltsreinigung, Fenster, Treppenhaus und Spezialreinigungen." },
    { id: 'garten', icon: <Leaf className="w-5 h-5 text-primary-600" />, title: "Garten- & Landschaftsbau", desc: "Rasenmähen, Hecken schneiden, Unkrautentfernung und Pflege." },
    { id: 'winter', icon: <Snowflake className="w-5 h-5 text-primary-600" />, title: "Winterdienst", desc: "Zuverlässige Räumung und Streudienst nach gesetzlichen Vorgaben." },
    { id: 'hausmeister', icon: <Wrench className="w-5 h-5 text-primary-600" />, title: "Hausmeisterdienste", desc: "Regelmäßige Kontrollen, kleine Reparaturen und Instandhaltung." }
  ];

  const getSeasonalServices = () => {
    const services = [...baseServices];
    if (currentMonth === 11 || currentMonth === 0 || currentMonth === 1) {
      const winter = services.splice(2, 1)[0];
      services.unshift(winter);
    } else if (currentMonth >= 2 && currentMonth <= 7) {
      const garten = services.splice(1, 1)[0];
      services.unshift(garten);
    }
    return services;
  };

  const orderedServices = getSeasonalServices();

  const testimonials = [
    { name: "Michael Schmidt", role: "Hausverwaltung Schmidt GmbH", text: "Seit wir zu Crank gewechselt sind, haben wir 30% weniger Beschwerden von Mietern. Der Service ist extrem zuverlässig und transparent.", rating: 5 },
    { name: "Sarah Weber", role: "Office Managerin, TechCorp", text: "Die Kommunikation ist hervorragend. Egal ob Unterhaltsreinigung oder kurzfristige Reparaturen – das Team ist immer sofort zur Stelle.", rating: 5 },
    { name: "Thomas Müller", role: "Eigentümergemeinschaft Parkallee", text: "Besonders der Winterdienst hat uns letzten Winter gerettet. Pünktlich, gründlich und absolut professionell. Sehr zu empfehlen!", rating: 5 }
  ];

  return (
    <>
      <SEO 
        title="Gebäudereinigung & Hausmeisterservice Geretsried | Crank Facility Management"
        description="Ihr zuverlässiger Partner für Gebäudereinigung, Hausmeisterservice und Winterdienst in Geretsried und Umgebung (+50km). Fordern Sie jetzt ein Angebot an!"
        keywords="Gebäudereinigung, Hausmeisterservice, Geretsried, Facility Management, Winterdienst, Gartenpflege"
        url="/"
      />

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-48 pb-20 sm:pb-32 w-full flex flex-col items-center text-center min-h-[90vh] justify-center overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 z-0 origin-top">
          <img 
            src="https://s1.directupload.eu/images/260325/oen5wdgd.webp" 
            alt="Hintergrund" 
            className="w-full h-full object-cover object-top"
            fetchPriority="high"
            loading="eager"
          />
        </motion.div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/30 via-white/60 to-white"></div>
        
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center relative z-20 w-full">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm mb-6 sm:mb-8"
          >
            <Star className="w-3.5 h-3.5 text-primary-600 fill-primary-600" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-wide text-slate-700 uppercase">Ihr Premium Partner</span>
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-sans font-bold text-slate-900 max-w-4xl tracking-tighter leading-[1.1] sm:leading-[1.05] mb-6 drop-shadow-sm px-2"
          >
            Wir pflegen Ihre Immobilie, als wäre es <span className="text-primary-600">unsere eigene</span>.
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-2xl mb-10 leading-relaxed font-medium px-4 tracking-tight"
          >
            Transparente Preise, 100% Zuverlässigkeit und feste Ansprechpartner für Gebäudereinigung, Gartenpflege und Winterdienst im Raum München.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-16 w-full sm:w-auto px-4 sm:px-0"
          >
            <button onClick={() => setIsContactPopupOpen(true)} className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 text-lg active:scale-95">
              Kostenlose Erstanalyse sichern
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link to="/leistungen" className="w-full sm:w-auto px-8 py-4 bg-white/90 backdrop-blur-md hover:bg-white text-slate-900 border border-slate-200/50 rounded-full font-semibold transition-all hover:shadow-md text-lg active:scale-95 text-center">
              Unsere Leistungen
            </Link>
          </motion.div>

          {/* Floating Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full max-w-2xl px-4 sm:px-0">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-white/40"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-left">
                <p className="text-base font-bold text-slate-900">100% Zuverlässigkeit</p>
                <p className="text-sm text-slate-600">Rundum-Sorglos Paket</p>
              </div>
            </motion.div>

            <motion.a 
              href="https://www.google.com/search?q=CranK-Facility-Management+Rezensionen"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center justify-between gap-4 border border-white/40 hover:bg-white hover:scale-[1.02] transition-all cursor-pointer group"
            >
              <div className="flex flex-col gap-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-slate-900 leading-none">4.9</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-medium text-slate-600">Google Rezensionen</p>
                </div>
              </div>
              <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center shrink-0 group-hover:bg-primary-50 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      <LogoCarousel />

      {/* Stats Section */}
      <Reveal>
        <section className="py-12 bg-white border-b border-slate-100 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
              <div className="py-4">
                <div className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-primary-600 mb-2">
                  <AnimatedCounter value={15000} suffix="+" />
                </div>
                <p className="text-slate-500 font-medium">m² gereinigte Fläche</p>
              </div>
              <div className="py-4">
                <div className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-primary-600 mb-2">
                  <AnimatedCounter value={50} suffix="+" />
                </div>
                <p className="text-slate-500 font-medium">betreute Objekte</p>
              </div>
              <div className="py-4">
                <div className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-primary-600 mb-2">
                  <AnimatedCounter value={100} suffix="%" />
                </div>
                <p className="text-slate-500 font-medium">Zuverlässigkeit</p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Services Section */}
      <section className="py-24 bg-slate-50 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
                <Star className="w-3.5 h-3.5 text-primary-600 fill-primary-600" />
                <span className="text-xs font-semibold tracking-wide text-slate-700 uppercase">Unsere Expertise</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-slate-900 mb-4">Alles aus einer <span className="text-primary-600">Hand</span></h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">Maßgeschneiderte Lösungen für den perfekten Zustand Ihrer Immobilie.</p>
            </div>
          </Reveal>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {orderedServices.map((service, i) => (
              <motion.div 
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } }
                }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-all hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] relative overflow-hidden group"
              >
                {i === 0 && (
                  <div className="absolute top-0 right-0 bg-primary-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                    Saison-Fokus
                  </div>
                )}
                <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-6">{service.desc}</p>
                <Link to="/leistungen" className="text-primary-600 font-semibold text-sm hover:text-primary-700 inline-flex items-center gap-1">
                  Mehr erfahren <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <Reveal delay={0.4}>
            <div className="mt-12 text-center">
              <Link to="/leistungen" className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center gap-2 active:scale-95">
                Alle Leistungen ansehen
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
                <Quote className="w-3.5 h-3.5 text-primary-600" />
                <span className="text-xs font-semibold tracking-wide text-slate-700 uppercase">Kundenstimmen</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-slate-900 mb-4">Das sagen unsere <span className="text-primary-600">Kunden</span></h2>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.15 } }
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {testimonials.map((t, i) => (
                <motion.div 
                  key={i} 
                  variants={{
                    hidden: { opacity: 0, scale: 0.9, y: 30 },
                    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } }
                  }}
                  className="bg-slate-50 p-8 rounded-3xl border border-slate-100 relative"
                >
                  <div className="flex gap-1 mb-6">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-8 leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                      <p className="text-xs text-slate-500">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Reveal>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Reveal>
          <div className="relative rounded-[2rem] p-12 md:p-20 text-center overflow-hidden bg-slate-900 shadow-2xl">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-800 to-slate-900"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-[2rem] -z-10">
              <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[150%] bg-primary-500/20 blur-3xl rounded-full transform rotate-12"></div>
              <div className="absolute -bottom-[50%] -right-[10%] w-[70%] h-[150%] bg-blue-500/20 blur-3xl rounded-full transform -rotate-12"></div>
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-tight text-white !text-white mb-6 drop-shadow-sm">
                Bereit für eine sorgenfreie Immobilie?
              </h2>
              <p className="text-white text-lg md:text-xl mb-10 font-medium tracking-tight">
                Kontaktieren Sie uns für ein unverbindliches Erstgespräch vor Ort. Wir erstellen ein Konzept, das genau zu Ihren Anforderungen passt.
              </p>
              <button onClick={() => setIsContactPopupOpen(true)} className="px-8 py-4 bg-white text-slate-900 hover:bg-slate-50 rounded-full font-semibold text-lg transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 mx-auto active:scale-95">
                <PhoneCall className="w-5 h-5" />
                Jetzt Angebot in 24h erhalten
              </button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
