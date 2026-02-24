import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AGB() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Startseite
        </Link>
        
        <h1 className="text-4xl font-serif text-slate-900 mb-8">Allgemeine Geschäftsbedingungen</h1>
        
        <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
          <p>
            Die Allgemeinen Geschäftsbedingungen (AGB) von Crank Facility Management befinden sich derzeit in der Überarbeitung und werden in Kürze hier zur Verfügung gestellt.
          </p>
          <p>
            Für aktuelle Anfragen zu unseren Vertragsbedingungen kontaktieren Sie uns bitte direkt unter:
          </p>
          <ul className="list-none pl-0">
            <li>Telefon: 01629570163</li>
            <li>E-Mail: <a href="mailto:info@crank-facility-management.de" className="text-primary-600 hover:underline">info@crank-facility-management.de</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
