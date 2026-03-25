import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, PhoneCall, Mail, MessageCircle } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-600 selection:bg-primary-100 selection:text-primary-900 flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* We pass down the state setter via context so child pages can open the popup */}
        <Outlet context={{ setIsContactPopupOpen }} />
      </main>

      <Footer />

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
              <h3 className="text-2xl font-sans font-bold tracking-tight text-slate-900 mb-6 text-center">Wie möchten Sie uns kontaktieren?</h3>
              <div className="flex flex-col gap-3">
                <a href="tel:01629570163" className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 hover:border-primary-500 hover:bg-primary-50 transition-all group">
                  <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Anrufen</p>
                    <p className="text-sm text-slate-500">0162 9570163</p>
                  </div>
                </a>
                <a href="mailto:info@crank-facility-management.de" className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 hover:border-primary-500 hover:bg-primary-50 transition-all group">
                  <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">E-Mail schreiben</p>
                    <p className="text-sm text-slate-500">info@crank-facility-management.de</p>
                  </div>
                </a>
                <a href="https://wa.me/491629570163" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 hover:border-green-500 hover:bg-green-50 transition-all group">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">WhatsApp</p>
                    <p className="text-sm text-slate-500">Direktnachricht senden</p>
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
