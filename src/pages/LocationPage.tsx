import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, CheckCircle2, PhoneCall } from 'lucide-react';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LocationPage() {
  const { city } = useParams<{ city: string }>();
  const formattedCity = city 
    ? city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') 
    : '';

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title={`Gebäudereinigung & Hausmeisterservice in ${formattedCity} | Crank Facility Management`}
        description={`Ihr zuverlässiger Partner für Gebäudereinigung, Hausmeisterservice und Winterdienst in ${formattedCity}. Fordern Sie jetzt ein kostenloses Angebot an!`}
      />
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Startseite
        </Link>
        
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 mb-6">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase tracking-wider">Standort {formattedCity}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6">
            Professionelle Gebäudereinigung in <span className="text-primary-600 italic">{formattedCity}</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-3xl leading-relaxed">
            Suchen Sie einen zuverlässigen Partner für die Reinigung und Instandhaltung Ihrer Immobilie in {formattedCity}? 
            Crank Facility Management bietet Ihnen maßgeschneiderte Lösungen von der Unterhaltsreinigung bis zum kompletten Hausmeisterservice.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              "Transparente Preise ohne versteckte Kosten",
              "100% Zuverlässigkeit & Termintreue",
              "Geschultes & deutschsprachiges Personal",
              "Kostenlose Besichtigung vor Ort"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-slate-700 font-medium">{item}</span>
              </div>
            ))}
          </div>

          <a href="tel:01629570163" className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-bold transition-all hover:shadow-lg hover:-translate-y-0.5">
            <PhoneCall className="w-5 h-5" />
            Jetzt in {formattedCity} anfragen
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
