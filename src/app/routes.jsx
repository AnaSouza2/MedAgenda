import { createBrowserRouter, Navigate } from "react-router";
import { MobileLayout } from "./layouts/MobileLayout";
import { FullPageLayout } from "./layouts/FullPageLayout";
import { SplashScreen } from "./patient/SplashScreen";
import { RegisterScreen } from "./patient/RegisterScreen";
import { HomeScreen } from "./patient/HomeScreen";
import { AssistantScreen } from "./patient/AssistantScreen";
import { SearchScreen } from "./patient/SearchScreen";
import { ScheduleScreen } from "./patient/ScheduleScreen";
import { ConfirmScreen } from "./patient/ConfirmScreen";
import { SuccessScreen } from "./patient/SuccessScreen";
import { AppointmentsScreen } from "./patient/AppointmentsScreen";
import { ProfileScreen } from "./patient/ProfileScreen";
import { ClinicDesktop } from "./clinic/ClinicDesktop";

function MobileFrame({ children }) {
  return (
    <div style={{ fontFamily: "'Nunito', system-ui, sans-serif", width: "100%", minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0D1B2A" }}>
      <div style={{ width: "100%", maxWidth: 390, height: "100dvh", maxHeight: 844, display: "flex", flexDirection: "column", overflow: "hidden", background: "var(--background)" }}>
        {children}
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MobileFrame><SplashScreen /></MobileFrame>,
  },
  {
    path: "/cadastro",
    element: <MobileFrame><RegisterScreen /></MobileFrame>,
  },
  {
    path: "/app",
    Component: MobileLayout,
    children: [
      { index: true, Component: HomeScreen },
      { path: "assistente", Component: AssistantScreen },
      { path: "buscar", Component: SearchScreen },
      { path: "agenda", Component: ScheduleScreen },
      { path: "confirmar", Component: ConfirmScreen },
      { path: "sucesso", Component: SuccessScreen },
      { path: "consultas", Component: AppointmentsScreen },
      { path: "perfil", Component: ProfileScreen },
    ],
  },
  {
    path: "/clinica",
    Component: FullPageLayout,
    children: [
      { index: true, element: <ClinicDesktop defaultSection="dashboard" /> },
      { path: "analise", element: <ClinicDesktop defaultSection="analytics" /> },
      { path: "pacientes", element: <ClinicDesktop defaultSection="patients" /> },
      { path: "agenda", element: <ClinicDesktop defaultSection="schedule" /> },
      { path: "configuracoes", element: <ClinicDesktop defaultSection="settings" /> },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);
