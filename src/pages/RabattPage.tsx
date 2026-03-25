import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Check, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function RabattPage() {
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await addDoc(collection(db, 'leads'), {
        name: leadName,
        email: leadEmail,
        source: 'rabatt_page',
        createdAt: serverTimestamp(),
        status: 'new'
      });
      setIsSuccess(true);
    } catch (err) {
      console.error("Error adding document: ", err);
      setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-600 flex flex-col">
      <SEO 
        title="10% Rabatt sichern | Crank Facility Management"
        description="Sichern Sie sich jetzt 10% Rabatt auf Ihre erste Gebäudereinigung oder Hausmeisterservice-Leistung in Geretsried."
        url="/rabatt"
      />
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-500 to-blue-500"></div>
            
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 mx-auto">
              <Send className="w-8 h-8 text-blue-600" />
            </div>

            <h1 className="text-3xl font-sans font-bold tracking-tight text-slate-900 text-center mb-4">
              10% Rabatt sichern
            </h1>
            <p className="text-slate-500 text-center mb-8 leading-relaxed">
              Tragen Sie sich ein und erhalten Sie sofort Ihren persönlichen Rabattcode für die erste Reinigung.
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium text-center">
                {error}
              </div>
            )}

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input 
                    type="text" 
                    required
                    placeholder="Vorname" 
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all outline-none placeholder:text-slate-400"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="email" 
                    required
                    placeholder="E-Mail-Adresse" 
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all outline-none placeholder:text-slate-400"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-base transition-all hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95"
                >
                  {isSubmitting ? 'Wird gespeichert...' : 'Code anzeigen'}
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </button>
                <p className="text-[11px] text-slate-400 mt-2 text-center">
                  Ihre Daten sind sicher. <Link to="/datenschutz" className="underline hover:text-slate-600">Datenschutz</Link>.
                </p>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-blue-50 border border-blue-100 p-6 rounded-2xl text-center"
              >
                <p className="text-blue-800 text-sm font-medium mb-2">Ihr persönlicher Code:</p>
                <div className="text-4xl font-mono font-bold text-blue-600 tracking-widest mb-4 select-all">
                  CRANK10
                </div>
                <p className="text-xs text-blue-700/80 mb-6">
                  Geben Sie diesen Code bei Ihrer Anfrage an.
                </p>
                <Link to="/" className="inline-flex items-center justify-center gap-2 w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-all text-sm">
                  Zur Startseite
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
