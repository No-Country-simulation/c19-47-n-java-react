import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { URLs } from "../../../config";

const ViewHistorialClinico = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [error,setError] = useState("")

  useEffect(() => {
    const getPatients = async () => {
      try {
        const response = await axios.get(URLs.GET_PATIENT);
        setPatients(response.data);
      } catch (error) {
        console.log(error);
        setError("Error al obtener pacientes. Inténtelo nuevamente.")
      }
    };

    getPatients();
  }, []);

  // const handleSearchSubmit = () => {};

  return (
    <div className="w-full h-full flex flex-col lg:items-center bg-slate-300">
      <Header />
      <div className="w-full lg:max-w-[900px] flex flex-col gap-2 justify-between p-3 lg:p-0 lg:m-7">
        <h2 className="font-bold text-gray-700 text-2xl md:text-3xl">
          Historiales clínicos
        </h2>
        {/* Próxima mejora, búsqueda de pacientes 
        <form
          action=""
          onSubmit={handleSearchSubmit}
          className="flex h-10 justify-between gap-2"
        >
          <input type="text" name="" id="" className="rounded-md w-full px-4 focus:outline-none focus:ring-1 focus:ring-sky-700" placeholder="Ingrese "/>
          <Button color="type-search">Buscar</Button>
        </form> */}
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
              <th className="border border-b-gray-400 p-3"></th>
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
              <tr key={patient.idPaciente}>
                <td className="border border-gray-100 p-3">
                  {patient.firstName} {patient.lastName}
                </td>
                <td className="border border-gray-100 p-3">
                  {patient.birthDate}
                </td>
                <td className="border border-gray-100 p-3">{patient.email}</td>
                <td className="border border-gray-100 p-3">
                  {patient.documentation}
                </td>
                <td className="border border-gray-100 p-3">{patient.gender}</td>
                <td className="border border-gray-100 p-3">
                  {patient.medicalInsurance}
                </td>
                <td className="border border-gray-100 p-3">
                  <Link to={`/medicos/historial-clinico/${patient.idPaciente}`}>
                    <Button color="type-2">Ver</Button>
                  </Link>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewHistorialClinico;
