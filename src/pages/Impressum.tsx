export default function Impressum() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-serif text-slate-900 mb-8">Impressum</h1>
        <div className="prose prose-slate max-w-none">
          <p>Angaben gemäß § 5 TMG</p>
          <p>
            <strong>Crank Facility Management GmbH</strong><br />
            Musterstraße 123<br />
            82538 Geretsried
          </p>
          <p>
            <strong>Vertreten durch:</strong><br />
            Max Mustermann
          </p>
          <p>
            <strong>Kontakt:</strong><br />
            Telefon: +49 (0) 123 456789<br />
            E-Mail: info@crank-fm.de
          </p>
          <p>
            <strong>Registereintrag:</strong><br />
            Eintragung im Handelsregister.<br />
            Registergericht: Amtsgericht München<br />
            Registernummer: HRB 12345
          </p>
          <p>
            <strong>Umsatzsteuer-ID:</strong><br />
            Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
            DE 123 456 789
          </p>
        </div>
      </div>
    </div>
  );
}
