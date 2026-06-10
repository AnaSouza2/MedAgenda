import { useNavigate } from "react-router";
import { ChevronLeft, User, CreditCard, Calendar, Phone, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { db } from "../db";

const fields = [
  { icon: User, label: "Nome completo", placeholder: "Ana Lima Silva", type: "text" },
  { icon: CreditCard, label: "CPF", placeholder: "000.000.000-00", type: "text" },
  { icon: Calendar, label: "Data de nascimento", placeholder: "15/03/1990", type: "text" },
  { icon: Phone, label: "Telefone", placeholder: "(11) 99999-9999", type: "tel" },
  { icon: Mail, label: "E-mail", placeholder: "ana@email.com", type: "email" },
  { icon: Lock, label: "Senha", placeholder: "••••••••", type: "password" },
];

export function RegisterScreen() {
  const navigate = useNavigate();
  const [values, setValues] = useState({});

  const handleRegister = () => {
    const name = values["Nome completo"] || "Ana Lima Silva";
    const cpf = values["CPF"] || "000.000.000-00";
    const dob = values["Data de nascimento"] || "15/03/1990";
    const phone = values["Telefone"] || "(11) 99999-9999";
    const email = values["E-mail"] || "ana@email.com";

    db.saveProfile({ name, cpf, dob, phone, email });
    navigate("/app");
  };

  return (
    <div className="flex flex-col min-h-full bg-background">
      <div className="bg-primary px-5 pt-12 pb-8">
        <button onClick={() => navigate("/")} className="flex items-center gap-1 text-white/70 mb-4">
          <ChevronLeft className="w-5 h-5" />
          <span style={{ fontSize: "0.875rem" }}>Voltar</span>
        </button>
        <h1 className="text-white" style={{ fontSize: "1.625rem", fontWeight: 800 }}>Criar conta</h1>
        <p className="text-white/60" style={{ fontSize: "0.875rem", marginTop: 4 }}>Preencha os dados para se cadastrar</p>
      </div>

      <div className="flex-1 px-5 py-6 space-y-4 overflow-y-auto">
        {fields.map(({ icon: Icon, label, placeholder, type }) => (
          <div key={label}>
            <label className="block text-foreground mb-1" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>{label}</label>
            <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5">
              <Icon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <input
                type={type}
                placeholder={placeholder}
                value={values[label] || ""}
                onChange={e => setValues(v => ({ ...v, [label]: e.target.value }))}
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                style={{ fontSize: "0.9375rem" }}
              />
            </div>
          </div>
        ))}

        <div className="flex items-start gap-3 pt-2">
          <input type="checkbox" id="terms" className="mt-1 accent-accent" />
          <label htmlFor="terms" className="text-muted-foreground" style={{ fontSize: "0.8125rem", lineHeight: 1.5 }}>
            Li e aceito os <span className="text-primary" style={{ fontWeight: 600 }}>Termos de Uso</span> e a{" "}
            <span className="text-primary" style={{ fontWeight: 600 }}>Política de Privacidade</span>
          </label>
        </div>

        <button
          onClick={handleRegister}
          className="w-full py-4 rounded-2xl bg-primary text-white transition-all active:scale-95 mt-2"
          style={{ fontWeight: 700, fontSize: "1rem" }}
        >
          Cadastrar
        </button>

        <p className="text-center text-muted-foreground pb-6" style={{ fontSize: "0.875rem" }}>
          Já tem uma conta?{" "}
          <button onClick={() => navigate("/")} className="text-primary" style={{ fontWeight: 600 }}>
            Entrar
          </button>
        </p>
      </div>
    </div>
  );
}
