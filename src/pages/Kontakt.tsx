import React from 'react';
import { motion } from 'motion/react';
import { PhoneCall, Mail, MessageCircle, MapPin, Building2 } from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';
import SEO from '../components/SEO';

export default function Kontakt() {
  return (
    <>
      <SEO 
        title="Kontakt & Anfrage | Gebäudereinigung & Hausmeisterservice"
        description="Kontaktieren Sie uns für ein unverbindliches Angebot. Wir sind telefonisch, per E-Mail oder WhatsApp für Sie erreichbar."
        url="/kontakt"
      />

      <div className="pt-32 pb-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-sans font-bold tracking-tight text-white mb-6">
              Nehmen Sie <span className="text-primary-500">Kontakt</span> auf
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Wir freuen uns auf Ihre Anfrage und beraten Sie gerne persönlich und unverbindlich.
            </p>
          </Reveal>
        </div>
      </div>

      <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <Reveal>
            <div>
              <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-slate-900 mb-8">Direkter Draht zu uns</h2>
              
              <div className="flex flex-col gap-4">
                <a href="tel:01629570163" className="flex items-center gap-6 p-6 rounded-3xl border border-slate-200 hover:border-primary-500 hover:bg-primary-50 transition-all group shadow-sm hover:shadow-md">
                  <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors shrink-0">
                    <PhoneCall className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-xl mb-1">Anrufen</p>
                    <p className="text-slate-500">0162 9570163</p>
                    <p className="text-sm text-primary-600 font-medium mt-1">Mo-Fr: 08:00 - 18:00 Uhr</p>
                  </div>
                </a>
                
                <a href="mailto:info@crank-facility-management.de" className="flex items-center gap-6 p-6 rounded-3xl border border-slate-200 hover:border-primary-500 hover:bg-primary-50 transition-all group shadow-sm hover:shadow-md">
                  <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors shrink-0">
                    <Mail className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-xl mb-1">E-Mail schreiben</p>
                    <p className="text-slate-500 break-all">info@crank-facility-management.de</p>
                    <p className="text-sm text-primary-600 font-medium mt-1">Antwort meist innerhalb 24h</p>
                  </div>
                </a>
                
                <a href="https://wa.me/491629570163" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 p-6 rounded-3xl border border-slate-200 hover:border-green-500 hover:bg-green-50 transition-all group shadow-sm hover:shadow-md">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors shrink-0">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-xl mb-1">WhatsApp</p>
                    <p className="text-slate-500">Direktnachricht senden</p>
                    <p className="text-sm text-green-600 font-medium mt-1">Schnell und unkompliziert</p>
                  </div>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
                <MapPin className="w-3.5 h-3.5 text-primary-600" />
                <span className="text-xs font-semibold tracking-wide text-slate-700 uppercase">Einsatzgebiet</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-slate-900 mb-8">Immer in Ihrer Nähe</h2>
              
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
          </Reveal>
        </div>
      </section>
    </>
  );
}
