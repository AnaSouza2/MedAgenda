import { useNavigate } from "react-router";
import { ChevronLeft, Send, Sparkles } from "lucide-react";
import { useState } from "react";

const suggestions = ["Dor de cabeça e febre", "Cansaço e falta de ar", "Dor nas costas", "Ansiedade e insônia"];

const symptomMap = {
  "febre":     { specialty: "Clínico Geral",   icon: "🩺", description: "Sintomas como febre e dor de cabeça são comumente avaliados por um clínico geral." },
  "cabeça":    { specialty: "Clínico Geral",   icon: "🩺", description: "Cefaleia frequente pode ser investigada por um clínico geral inicialmente." },
  "cansaço":   { specialty: "Clínico Geral",   icon: "🩺", description: "Fadiga e falta de ar merecem avaliação com clínico geral para descartar causas sistêmicas." },
  "costas":    { specialty: "Ortopedista",     icon: "🦴", description: "Dores na coluna e musculares são melhor avaliadas por um ortopedista." },
  "ansiedade": { specialty: "Psicólogo",       icon: "🧠", description: "Ansiedade, insônia e questões emocionais são tratadas por psicólogos ou psiquiatras." },
  "pele":      { specialty: "Dermatologista",  icon: "✨", description: "Problemas de pele como manchas, acne ou coceira devem ser avaliados por dermatologista." },
  "coração":   { specialty: "Cardiologista",   icon: "❤️", description: "Palpitações e dor no peito requerem avaliação cardiológica urgente." },
};

function getSuggestion(text) {
  const lower = text.toLowerCase();
  for (const [key, val] of Object.entries(symptomMap)) {
    if (lower.includes(key)) return val;
  }
  return { specialty: "Clínico Geral", icon: "🩺", description: "Para uma avaliação inicial, recomendamos consultar um clínico geral." };
}

export function AssistantScreen() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSuggest = () => {
    if (!input.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult(getSuggestion(input));
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-full bg-background">
      <div className="bg-primary px-5 pt-12 pb-8 rounded-b-[2rem]">
        <button onClick={() => navigate("/app")} className="flex items-center gap-1 text-white/70 mb-4">
          <ChevronLeft className="w-5 h-5" />
          <span style={{ fontSize: "0.875rem" }}>Voltar</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white" style={{ fontSize: "1.25rem", fontWeight: 800 }}>Assistente Inteligente</h1>
            <p className="text-white/60" style={{ fontSize: "0.8125rem" }}>Descreva seus sintomas</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
        <div className="bg-card border border-border rounded-2xl p-4">
          <label className="block text-foreground mb-2" style={{ fontSize: "0.875rem", fontWeight: 700 }}>O que você está sentindo?</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ex: Estou com dor de cabeça e febre há 2 dias..."
            rows={4}
            className="w-full bg-muted rounded-xl p-3 outline-none resize-none text-foreground placeholder:text-muted-foreground"
            style={{ fontSize: "0.9375rem" }}
          />
          <button
            onClick={handleSuggest}
            disabled={!input.trim() || loading}
            className="w-full mt-3 py-3.5 rounded-xl bg-primary text-white flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            style={{ fontWeight: 700 }}
          >
            {loading ? <span className="animate-pulse">Analisando sintomas...</span> : <><Send className="w-4 h-4" /> Receber sugestão</>}
          </button>
        </div>

        {!result && (
          <div>
            <p className="text-muted-foreground mb-3" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Sintomas frequentes:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map(s => (
                <button key={s} onClick={() => setInput(s)} className="px-3 py-2 rounded-xl border border-border bg-card text-foreground active:scale-95 transition-all" style={{ fontSize: "0.8125rem" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {result && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="bg-secondary px-5 py-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-2xl">{result.icon}</div>
              <div>
                <p className="text-muted-foreground" style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Especialidade sugerida</p>
                <h3 className="text-primary" style={{ fontSize: "1.125rem", fontWeight: 800 }}>{result.specialty}</h3>
              </div>
            </div>
            <div className="px-5 py-4 space-y-4">
              <p className="text-foreground" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>{result.description}</p>
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
                <span className="text-lg">⚠️</span>
                <p className="text-amber-800" style={{ fontSize: "0.8125rem", lineHeight: 1.5 }}>
                  Essa sugestão não substitui uma avaliação médica. Procure atendimento de emergência em casos graves.
                </p>
              </div>
              <button onClick={() => navigate("/app/buscar")} className="w-full py-4 rounded-xl bg-primary text-white transition-all active:scale-95" style={{ fontWeight: 700 }}>
                Ver horários disponíveis →
              </button>
              <button onClick={() => { setResult(null); setInput(""); }} className="w-full py-3 text-muted-foreground" style={{ fontSize: "0.875rem" }}>
                Descrever outros sintomas
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
