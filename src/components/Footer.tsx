import { Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <img src="https://s1.directupload.eu/images/260224/kgemdfqa.png" alt="Crank Facility Management" className="h-8 object-contain grayscale opacity-70" />
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
          <Link to="/standorte/wolfratshausen" className="hover:text-primary-600 transition-colors">Wolfratshausen</Link>
          <Link to="/standorte/bad-toelz" className="hover:text-primary-600 transition-colors">Bad Tölz</Link>
          <Link to="/standorte/muenchen-sued" className="hover:text-primary-600 transition-colors">München Süd</Link>
          <Link to="/impressum" className="hover:text-primary-600 transition-colors">Impressum</Link>
          <Link to="/datenschutz" className="hover:text-primary-600 transition-colors">Datenschutz</Link>
          <Link to="/agb" className="hover:text-primary-600 transition-colors">AGB</Link>
        </div>
        <p className="text-sm text-slate-400">© 2025 Crank Facility Management. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
}
