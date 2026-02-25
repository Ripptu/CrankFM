/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, FormEvent, Suspense, lazy } from 'react';
import { motion, AnimatePresence, useInView, useSpring, useTransform, useScroll } from 'motion/react';
import { Star, CheckCircle2, Building2, Leaf, Snowflake, Wrench, ArrowRight, Menu, PhoneCall, MessageCircle, X, ChevronDown, MapPin, Calculator, Quote, Plus, Minus, Check, Briefcase, Send, Mail } from 'lucide-react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SEO from './components/SEO';

const Impressum = lazy(() => import('./pages/Impressum'));
const Datenschutz = lazy(() => import('./pages/Datenschutz'));
const AGB = lazy(() => import('./pages/AGB'));
const LocationPage = lazy(() => import('./pages/LocationPage'));

import { getChatResponse } from './services/geminiService';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AnimatedCounter({ value, suffix = "" }: { value: number, suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const spring = useSpring(0, { duration: 2000, bounce: 0 });
  
  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  const display = useTransform(spring, (current) => Math.floor(current).toLocaleString('de-DE') + suffix);

  return <motion.span ref={ref}>{display}</motion.span>;
}

function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center px-4">
      <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mb-8">
        <Wrench className="w-12 h-12 text-primary-600" />
      </div>
      <h1 className="text-5xl font-serif text-slate-900 mb-4">404</h1>
      <p className="text-xl text-slate-600 mb-8 max-w-md">Hoppla! Hier wurde wohl noch nicht aufgeräumt.</p>
      <Link to="/" className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-all hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2">
        <ArrowRight className="w-5 h-5 rotate-180" />
        Zurück zur Startseite
      </Link>
    </div>
  );
}

