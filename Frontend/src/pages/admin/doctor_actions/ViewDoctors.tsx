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
        setError("Error al obtener médicos. Inténtelo nuevamente.");
      }
    };

    getdoctors();
  }, []);

  return (
    <div className="w-full h-full flex flex-col md:items-center bg-slate-200">
      <Header />
      <div className="w-full lg:p-7 flex flex-col md:items-center">
      <div className="w-full lg:max-w-[900px] flex flex-col sm:flex-row justify-between p-7 gap-2">
          <h2 className="font-bold text-gray-700 text-3xl">Médicos</h2>
          <Link to="/admin/medicos/nuevo">
            <Button color="type-1">Registrar médico</Button>
          </Link>
        </div>
        <div className="overflow-x-auto lg:w-[900px]">
        <table className="w-full bg-white rounded-lg divide-y divide-gray-300">
            <thead>
              <tr className="text-gray-700 font-bold text-sm">
                <th className="border border-b-gray-400 p-3">Nombre</th>
                <th className="border border-b-gray-400 p-3">
                  Fecha de nacimiento
                </th>
                <th className="border border-b-gray-400 p-3">
                  Correo electrónico
                </th>
                <th className="border border-b-gray-400 p-3">Documentación</th>
                <th className="border border-b-gray-400 p-3">Género</th>
                <th className="border border-b-gray-400 p-3">Seguro médico</th>
                <th className="border border-b-gray-400 p-3">
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
                doctors.map((doctor,index) => (
                  <tr
                    key={index}
                    className="hover:bg-blue-300 hover:text-gray-800"
                  >
                    <td className="border border-gray-100 p-3">
                      {doctor.firstName + " " + doctor.lastName}
                    </td>
                    <td className="border border-gray-100 p-3">
                      {doctor.birthDate}
                    </td>
                    <td className="border border-gray-100 p-3">
                      {doctor.email}
                    </td>
                    <td className="border border-gray-100 p-3">
                      {doctor.documentation}
                    </td>
                    <td className="border border-gray-100 p-3">
                      {doctor.gender}
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
    </div>
  );
};

export default ViewDoctors;
