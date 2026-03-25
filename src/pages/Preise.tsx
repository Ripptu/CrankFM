import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { Reveal } from '../components/ui/Reveal';
import SEO from '../components/SEO';

export default function Preise() {
  const { setIsContactPopupOpen } = useOutletContext<{ setIsContactPopupOpen: (v: boolean) => void }>();
  
  const [calcService, setCalcService] = useState('reinigung');
  const [calcArea, setCalcArea] = useState(500);
  const [calcFreq, setCalcFreq] = useState('woechentlich');

  const calculatePrice = () => {
    let basePrice = 0;
    if (calcService === 'reinigung') basePrice = 2.5;
    if (calcService === 'garten') basePrice = 1.8;
    if (calcService === 'winter') basePrice = 3.2;

    let freqMultiplier = 1;
    if (calcFreq === 'taeglich') freqMultiplier = 20;
    if (calcFreq === 'woechentlich') freqMultiplier = 4;
    if (calcFreq === 'monatlich') freqMultiplier = 1;

    return Math.round(basePrice * calcArea * freqMultiplier);
  };

  return (
    <>
      <SEO 
        title="Preise & Kostenrechner | Gebäudereinigung & Hausmeisterservice"
        description="Berechnen Sie die voraussichtlichen Kosten für Gebäudereinigung, Gartenpflege oder Winterdienst mit unserem Online-Rechner."
        url="/preise"
      />

      <div className="pt-32 pb-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-sans font-bold tracking-tight text-white mb-6">
              Transparente <span className="text-primary-500">Preise</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Nutzen Sie unseren Rechner für eine erste Kosteneinschätzung. Für ein verbindliches Angebot kontaktieren Sie uns gerne.
            </p>
          </Reveal>
        </div>
      </div>

      <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
              <div className="p-8 md:p-12 md:w-3/5 bg-slate-50">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-8">
                  <Calculator className="w-3.5 h-3.5 text-primary-600" />
                  <span className="text-xs font-semibold tracking-wide text-slate-700 uppercase">Kostenrechner</span>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-3">Welche Leistung benötigen Sie?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'reinigung', label: 'Reinigung' },
                        { id: 'garten', label: 'Garten' },
                        { id: 'winter', label: 'Winterdienst' }
                      ].map(s => (
                        <button
                          key={s.id}
                          onClick={() => setCalcService(s.id)}
                          className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all border ${calcService === s.id ? 'bg-primary-600 text-white border-primary-600 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-primary-300'}`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-3">
                      <label className="text-sm font-bold text-slate-900">Fläche in m²</label>
                      <span className="text-sm font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">{calcArea} m²</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="5000" 
                      step="50"
                      value={calcArea}
                      onChange={(e) => setCalcArea(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                      <span>50 m²</span>
                      <span>5000+ m²</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-3">Wie oft?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'taeglich', label: 'Täglich' },
                        { id: 'woechentlich', label: 'Wöchentlich' },
                        { id: 'monatlich', label: 'Monatlich' }
                      ].map(f => (
                        <button
                          key={f.id}
                          onClick={() => setCalcFreq(f.id)}
                          className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all border ${calcFreq === f.id ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8 md:p-12 md:w-2/5 bg-slate-900 text-white flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="relative z-10">
                  <p className="text-slate-400 font-medium mb-2 uppercase tracking-wider text-sm">Geschätzte Kosten</p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-sans font-bold tracking-tight">ab {calculatePrice().toLocaleString('de-DE')}</span>
                    <span className="text-xl text-slate-400 font-medium">€</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-8">pro Monat, zzgl. MwSt.</p>
                  
                  <ul className="space-y-4 mb-10">
                    <li className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0" />
                      <span className="text-sm">Unverbindliche Schätzung</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0" />
                      <span className="text-sm">Inklusive Material & Anfahrt</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0" />
                      <span className="text-sm">Fester Ansprechpartner</span>
                    </li>
                  </ul>

                  <button 
                    onClick={() => setIsContactPopupOpen(true)}
                    className="w-full py-4 bg-white text-slate-900 hover:bg-slate-50 rounded-xl font-bold transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 active:scale-95"
                  >
                    Exaktes Angebot anfordern
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
