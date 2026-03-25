import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CookieBanner from './components/CookieBanner';
import ScrollToTop from './components/ScrollToTop';

const Home = lazy(() => import('./pages/Home'));
const Leistungen = lazy(() => import('./pages/Leistungen'));
const Referenzen = lazy(() => import('./pages/Referenzen'));
const Preise = lazy(() => import('./pages/Preise'));
const Karriere = lazy(() => import('./pages/Karriere'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Kontakt = lazy(() => import('./pages/Kontakt'));
const Impressum = lazy(() => import('./pages/Impressum'));
const Datenschutz = lazy(() => import('./pages/Datenschutz'));
const AGB = lazy(() => import('./pages/AGB'));
const LocationPage = lazy(() => import('./pages/LocationPage'));
const RabattPage = lazy(() => import('./pages/RabattPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Admin = lazy(() => import('./pages/Admin'));

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div></div>}>
        <Routes>
          <Route path="/rabatt" element={<RabattPage />} />
          <Route path="/admin" element={<Admin />} />
          
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="leistungen" element={<Leistungen />} />
            <Route path="referenzen" element={<Referenzen />} />
            <Route path="preise" element={<Preise />} />
            <Route path="karriere" element={<Karriere />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="kontakt" element={<Kontakt />} />
            <Route path="impressum" element={<Impressum />} />
            <Route path="datenschutz" element={<Datenschutz />} />
            <Route path="agb" element={<AGB />} />
            <Route path="standorte/:city" element={<LocationPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
      <CookieBanner />
    </>
  );
}
