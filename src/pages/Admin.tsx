import { useState, useEffect } from 'react';
import { collection, onSnapshot, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Trash2, Mail, Calendar, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Lead {
  id: string;
  email: string;
  createdAt: any;
}

export default function Admin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We don't use auth here because the user requested a simple UI password.
    // The password check happens in Navbar before redirecting here.
    // WARNING: This means the /admin route is technically accessible if someone knows the URL,
    // but the user explicitly requested this simple setup.
    
    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsData: Lead[] = [];
      snapshot.forEach((doc) => {
        leadsData.push({ id: doc.id, ...doc.data() } as Lead);
      });
      setLeads(leadsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching leads:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Möchten Sie diese E-Mail-Adresse wirklich löschen?')) {
      try {
        await deleteDoc(doc(db, 'leads', id));
      } catch (error) {
        console.error("Error deleting lead:", error);
        alert("Fehler beim Löschen.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Gesammelte Leads</h1>
            <p className="text-slate-500 mt-1">Übersicht aller eingetragenen E-Mail-Adressen für den 10% Rabatt.</p>
          </div>
          <Link to="/" className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Website
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-500">Lade Daten...</div>
          ) : leads.length === 0 ? (
            <div className="p-12 text-center text-slate-500">Noch keine E-Mail-Adressen gesammelt.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-4 font-semibold text-slate-600 text-sm">E-Mail Adresse</th>
                    <th className="p-4 font-semibold text-slate-600 text-sm">Datum</th>
                    <th className="p-4 font-semibold text-slate-600 text-sm text-right">Aktion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                            <Mail className="w-4 h-4" />
                          </div>
                          <span className="font-medium text-slate-900">{lead.email}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-500 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleString('de-DE') : new Date(lead.createdAt).toLocaleString('de-DE')}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => handleDelete(lead.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Löschen"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
