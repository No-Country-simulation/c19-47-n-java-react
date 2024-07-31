import Login from "./pages/Login";
import HomeAdmin from "./pages/admin/HomeAdmin";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PatientRegister from "./pages/admin/patient_actions/patient_register/PatientRegister";
import DoctorRegister from "./pages/admin/doctor_actions/doctor_register/DoctorRegister";
import ViewPatients from "./pages/admin/patient_actions/ViewPatients";
import ViewDoctors from "./pages/admin/doctor_actions/ViewDoctors";
import HomePatient from "./pages/patient/HomePatient";
import HomeDoctor from "./pages/doctor/HomeDoctor";
import ViewHorarioLaboral from "./pages/doctor/horario_laboral/ViewHorarioLaboral";
import CreateHorarioLaboral from "./pages/doctor/horario_laboral/CreateHorarioLaboral";
import ViewHistorialClinico from "./pages/doctor/acceso_historial_clinico/ViewHistorialClinico";
import ViewHistorialClinicoPaciente from "./pages/doctor/acceso_historial_clinico/ViewHistorialClinicoPaciente";
import CreateConsulta from "./pages/patient/consultas/CreateConsulta";
import ViewConsultas from "./pages/patient/consultas/ViewConsultas";
import ViewConsultasDoctor from "./pages/doctor/consultas/ViewConsultasDoctor";
import ViewPerfil from "./pages/patient/perfil/ViewPerfil";
import ChangePassword from "./pages/ChangePassword";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRouter from "./components/ProtectedRouter";
import ViewPerfilDoctor from "./pages/doctor/perfil/ViewPerfilDoctor";
import { RiMentalHealthLine } from "react-icons/ri";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/**RUTAS PROTEGIDAS PARA ADMIN */}
          <Route element={<ProtectedRouter roles={["ADMIN"]} />}>
            <Route path="/admin/home" element={<HomeAdmin />} />
            <Route path="/admin/pacientes" element={<ViewPatients />} />
            <Route path="/admin/medicos" element={<ViewDoctors />} />
            <Route
              path="/admin/pacientes/nuevo"
              element={<PatientRegister />}
            />
            <Route path="/admin/medicos/nuevo" element={<DoctorRegister />} />
          </Route>

          {/**RUTAS PROTEGIDAS PARA PACIENTE */}
          <Route element={<ProtectedRouter roles={["PATIENT"]} />}>
            <Route path="/pacientes/home" element={<HomePatient />} />
            <Route path="/pacientes/consultas" element={<ViewConsultas />} />
            <Route
              path="/pacientes/programar-consulta"
              element={<CreateConsulta />}
            />
            <Route path="/pacientes/perfil" element={<ViewPerfil />} />
            <Route
              path="/pacientes/perfil/cambiar-contraseña"
              element={<ChangePassword />}
            />
          </Route>

          {/**RUTAS PROTEGIDAS PARA DOCTOR*/}
          <Route element={<ProtectedRouter roles={["DOCTOR"]} />}>
            <Route path="/medicos/home" element={<HomeDoctor />} />
            <Route path="/medicos/perfil" element={<ViewPerfilDoctor />} />
            <Route
              path="/medicos/perfil/cambiar-contraseña"
              element={<ChangePassword />}
            />

            <Route
              path="/medicos/horarios-laborales"
              element={<ViewHorarioLaboral />}
            />
            <Route
              path="/medicos/nuevo-horario"
              element={<CreateHorarioLaboral />}
            />
            <Route
              path="/medicos/historiales-clinicos"
              element={<ViewHistorialClinico />}
            />
            <Route
              path="/medicos/historial-clinico/:id"
              element={<ViewHistorialClinicoPaciente />}
            />
            <Route
              path="/medicos/consultas-programadas"
              element={<ViewConsultasDoctor />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
