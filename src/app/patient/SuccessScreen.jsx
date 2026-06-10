import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";

export function SuccessScreen() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const b = state?.booking || {
    doctor: { name: "Dra. Mariana Costa", specialty: "Clínica Geral" },
    date: "Seg, 09/06",
    time: "14:00",
  };

  return (
    <div className="flex flex-col min-h-full bg-background items-center justify-between py-16 px-6">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          className="w-28 h-28 rounded-full flex items-center justify-center mb-6"
          style={{ background: "linear-gradient(135deg, #2ECC71, #27AE60)" }}
        >
          <motion.svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <motion.path
              d="M14 26L22 34L38 18"
              stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
          </motion.svg>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h1 className="text-foreground mb-3" style={{ fontSize: "1.75rem", fontWeight: 800 }}>Consulta marcada!</h1>
          <p className="text-muted-foreground" style={{ fontSize: "0.9375rem", lineHeight: 1.6 }}>
            Enviaremos um lembrete para você<br />não esquecer da sua consulta.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-8 w-full bg-card border border-border rounded-2xl p-5 text-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-accent" style={{ fontWeight: 700, fontSize: "0.875rem" }}>Confirmada</span>
          </div>
          {[
            { label: "Médico", value: b.doctor.name },
            { label: "Especialidade", value: b.doctor.specialty },
            { label: "Data", value: b.date },
            { label: "Horário", value: b.time },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between py-2.5 border-b border-border last:border-0">
              <span className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>{label}</span>
              <span className="text-foreground" style={{ fontWeight: 600, fontSize: "0.875rem" }}>{value}</span>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-4 flex gap-2 flex-wrap justify-center">
          {["📩 E-mail enviado", "🔔 Lembrete ativado"].map(t => (
            <span key={t} className="px-3 py-1.5 rounded-xl bg-secondary text-primary" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>{t}</span>
          ))}
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="w-full space-y-3">
        <button
          onClick={() => navigate("/app/consultas")}
          className="w-full py-4 rounded-2xl bg-primary text-white transition-all active:scale-95"
          style={{ fontWeight: 700, fontSize: "1rem" }}
        >
          Ver minhas consultas
        </button>
        <button
          onClick={() => navigate("/app")}
          className="w-full py-3.5 rounded-2xl border border-border bg-card text-foreground transition-all active:scale-95"
          style={{ fontWeight: 600, fontSize: "0.9375rem" }}
        >
          Voltar ao início
        </button>
      </motion.div>
    </div>
  );
}
