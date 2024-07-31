import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { URLs } from "../../../config";
import { useAuth } from "../../../context/AuthProvider";
import Footer from "../../../components/Footer";

interface Doctor {
  idDoctor: number;
}

interface Patient {
  idPaciente: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface Consultation {
  id: number;
  dia: string;
  motivo: string;
  doctor: Doctor;
  paciente: Patient;
}

interface ConsultasPorDia {
  [dia: string]: Consultation[];
}

const ViewConsultasDoctor = () => {
  const { getDoctor } = useAuth();
  const doctor = getDoctor();
  const [consultas, setConsultas] = useState<Consultation[]>([]);
  const [showConsultas, setShowConsultas] = useState(false);

  useEffect(() => {
    const fetchConsultationDoctor = async () => {
      try {
        if (doctor?.id) {
          const response = await axios.get(
            URLs.getConsultationDoctorUrl(doctor?.id)
          );
          if (Array.isArray(response.data) && response.data.length > 0) {
            setShowConsultas(true);
            setConsultas(response.data);
          }
        }
      } catch (error) {
        console.error("Error al obtener las consultas:", error);
      }
    };

    fetchConsultationDoctor();
  }, []);

  const groupConsultationByDay = consultas.reduce<ConsultasPorDia>(
    (acc, consulta) => {
      const dia = consulta.dia;
      if (!acc[dia]) {
        acc[dia] = [];
      }
      acc[dia].push(consulta);
      return acc;
    },
    {}
  );

  return (
    <div className="w-full min-h-screen flex flex-col md:items-center bg-slate-300">
      <Header />
      <div className="w-full lg:max-w-[900px] flex flex-col gap-2 md:flex-row justify-between p-7">
        <h2 className="font-bold text-gray-700 text-3xl">
          Consultas programadas
        </h2>
      </div>
      <div className="flex flex-col gap-7 bg-slate-300">
        {showConsultas ? (
          Object.keys(groupConsultationByDay).map((dia, index) => (
            <>
              <h2 className="text-2xl text-sky-950 px-7">
                {dia.charAt(0).toUpperCase() + dia.slice(1).toLowerCase()}
              </h2>
              <div
                className="overflow-x-auto lg:max-w-[900px] flex flex-col gap-5"
                key={index}
              >
                <table className="w-full bg-white rounded-lg divide-y divide-gray-300">
                  <thead>
                    <tr className="text-gray-700 font-bold text-sm md:text-base">
                      <th className="border border-b-gray-400 p-3 w-6">
                        N° de Consulta
                      </th>
                      <th className="border border-b-gray-400 p-3 w-1/6">
                        Paciente
                      </th>
                      <th className="border border-b-gray-400 p-3 w-1/6">
                        Email
                      </th>
                      <th className="border border-b-gray-400 p-3 w-2/6">
                        Motivo
                      </th>
                      <th className="border border-b-gray-400 p-3 w-1/6">
                        Historial clínico
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupConsultationByDay[dia].map((consulta) => (
                      <tr
                        className="text-gray-700 text-sm md:text-base hover:bg-slate-200"
                        key={consulta.id}
                      >
                        <td className="border border-gray-100 p-3 text-gray-500 text-center">
                          #{consulta.id}
                        </td>
                        <td className="border border-gray-100 p-3">
                          {`${consulta.paciente.firstName} ${consulta.paciente.lastName}`}
                        </td>
                        <td className="border border-gray-100 p-3">
                          {consulta.paciente.email}
                        </td>
                        <td className="border border-gray-100 p-3">
                          {consulta.motivo}
                        </td>
                        <td className="border border-gray-100 p-3">
                          <Link
                            to={`/medicos/historial-clinico/${consulta.paciente.idPaciente}`}
                          >
                            <Button color="type-1">Ver</Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <hr className="border border-gray-400" />
              </div>
            </>
          ))
        ) : (
          <div className="w-full flex items-center justify-center">
            <h2 className="text-center bg-yellow-100 border border-orange-300 rounded-lg text-orange-600 w-full max-w-96 h-10 flex items-center justify-center p-5">
              Aún no hay consultas programadas.
            </h2>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default ViewConsultasDoctor;
