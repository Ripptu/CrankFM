import { Building2, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <img src="https://s1.directupload.eu/images/260325/syt3moyl.webp" alt="CRANK Logo" className="h-10 w-auto" />
          </div>
          <p className="text-slate-400 max-w-md leading-relaxed mb-8">
            Ihr verlässlicher Partner für ganzheitliches Facility Management. Wir sorgen für Werterhalt, Sicherheit und reibungslose Abläufe in Ihren Immobilien.
          </p>
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-slate-800 rounded flex items-center justify-center text-xs text-slate-500 text-center p-2 border border-slate-700">ISO 9001</div>
            <div className="w-16 h-16 bg-slate-800 rounded flex items-center justify-center text-xs text-slate-500 text-center p-2 border border-slate-700">ISO 14001</div>
            <div className="w-16 h-16 bg-slate-800 rounded flex items-center justify-center text-xs text-slate-500 text-center p-2 border border-slate-700">TÜV</div>
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold text-lg mb-6">Sitemap</h4>
          <ul className="space-y-3">
            <li><Link to="/" className="hover:text-primary-500 transition-colors">Home</Link></li>
            <li><Link to="/leistungen" className="hover:text-primary-500 transition-colors">Leistungen</Link></li>
            <li><Link to="/referenzen" className="hover:text-primary-500 transition-colors">Referenzen</Link></li>
            <li><Link to="/karriere" className="hover:text-primary-500 transition-colors">Karriere</Link></li>
            <li><Link to="/kontakt" className="hover:text-primary-500 transition-colors">Kontakt</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold text-lg mb-6">Kontakt</h4>
          <ul className="space-y-3 text-slate-400">
            <li>Musterstraße 123</li>
            <li>10115 Berlin</li>
            <li>Tel: +49 30 1234567</li>
            <li>Email: info@crank-fm.de</li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 text-sm">© {new Date().getFullYear()} CRANK Facility Management. Alle Rechte vorbehalten.</p>
        <div className="flex gap-6 text-sm text-slate-500">
          <Link to="/impressum" className="hover:text-white transition-colors">Impressum</Link>
          <Link to="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
        </div>
      </div>
    </footer>
  );
}