function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{text: string, sender: 'user' | 'bot'}[]>([
    { text: "Hallo! Wie kann ich Ihnen helfen?", sender: 'bot' }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  const [sqm, setSqm] = useState<number>(500);
  const [calcService, setCalcService] = useState<string>('reinigung');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openJob, setOpenJob] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const toggleCheck = (index: number) => {
    setCheckedItems(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    const newMessages = [...chatMessages, { text: userMsg, sender: 'user' as const }];
    setChatMessages(newMessages);
    setChatInput("");
    setIsTyping(true);

    try {
      const botResponse = await getChatResponse(userMsg, chatMessages);
      setChatMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { text: "Entschuldigung, es gab einen Fehler. Bitte versuchen Sie es später noch einmal.", sender: 'bot' }]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping, isChatOpen]);

  const currentMonth = new Date().getMonth();
  const baseServices = [
    { id: 'reinigung', icon: <Building2 className="w-6 h-6 text-primary-600" />, title: "Gebäude- & Hausreinigung", desc: "Unterhaltsreinigung, Fenster, Treppenhaus und Spezialreinigungen." },
    { id: 'garten', icon: <Leaf className="w-6 h-6 text-primary-600" />, title: "Garten- & Landschaftsbau", desc: "Rasenmähen, Hecken schneiden, Unkrautentfernung und Pflege." },
    { id: 'winter', icon: <Snowflake className="w-6 h-6 text-primary-600" />, title: "Winterdienst", desc: "Zuverlässige Räumung und Streudienst nach gesetzlichen Vorgaben." },
    { id: 'hausmeister', icon: <Wrench className="w-6 h-6 text-primary-600" />, title: "Hausmeisterdienste", desc: "Regelmäßige Kontrollen, kleine Reparaturen und Instandhaltung." }
  ];

  // Jahreszeiten-Logik
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

  const calculatePrice = () => {
    const baseRates: Record<string, number> = {
      'reinigung': 2.5,
      'garten': 1.8,
      'winter': 1.2,
      'hausmeister': 0.8
    };
    return (sqm * (baseRates[calcService] || 0)).toLocaleString('de-DE');
  };

  const faqs = [
    { q: "Wie schnell sind Sie bei Notfällen vor Ort?", a: "Unser 24/7 Notdienst garantiert eine Reaktionszeit von unter 2 Stunden für alle Vertragskunden in unserem Kerngebiet." },
    { q: "Bieten Sie auch flexible Verträge an?", a: "Ja, wir passen unsere Leistungen genau an Ihre Bedürfnisse an. Von einmaligen Einsätzen bis hin zu flexiblen Jahresverträgen ist alles möglich." },
    { q: "Sind Ihre Reinigungsmittel umweltfreundlich?", a: "Absolut. Wir setzen zu 100% auf biologisch abbaubare und umweltfreundliche Reinigungsmittel, die mit dem EU-Ecolabel zertifiziert sind." },
    { q: "Wie wird die Qualität der Arbeit gesichert?", a: "Wir arbeiten mit digitalen Checklisten und regelmäßigen Qualitätskontrollen durch unsere Objektleiter. Sie erhalten monatlich ein transparentes Reporting." }
  ];

  const testimonials = [
    { name: "Michael Schmidt", role: "Hausverwaltung Schmidt GmbH", text: "Seit wir zu Crank gewechselt sind, haben wir 30% weniger Beschwerden von Mietern. Der Service ist extrem zuverlässig und transparent.", rating: 5 },
    { name: "Sarah Weber", role: "Office Managerin, TechCorp", text: "Die Kommunikation ist hervorragend. Egal ob Unterhaltsreinigung oder kurzfristige Reparaturen – das Team ist immer sofort zur Stelle.", rating: 5 },
    { name: "Thomas Müller", role: "Eigentümergemeinschaft Parkallee", text: "Besonders der Winterdienst hat uns letzten Winter gerettet. Pünktlich, gründlich und absolut professionell. Sehr zu empfehlen!", rating: 5 }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-600 selection:bg-primary-100 selection:text-primary-900">
      <SEO 
        title="Gebäudereinigung & Hausmeisterservice Geretsried | Crank Facility Management"
        description="Ihr zuverlässiger Partner für Gebäudereinigung, Hausmeisterservice und Winterdienst in Geretsried und Umgebung (+50km). Fordern Sie jetzt ein Angebot an!"
      />
      
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Crank Facility Management",
          "image": "https://s1.directupload.eu/images/260224/kgemdfqa.png",
          "@id": "https://crank-facility-management.de",
          "url": "https://crank-facility-management.de",
          "telephone": "01629570163",
          "email": "info@crank-facility-management.de",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Kirchplatz 10",
            "addressLocality": "Geretsried",
            "postalCode": "82538",
            "addressCountry": "DE"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 47.8667,
            "longitude": 11.4833
          },
          "areaServed": [
            "Geretsried",
            "Wolfratshausen",
            "Bad Tölz",
            "München Süd"
          ],
          "priceRange": "€€"
        })}
      </script>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-48 pb-20 sm:pb-32 w-full flex flex-col items-center text-center min-h-[90vh] justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <img 
            src="https://i.postimg.cc/F9fHrYLH/hf-20260223-135452-f3c098df-7ba2-40bc-9ec6-1ae451a99f05.webp" 
            alt="Hintergrund" 
            className="w-full h-full object-cover object-top scale-110"
          />
        </motion.div>
        {/* Gradient Overlay for soft transition to white */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-white/40 to-white"></div>
        
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
            className="text-4xl sm:text-5xl md:text-7xl font-serif text-slate-900 max-w-4xl tracking-tight leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6 drop-shadow-sm px-2"
          >
            Werterhalt und Pflege mit <span className="italic text-primary-600">höchstem</span> Standard.
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mb-8 sm:mb-10 leading-relaxed font-medium px-4"
          >
            Die All-in-One Lösung für Ihr Gebäude. Von der Gebäudereinigung über Landschaftsbau bis zum Winterdienst – wir machen es Ihnen einfach.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-12 sm:mb-16 w-full sm:w-auto px-4 sm:px-0"
          >
            <button onClick={() => setIsContactPopupOpen(true)} className="w-full sm:w-auto px-6 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-all hover:shadow-xl hover:shadow-primary-600/20 hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base">
              Jetzt Angebot einholen
              <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => {
              const element = document.getElementById('leistungen');
              if (element) {
                const offset = 100;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }} className="w-full sm:w-auto px-6 py-4 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-900 border border-slate-200/50 rounded-full font-medium transition-all hover:shadow-md text-base">
              Unsere Leistungen
            </button>
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
              href="https://www.google.com/search?sa=X&sca_esv=40c75cf91d5573df&sxsrf=ANbL-n5hstJR3nb9lXCF4r_FNciyWTNfzQ:1772047772386&q=CranK-Facility-Management+Rezensionen&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNDA1NTYyNjY3NzExMTM1MDY2MtvAyPiKUdW5KDHPW9ctMTkzJ7OkUtc3MS8xPTU3Na9EISi1KjWvODM_LzVvEStx6gCeCAYuawAAAA&rldimm=10553233774446503326&tbm=lcl&hl=de-DE&ved=2ahUKEwi34f2vsPWSAxVAcfEDHb4SORIQ9fQKegQIRRAG&biw=1536&bih=729&dpr=1.25#lkt=LocalPoiReviews"
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

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-slate-100 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="py-4">
              <div className="text-4xl md:text-5xl font-serif font-bold text-primary-600 mb-2">
                <AnimatedCounter value={15000} suffix="+" />
              </div>
              <p className="text-slate-500 font-medium">m² gereinigte Fläche</p>
            </div>
            <div className="py-4">
              <div className="text-4xl md:text-5xl font-serif font-bold text-primary-600 mb-2">
                <AnimatedCounter value={50} suffix="+" />
              </div>
              <p className="text-slate-500 font-medium">betreute Objekte</p>
            </div>
            <div className="py-4">
              <div className="text-4xl md:text-5xl font-serif font-bold text-primary-600 mb-2">
                <AnimatedCounter value={100} suffix="%" />
              </div>
              <p className="text-slate-500 font-medium">Zuverlässigkeit</p>
            </div>
          </div>
        </div>
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
            {orderedServices.map((service, i) => (
              <motion.div 
                key={service.id}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-all hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] relative overflow-hidden"
              >
                {i === 0 && (
                  <div className="absolute top-0 right-0 bg-primary-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                    Saison-Fokus
                  </div>
                )}
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

      {/* Data-Viz & Checklist Section */}
      <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Data-Viz */}
          <div className="bg-slate-50 rounded-[3rem] p-12 flex flex-col items-center justify-center text-center border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full blur-3xl -mr-20 -mt-20 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-100 rounded-full blur-3xl -ml-20 -mb-20 opacity-50"></div>
            
            <div className="relative w-64 h-64 mb-8">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                <motion.circle 
                  cx="50" cy="50" r="45" fill="none" stroke="#2563eb" strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "283", strokeDashoffset: "283" }}
                  whileInView={{ strokeDashoffset: 0 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-serif font-bold text-slate-900">100%</span>
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider mt-1">Sorgenfrei</span>
              </div>
            </div>
            <h3 className="text-2xl font-serif text-slate-900 mb-4 relative z-10">Wir übernehmen die komplette Koordination.</h3>
            <p className="text-slate-600 relative z-10">Sie haben den Kopf frei für Ihr Kerngeschäft. Wir kümmern uns um den Rest.</p>
          </div>

          {/* Checklist */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary-600" />
              <span className="text-xs font-semibold tracking-wide text-slate-700 uppercase">Transparenz</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-8">Was umfasst unsere Unterhaltsreinigung?</h2>
            
            <div className="space-y-3">
              {[
                "Bodenreinigung (Saugen & Wischen)",
                "Sanitäranlagen reinigen & desinfizieren",
                "Oberflächen & Schreibtische abwischen",
                "Mülleimer leeren & Mülltrennung",
                "Küche & Aufenthaltsräume säubern"
              ].map((item, i) => {
                const isChecked = checkedItems.includes(i);
                return (
                  <button 
                    key={i}
                    onClick={() => toggleCheck(i)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left ${isChecked ? 'bg-primary-50/50 border-primary-200' : 'bg-white border-slate-200 hover:border-primary-300'}`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${isChecked ? 'bg-primary-500' : 'bg-slate-100'}`}>
                      {isChecked && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <span className={`font-medium transition-all duration-300 ${isChecked ? 'text-slate-400 line-through decoration-primary-500/50' : 'text-slate-700'}`}>
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="preise" className="py-24 bg-white px-4 sm:px-6 lg:px-8 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-50 rounded-[3rem] p-8 md:p-16 border border-slate-100 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
                  <Calculator className="w-3.5 h-3.5 text-primary-600" />
                  <span className="text-xs font-semibold tracking-wide text-slate-700 uppercase">Preisschätzung</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-6">Transparente Kosten für Ihre Planung.</h2>
                <p className="text-slate-500 mb-8 leading-relaxed">Nutzen Sie unseren interaktiven Rechner, um einen ersten Richtwert für Ihre Immobilie zu erhalten. Für ein exaktes Angebot kommen wir gerne kostenlos vorbei.</p>
                
                <div className="space-y-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Service-Art wählen</label>
                    <select 
                      value={calcService}
                      onChange={(e) => setCalcService(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-primary-500 focus:border-primary-500 block p-3 outline-none transition-all"
                    >
                      <option value="reinigung">Gebäude- & Hausreinigung</option>
                      <option value="garten">Garten- & Landschaftsbau</option>
                      <option value="winter">Winterdienst</option>
                      <option value="hausmeister">Hausmeisterdienste</option>
                    </select>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="block text-sm font-medium text-slate-700">Fläche in m²</label>
                      <span className="text-sm font-bold text-primary-600">{sqm} m²</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="5000" 
                      step="50"
                      value={sqm}
                      onChange={(e) => setSqm(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-primary-600 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <p className="text-primary-100 font-medium mb-2 relative z-10">Geschätzte Kosten ab</p>
                <div className="text-5xl md:text-6xl font-serif font-bold mb-4 relative z-10">
                  {calculatePrice()} <span className="text-2xl font-sans font-normal text-primary-200">€ / Monat</span>
                </div>
                <p className="text-sm text-primary-200 mb-8 relative z-10">*Dies ist ein unverbindlicher Richtwert basierend auf Durchschnittspreisen.</p>
                <button onClick={() => setIsContactPopupOpen(true)} className="w-full px-6 py-4 bg-white text-slate-900 hover:bg-slate-50 rounded-full font-bold transition-all hover:shadow-lg relative z-10">
                  Exaktes Angebot anfordern
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
              <Quote className="w-3.5 h-3.5 text-primary-600" />
              <span className="text-xs font-semibold tracking-wide text-slate-700 uppercase">Kundenstimmen</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">Das sagen unsere <span className="italic text-primary-600">Kunden</span></h2>
            <a href="https://share.google/LxjfNM24lN9BGlGjz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 hover:border-primary-500 hover:bg-primary-50 rounded-full font-medium text-slate-700 transition-all shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Auf Google bewerten
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 relative">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ & Map Section */}
      <section id="faq" className="py-24 bg-slate-50 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* FAQ */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
              <MessageCircle className="w-3.5 h-3.5 text-primary-600" />
              <span className="text-xs font-semibold tracking-wide text-slate-700 uppercase">FAQ</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-8">Häufig gestellte Fragen</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
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

          {/* Map */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
              <MapPin className="w-3.5 h-3.5 text-primary-600" />
              <span className="text-xs font-semibold tracking-wide text-slate-700 uppercase">Einsatzgebiet</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-8">Immer in Ihrer Nähe</h2>
            
            <div className="bg-white p-2 rounded-3xl border border-slate-200 shadow-sm h-[400px] relative overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d170668.6496464522!2d11.317585324508947!3d47.879024193890494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479d9ab4069c1181%3A0x41e48add78c9c00!2sGeretsried!5e0!3m2!1sen!2sde!4v1700000000000!5m2!1sen!2sde" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(1) contrast(1.1) opacity(0.8)' }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              ></iframe>
              
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Hauptsitz Geretsried</p>
                  <p className="text-xs text-slate-500">Einsatzgebiet: Geretsried & Umgebung (+50km)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Karriere Section */}
      <section id="karriere" className="py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
              <Briefcase className="w-3.5 h-3.5 text-primary-600" />
              <span className="text-xs font-semibold tracking-wide text-slate-700 uppercase">Karriere</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">Werden Sie Teil unseres <span className="italic text-primary-600">Teams</span></h2>
            <p className="text-lg text-slate-500">Wir suchen motivierte Mitarbeiter, die mit uns wachsen wollen.</p>
          </div>

          <div className="space-y-4">
            {[
              { title: "Gebäudereiniger (m/w/d)", reqs: "Erfahrung in der Unterhaltsreinigung, Zuverlässigkeit, Deutschkenntnisse." },
              { title: "Gärtner (m/w/d)", reqs: "Abgeschlossene Ausbildung im Garten- und Landschaftsbau, Führerschein Klasse B." },
              { title: "Hausmeister (m/w/d)", reqs: "Handwerkliches Geschick, selbstständige Arbeitsweise, technisches Verständnis." }
            ].map((job, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition-all">
                <button 
                  onClick={() => setOpenJob(openJob === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none hover:bg-slate-100/50 transition-colors"
                >
                  <span className="font-bold text-slate-900 text-lg">{job.title}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openJob === i ? 'bg-primary-600 text-white' : 'bg-white text-slate-400 shadow-sm border border-slate-200'}`}>
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
                        <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2">
                          In 60 Sekunden bewerben
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="kontakt" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-[3rem] p-12 md:p-20 text-center overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(37,99,235,0.15)]">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-500/90 to-primary-700/90"></div>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-[3rem] -z-10">
            <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[150%] bg-white/20 blur-3xl rounded-full transform rotate-12"></div>
            <div className="absolute -bottom-[50%] -right-[10%] w-[70%] h-[150%] bg-primary-400/30 blur-3xl rounded-full transform -rotate-12"></div>
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 drop-shadow-sm">
              Bereit für eine <span className="italic">sorgenfreie</span> Immobilie?
            </h2>
            <p className="text-primary-50 text-lg md:text-xl mb-10 font-medium">
              Kontaktieren Sie uns für ein unverbindliches Erstgespräch vor Ort. Wir erstellen ein Konzept, das genau zu Ihren Anforderungen passt.
            </p>
            <button onClick={() => setIsContactPopupOpen(true)} className="px-8 py-4 bg-white text-primary-900 hover:bg-slate-50 rounded-full font-bold text-lg transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:-translate-y-1 flex items-center gap-2 mx-auto">
              <PhoneCall className="w-5 h-5" />
              Jetzt Kontakt aufnehmen
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Live Chat Widget */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="mb-4 bg-white rounded-2xl shadow-2xl border border-slate-100 w-80 sm:w-96 overflow-hidden"
            >
              <div className="bg-slate-900 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Support" loading="lazy" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">Felix von Crank</p>
                    <p className="text-xs text-slate-400">Online • Antwortet sofort</p>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="h-80 bg-slate-50 p-4 overflow-y-auto flex flex-col gap-3">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-primary-600 text-white rounded-br-none' 
                        : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              
              <div className="p-3 bg-white border-t border-slate-100">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Schreiben Sie eine Nachricht..." 
                    className="flex-1 bg-slate-100 border-0 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                  />
                  <button 
                    type="submit"
                    disabled={!chatInput.trim() || isTyping}
                    className="bg-primary-600 text-white p-2.5 rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-primary-600 hover:bg-primary-700 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        >
          {isChatOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>

      {/* Contact Popup */}
      <AnimatePresence>
        {isContactPopupOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsContactPopupOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-md w-full relative z-10"
            >
              <button onClick={() => setIsContactPopupOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-2xl font-serif text-slate-900 mb-6 text-center">Wie möchten Sie uns kontaktieren?</h3>
              <div className="flex flex-col gap-3">
                <a href="tel:01629570163" className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 hover:border-primary-500 hover:bg-primary-50 transition-all group">
                  <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Anrufen</p>
                    <p className="text-sm text-slate-500">0162 9570163</p>
                  </div>
                </a>
                <a href="mailto:david.swain91@googlemail.com" className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 hover:border-primary-500 hover:bg-primary-50 transition-all group">
                  <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">E-Mail schreiben</p>
                    <p className="text-sm text-slate-500">david.swain91@googlemail.com</p>
                  </div>
                </a>
                <a href="https://wa.me/491629570163" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 hover:border-green-500 hover:bg-green-50 transition-all group">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">WhatsApp</p>
                    <p className="text-sm text-slate-500">Direkt im Chat klären</p>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/agb" element={<AGB />} />
          <Route path="/standorte/:city" element={<LocationPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}
