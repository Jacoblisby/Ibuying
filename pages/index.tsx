// pages/index.tsx

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    address: "",
    type: "",
    size: "",
    rooms: "",
    condition: "",
    previouslyListed: "",
    sharedCosts: "",
    heat: "",
    water: "",
    otherCosts: "",
    documents: [],
    images: [],
    ocrResults: []
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (files) => {
    const uploaded = Array.from(files);
    const results = uploaded.map((file) => ({
      fileName: file.name,
      content: `🔍 Automatisk udtræk af data fra ${file.name}\n- Fællesudgifter: 3.200 kr.\n- Ejendomsskat: 6.124 kr.`
    }));
    setForm((prev) => ({
      ...prev,
      documents: uploaded,
      ocrResults: results
    }));
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Få et kontant bud på din bolig</h1>
      <Card>
        <CardContent className="p-6">
          {step === 1 && (
            <form className="grid gap-4">
              <Label>
                Adresse
                <Input name="address" value={form.address} onChange={handleInputChange} />
              </Label>
              <Label>
                Boligtype
                <select
                  name="type"
                  value={form.type}
                  onChange={handleInputChange}
                  className="border p-2 rounded"
                >
                  <option value="">Vælg</option>
                  <option value="ejerlejlighed">Ejerlejlighed</option>
                  <option value="villa">Villa</option>
                  <option value="rækkehus">Rækkehus</option>
                </select>
              </Label>
              <Label>
                Størrelse (m²)
                <Input name="size" type="number" value={form.size} onChange={handleInputChange} />
              </Label>
              <Label>
                Antal værelser
                <Input name="rooms" type="number" value={form.rooms} onChange={handleInputChange} />
              </Label>
              <Label>
                Stand
                <select
                  name="condition"
                  value={form.condition}
                  onChange={handleInputChange}
                  className="border p-2 rounded"
                >
                  <option value="">Vælg</option>
                  <option value="dårlig">Dårlig</option>
                  <option value="middel">Middel</option>
                  <option value="god">God</option>
                  <option value="nyrenoveret">Nyrenoveret</option>
                </select>
              </Label>
              <Label>
                Har boligen været til salg for nylig?
                <select
                  name="previouslyListed"
                  value={form.previouslyListed}
                  onChange={handleInputChange}
                  className="border p-2 rounded"
                >
                  <option value="">Vælg</option>
                  <option value="ja">Ja</option>
                  <option value="nej">Nej</option>
                </select>
              </Label>
              <Label>
                Upload billeder (valgfrit)
                <Input
                  name="images"
                  type="file"
                  multiple
                  onChange={(e) => setForm({ ...form, images: e.target.files })}
                />
              </Label>
              <Button type="button" onClick={() => setStep(2)}>Næste trin</Button>
            </form>
          )}

          {step === 2 && (
            <form className="grid gap-4">
              <Label>
                Upload dokumenter (PDF)
                <Input
                  name="documents"
                  type="file"
                  multiple
                  accept="application/pdf"
                  onChange={(e) => handleFileUpload(e.target.files)}
                />
              </Label>
              <Label>
                Fællesudgifter til E/F (kr./md.)
                <Input name="sharedCosts" type="number" value={form.sharedCosts} onChange={handleInputChange} />
              </Label>
              <Label>
                Varme (kr./md.)
                <Input name="heat" type="number" value={form.heat} onChange={handleInputChange} />
              </Label>
              <Label>
                Vand (kr./md.)
                <Input name="water" type="number" value={form.water} onChange={handleInputChange} />
              </Label>
              <Label>
                Andre faste udgifter (kr./md.)
                <Input name="otherCosts" type="number" value={form.otherCosts} onChange={handleInputChange} />
              </Label>
              <div>
                <p className="font-semibold">🔍 Automatisk dokumentanalyse (simuleret OCR):</p>
                <ul className="text-sm text-gray-700 list-disc ml-6">
                  {form.ocrResults.map((doc, idx) => (
                    <li key={idx}><strong>{doc.fileName}:</strong> <pre>{doc.content}</pre></li>
                  ))}
                </ul>
              </div>
              <Button type="button" onClick={() => setStep(3)}>Næste trin</Button>
            </form>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <p className="text-lg font-semibold">🔍 Vi analyserer dine oplysninger...</p>
              <p className="text-gray-600">Markedsværdi og risikoniveau bliver beregnet...</p>
              <Button type="button" onClick={() => alert("Bud genereret (placeholder)")}>Generér bud</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
