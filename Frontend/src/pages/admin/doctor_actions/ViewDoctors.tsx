import axios from "axios";
import React, { useEffect, useState } from "react";
import { URLs } from "../../../config.tsx";
import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";

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
        setError("Error al obtener médicos");
      }
    };

    getdoctors();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center bg-slate-200">
      <Header />
      <div className="w-[1200px] p-7 flex flex-col justify-center">
        <div className="w-full flex justify-between mb-7">
          <h2 className="font-bold text-gray-700 text-3xl">Médicos</h2>
          <Link to="/admin/medicos/nuevo">
            <Button color="type-1">Registrar médico</Button>
          </Link>
        </div>
        <table className="bg-white rounded-lg">
          <thead>
            <tr className="text-gray-700 font-bold text-sm">
              <td className="border border-b-gray-400 p-3">Nombre</td>
              <td className="border border-b-gray-400 p-3">
                Fecha de nacimiento
              </td>
              <td className="border border-b-gray-400 p-3">
                Correo electrónico
              </td>
              <td className="border border-b-gray-400 p-3">Documentación</td>
              <td className="border border-b-gray-400 p-3">Género</td>
              <td className="border border-b-gray-400 p-3">Seguro médico</td>
              <td className="border border-b-gray-400 p-3">Licencia médica</td>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {doctors.map((doctor) => (
              <tr
                key={doctor.id_doctor}
                className="hover:bg-blue-300 hover:text-gray-800"
              >
                <td className="border border-gray-100 p-3">
                  {doctor.firstName + " " + doctor.lastName}
                </td>
                <td className="border border-gray-100 p-3">
                  {doctor.birthDate}
                </td>
                <td className="border border-gray-100 p-3">{doctor.email}</td>
                <td className="border border-gray-100 p-3">
                  {doctor.documentation}
                </td>
                <td className="border border-gray-100 p-3">{doctor.gender}</td>
                <td className="border border-gray-100 p-3">
                  {doctor.specialty}
                </td>
                <td className="border border-gray-100 p-3">{doctor.license}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewDoctors;
