import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center px-4">
      <SEO 
        title="Seite nicht gefunden | Crank Facility Management"
        description="Die gesuchte Seite konnte nicht gefunden werden."
        url="/404"
      />
      <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mb-8">
        <Wrench className="w-12 h-12 text-primary-600" />
      </div>
      <h1 className="text-5xl font-sans font-bold tracking-tight text-slate-900 mb-4">404</h1>
      <p className="text-xl text-slate-600 mb-8 max-w-md">Hoppla! Hier wurde wohl noch nicht aufgeräumt.</p>
      <Link to="/" className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-all hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2">
        <ArrowRight className="w-5 h-5 rotate-180" />
        Zurück zur Startseite
      </Link>
    </div>
  );
}
