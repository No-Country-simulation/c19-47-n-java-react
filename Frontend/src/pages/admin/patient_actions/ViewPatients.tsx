import axios from "axios";
import React, { useEffect, useState } from "react";
import { URLs } from "../../../config.tsx";
import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";

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
        setError("Error al obtener pacientes");
      }
    };

    getPatients();
  }, []);

  return (
    <div className="w-full h-full flex flex-col lg:items-center bg-slate-300">
      <Header />
      <div className="w-full p-7 flex flex-col md:items-center">
        <div className="w-full lg:max-w-[900px] flex justify-between">
          <h2 className="font-bold text-gray-700 text-3xl">Pacientes</h2>
          <Link to="/admin/pacientes/nuevo">
            <Button color="type-1">Registrar paciente</Button>
          </Link>
        </div>
      </div>
         <div className="overflow-x-auto lg:w-[900px]">
          <table className="w-full bg-white rounded-lg divide-y divide-gray-300">
            <thead>
              <tr className="text-gray-700 font-bold text-sm">
                <th className="border border-b-gray-400 p-3">Nombre</th>
                <th className="border border-b-gray-400 p-3">Fecha de nacimiento</th>
                <th className="border border-b-gray-400 p-3">Correo electrónico</th>
                <th className="border border-b-gray-400 p-3">Documentación</th>
                <th className="border border-b-gray-400 p-3">Género</th>
                <th className="border border-b-gray-400 p-3">Seguro médico</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {patients.map((patient) => (
                <tr key={patient.idPaciente} className="hover:bg-blue-300 hover:text-gray-800">
                  <td className="border border-gray-100 p-3">{patient.firstName} {patient.lastName}</td>
                  <td className="border border-gray-100 p-3">{patient.birthDate}</td>
                  <td className="border border-gray-100 p-3">{patient.email}</td>
                  <td className="border border-gray-100 p-3">{patient.documentation}</td>
                  <td className="border border-gray-100 p-3">{patient.gender}</td>
                  <td className="border border-gray-100 p-3">{patient.medicalInsurance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

  );
};

export default ViewPatients;
