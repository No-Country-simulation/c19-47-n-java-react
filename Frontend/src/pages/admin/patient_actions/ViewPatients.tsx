import axios from "axios";
import { useEffect, useState } from "react";
import { URLs } from "../../../config.tsx";
import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import Footer from "../../../components/Footer.tsx";

const ViewPatients = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getPatients = async () => {
      try {
        const response = await axios.get(URLs.GET_PATIENT);
        setPatients(response.data);
      } catch (error) {
        console.log(error);
        setError("Error al obtener pacientes. Inténtelo nuevamente.");
      }
    };

    getPatients();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col lg:items-center bg-slate-300 relative">
      <Header />
      <div className="w-full lg:py-4 flex flex-col md:items-center">
      <div className="w-full max-w-[900px] flex flex-col sm:flex-row justify-between p-4 lg:py-7 lg:px-0 gap-2">
          <h2 className="font-bold text-gray-700 text-3xl">Pacientes</h2>
          <Link to="/admin/pacientes/nuevo">
            <Button color="type-1">Registrar paciente</Button>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto lg:w-[900px] mb-4">
        <table className="w-full bg-white rounded-lg divide-y divide-gray-300">
          <thead>
            <tr className="text-gray-700 font-bold text-sm">
              <th className="border border-b-gray-400 p-3 text-start">Nombre</th>
              <th className="border border-b-gray-400 p-3 text-start">
                Nacimiento
              </th>
              <th className="border border-b-gray-400 p-3 text-start">
                Correo electrónico
              </th>
              <th className="border border-b-gray-400 p-3 text-start">Documentación</th>
              <th className="border border-b-gray-400 p-3 text-start">Género</th>
              <th className="border border-b-gray-400 p-3 text-start">Seguro médico</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {error ? (
              <tr>
                <td
                  colSpan={7}
                  className="border border-gray-100 p-3 text-red-500"
                >
                  {error}
                </td>
              </tr>
            ) : (
              patients.map((patient) => (
                <tr
                  key={patient.idPaciente}
                  className="hover:bg-slate-200"
                >
                  <td className="border border-gray-100 p-3">
                    {patient.firstName} {patient.lastName}
                  </td>
                  <td className="border border-gray-100 p-3">
                    {patient.birthDate.split('-')[2]}-
                    {patient.birthDate.split('-')[1]}-
                    {patient.birthDate.split('-')[0]}
                  </td>
                  <td className="border border-gray-100 p-3">
                    {patient.email}
                  </td>
                  <td className="border border-gray-100 p-3">
                    {patient.documentation}
                  </td>
                  <td className="border border-gray-100 p-3">
                    {patient.gender === "female" ? "Femenino" : "Masculino"}
                  </td>
                  <td className="border border-gray-100 p-3">
                    {patient.medicalInsurance === "" ? '-' : patient.medicalInsurance}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Footer/>
    </div>
  );
};

export default ViewPatients;
