import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Impressum() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Startseite
        </Link>
        
        <h1 className="text-4xl font-serif text-slate-900 mb-8">Impressum</h1>
        
        <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Crank-Facility-Management</h2>
            <p>
              David Swain<br />
              Hausmeisterservice+Reinigung<br />
              Kirchplatz 10<br />
              82538 Geretsried-Gartenberg
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Kontakt</h2>
            <p>
              Telefon: 01629570163<br />
              E-Mail: david.swain91@googlemail.com<br />
              info@crank-facility-management.de
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Angaben zur Berufshaftpflichtversicherung</h2>
            <p>
              <strong>Name und Sitz des Versicherers:</strong><br />
              VHV Allgemeine Versicherung AG<br />
              VHV Platz 1<br />
              30177 Hannover
            </p>
            <p className="mt-2">
              <strong>Geltungsraum der Versicherung:</strong><br />
              Deutschland
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
            <p>
              Wir nehmen an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teil. Zuständig ist die Universalschlichtungsstelle des Zentrums für Schlichtung e.V., Straßburger Straße 8, 77694 Kehl am Rhein (<a href="https://www.verbraucher-schlichter.de" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">https://www.verbraucher-schlichter.de</a>).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
