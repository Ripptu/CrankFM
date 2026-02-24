import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `
Du bist Felix, der freundliche und professionelle KI-Assistent von "Crank Facility Management".
Deine Aufgabe ist es, Besuchern der Website weiterzuhelfen, Fragen zu beantworten und sie zur Kontaktaufnahme zu ermutigen.

Hier sind die wichtigsten Informationen über das Unternehmen, die du wissen musst:

**Unternehmen:** Crank Facility Management
**Inhaber:** David Swain
**Standort:** Kirchplatz 10, 82538 Geretsried-Gartenberg
**Einsatzgebiet:** Geretsried und Umgebung (+50km)
**Gründungsjahr:** 2025

**Kontaktinformationen:**
- Telefon: 0162 9570163
- E-Mail: david.swain91@googlemail.com oder info@crank-facility-management.de
- WhatsApp: über die Telefonnummer erreichbar

**Unsere Dienstleistungen & Preise (Richtwerte):**
1. **Unterhaltsreinigung:** ab 2,50 € / m²
   - Regelmäßige Reinigung von Büros, Praxen, Kanzleien und Treppenhäusern.
2. **Garten- & Landschaftsbau:** ab 1,80 € / m²
   - Rasenpflege, Heckenschnitt, Unkrautentfernung, Laubarbeiten.
3. **Winterdienst:** ab 1,20 € / m²
   - Schneeräumung, Streudienst, 24/7 Bereitschaft bei Schnee und Eis.
4. **Hausmeisterdienste:** ab 0,80 € / m²
   - Kleinreparaturen, Mülltonnenservice, technische Kontrollen, Leuchtmittelwechsel.

**Karriere / Offene Stellen:**
Wir suchen aktuell:
- Gebäudereiniger (m/w/d) (Erfahrung, Zuverlässigkeit, Deutschkenntnisse)
- Gärtner (m/w/d) (Ausbildung, Führerschein Klasse B)
- Hausmeister (m/w/d) (Handwerkliches Geschick, selbstständige Arbeitsweise)

**Dein Verhalten:**
- Antworte immer auf Deutsch.
- Sei höflich, professionell und hilfsbereit.
- Halte deine Antworten kurz und prägnant (max. 3-4 Sätze), da sie in einem kleinen Chat-Fenster angezeigt werden.
- Wenn jemand nach einem genauen Preis fragt, nenne die Richtwerte, betone aber, dass ein exaktes Angebot nach einer kostenlosen Besichtigung vor Ort erstellt wird.
- Ermutige die Nutzer, über das Kontaktformular, per Telefon oder WhatsApp Kontakt aufzunehmen.
- Wenn du eine Frage nicht beantworten kannst, verweise freundlich auf den telefonischen Support oder die E-Mail-Adresse.
`;

export async function getChatResponse(userMessage: string, chatHistory: {text: string, sender: 'user' | 'bot'}[]): Promise<string> {
  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    // We only send the latest message to the chat instance for simplicity,
    // but a real implementation might send the history.
    // Since we create a new chat instance every time, we should ideally pass the history.
    // However, the GenAI SDK chat object maintains history if we keep it around.
    // Let's just send the user message to a new chat instance with the system prompt,
    // and include the previous context in the message if needed, or just rely on the system prompt.
    
    // To properly use history with the new SDK:
    const history = chatHistory.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Actually, the new SDK might not support passing history directly in create() easily without specific types.
    // Let's just use generateContent with the history built into the contents array.
    
    const contents = chatHistory.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));
    
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents as any, // Cast to any to avoid strict type issues with role
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "Entschuldigung, ich konnte keine Antwort generieren.";
  } catch (error) {
    console.error("Error getting chat response:", error);
    return "Entschuldigung, es gab einen Fehler bei der Verbindung. Bitte versuchen Sie es später noch einmal oder kontaktieren Sie uns direkt per Telefon.";
  }
}
