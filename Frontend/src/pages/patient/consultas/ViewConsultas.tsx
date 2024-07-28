import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";
import { URLs } from "../../../config";
import { useAuth } from "../../../context/AuthProvider";
import axios from "axios";

interface Doctor {
  idDoctor: number;
  firstName: string;
  lastName: string;
  specialty: string;
  gender: string;
}

interface Patient {
  idPaciente: number;
}

interface Consultation {
  id: number;
  dia: string;
  motivo: string;
  doctor: Doctor;
  paciente: Patient;
}

const ViewConsultas = () => {
  const [consultas, setConsultas] = useState<Consultation[]>([]);
  const { getPatient } = useAuth();
  const patient = getPatient();

  useEffect(() => {
    const fetchConsultations = async () => {
      if (patient?.id) {
        try {
          const getConsultations = URLs.getConsultationUrl(patient?.id);
          const response = await axios.get(getConsultations);
          setConsultas(response.data);
        } catch (error) {
          console.error("Error al obtener las consultas:", error);
        }
      }
    };

    fetchConsultations();
  }, []);

  return (
    <div className="w-full h-full flex flex-col lg:items-center bg-slate-300">
      <Header />
      <div className="w-full lg:max-w-[900px] flex flex-col md:flex-row gap-5 justify-between p-3 lg:p-0 lg:m-7">
        <h2 className="font-bold text-gray-700 text-2xl md:text-3xl pt-3 pl-3">
          Consultas programadas
        </h2>
        <Link to="/pacientes/programar-consulta">
          <Button color="type-4">Programar consulta</Button>
        </Link>
      </div>
      <div className="w-full lg:max-w-[900px]">
        <div className="grid md:grid-cols-2 place-items-center items-stretch">
          {consultas ? (
            consultas.map((consulta) => (
              <div className="bg-white rounded-lg w-5/6 sm:w-2/3 p-5 m-3 flex flex-col gap-6">
                <div>
                <p className="text-gray-600 text-sm mb-3">Consulta n°: {consulta.id}</p>
                  <h3 className="text-2xl text-gray-900 font-bold">
                    {consulta.doctor.gender === "female" ? "Dra. " : "Dr. "}
                    {consulta.doctor.firstName + " " + consulta.doctor.lastName}
                  </h3>
                  <h4 className="text-lg text-sky-800">
                    {consulta.dia.charAt(0).toUpperCase() +
                      consulta.dia.slice(1).toLowerCase()}
                  </h4>
                </div>
                <div>
                  <p className="text-gray-800 text-sm underline underline-offset-2">
                    Motivo: {consulta.motivo}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full flex items-center justify-center mt-10">
              <h2 className="text-center bg-yellow-100 border border-orange-300 rounded-lg text-orange-600 w-4/5 md:w-1/2 max-w-96 h-10 flex items-center justify-center py-5">
                Aún no hay consultas programadas.
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewConsultas;
