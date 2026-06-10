import { useNavigate } from "react-router";
import { Heart } from "lucide-react";

export function SplashScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-full bg-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-32 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-16 pb-8">
        <div className="flex items-center justify-center w-20 h-20 rounded-3xl bg-white/15 mb-6">
          <Heart className="w-10 h-10 text-white fill-white/30" />
        </div>
        <h1 className="text-white text-center mb-2" style={{ fontSize: "2rem", fontWeight: 800, lineHeight: 1.2 }}>
          MedAgenda
        </h1>
        <p className="text-white/70 text-center" style={{ fontSize: "1rem", fontWeight: 400, lineHeight: 1.6 }}>
          Agende sua consulta de forma<br />rápida e segura
        </p>

        <div className="mt-10 w-full max-w-xs">
          <div className="bg-white/10 rounded-3xl p-6 space-y-3">
            {[
              { icon: "🔍", text: "Busque médicos e especialidades" },
              { icon: "📅", text: "Veja horários em tempo real" },
              { icon: "✅", text: "Confirme com um clique" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center text-lg flex-shrink-0">
                  {item.icon}
                </div>
                <span className="text-white/85" style={{ fontSize: "0.875rem" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 pb-10 space-y-3">
        <button
          onClick={() => navigate("/app")}
          className="w-full py-4 rounded-2xl bg-white text-primary transition-all active:scale-95"
          style={{ fontWeight: 700, fontSize: "1rem" }}
        >
          Entrar
        </button>
        <button
          onClick={() => navigate("/cadastro")}
          className="w-full py-4 rounded-2xl border-2 border-white/40 text-white transition-all active:scale-95"
          style={{ fontWeight: 600, fontSize: "1rem" }}
        >
          Criar conta
        </button>
        <button
          onClick={() => navigate("/app")}
          className="w-full py-3 text-white/60 transition-all"
          style={{ fontSize: "0.875rem" }}
        >
          Continuar como paciente →
        </button>
      </div>
    </div>
  );
}
