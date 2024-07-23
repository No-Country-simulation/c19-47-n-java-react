import Login from "./pages/Login";
import HomeAdmin from "./pages/admin/HomeAdmin";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PatientRegister from "./pages/admin/patient_actions/patient_register/PatientRegister";
import DoctorRegister from "./pages/admin/doctor_actions/doctor_register/DoctorRegister";
import ViewPatients from "./pages/admin/patient_actions/ViewPatients";
import ViewDoctors from "./pages/admin/doctor_actions/ViewDoctors";
import HomePatient from "./pages/patient/HomePatient";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/" element={<HomeAdmin />} />
          <Route path="/admin/home" element={<HomeAdmin />} />
          <Route path="/admin/pacientes/nuevo" element={<PatientRegister/>} />
          <Route path="/admin/pacientes" element={<ViewPatients/>}/>
          <Route path="/admin/medicos/nuevo" element={<DoctorRegister/>}/>
          <Route path="/admin/medicos" element={<ViewDoctors/>}/>
          <Route path="/pacientes" element={<HomePatient/>}/>
          <Route path="/pacientes/home" element={<HomePatient/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
