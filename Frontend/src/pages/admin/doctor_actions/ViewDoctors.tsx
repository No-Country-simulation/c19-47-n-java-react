import axios from "axios";
import { useEffect, useState } from "react";
import { URLs } from "../../../config.tsx";
import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import Footer from "../../../components/Footer.tsx";

const ViewDoctors = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getdoctors = async () => {
      try {
        const response = await axios.get(URLs.DOCTOR);
        setDoctors(response.data);
      } catch (error) {
        console.log(error);
        setError("Error al obtener médicos. Inténtelo nuevamente.");
      }
    };

    getdoctors();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col md:items-center bg-slate-200">
      <Header />
      <div className="w-full lg:py-4 flex flex-col md:items-center">
      <div className="w-full max-w-[1000px] flex flex-col sm:flex-row justify-between p-4 lg:py-7 lg:px-0 gap-2">
       <h2 className="font-bold text-gray-700 text-3xl">Médicos</h2>
          <Link to="/admin/medicos/nuevo">
            <Button color="type-1">Registrar médico</Button>
          </Link>
        </div>
        <div className="overflow-x-auto w-full max-w-[1000px]">
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
                <th className="border border-b-gray-400 p-3 text-start">Especialidad</th>
                <th className="border border-b-gray-400 p-3 text-start">
                  Licencia médica
                </th>
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
                doctors.map((doctor, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-200"
                  >
                    <td className="border border-gray-100 p-3">
                      {doctor.firstName + " " + doctor.lastName}
                    </td>
                    <td className="border border-gray-100 p-3">
                      {doctor.birthDate.split('-')[2]}-
                      {doctor.birthDate.split('-')[1]}-
                      {doctor.birthDate.split('-')[0]}
                    </td>
                    <td className="border border-gray-100 p-3">
                      {doctor.email}
                    </td>
                    <td className="border border-gray-100 p-3">
                      {doctor.documentation}
                    </td>
                    <td className="border border-gray-100 p-3">
                      {doctor.gender === "female" ? "Femenino" : "Masculino"}
                    </td>
                    <td className="border border-gray-100 p-3">
                      {doctor.specialty}
                    </td>
                    <td className="border border-gray-100 p-3">
                      {doctor.license}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ViewDoctors;
