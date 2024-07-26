import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URLs } from "../../../config";
import Button from "../../../components/Button";
import Header from "../../../components/Header";

type ClinicalHistory = {
  idClinicalHistory?: number;
  medications: string;
  allergies: string;
  chronicDiseases: {
    name: string;
    startDate: string;
    diagnosingDoctor: string;
  }[];
  patient: {
    idPaciente: number
  }
};

type InsertClinicalHistory = {
  medications: string;
  allergies: string;
  chronicDiseases: {
    name: string;
    startDate: string;
    diagnosingDoctor: string;
  }[];
  idPaciente: number
}

type PatientData = {
  idPaciente: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  documentation: number;
  gender: string;
  email: string;
  medicalInsurance: string;
};

const UpdateHistorialClinico = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [patient, setPatient] = useState<PatientData>({
    idPaciente: 0,
    firstName: "",
    lastName: "",
    birthDate: "",
    documentation: 0,
    gender: "",
    email: "",
    medicalInsurance: "",
  });
  const [clinicalHistory, setClinicalHistory] = useState<ClinicalHistory>({
    idClinicalHistory: 0,
    medications: "",
    allergies: "",
    chronicDiseases: [
      {
        name: "",
        startDate: "",
        diagnosingDoctor: "",
      },
    ],
    patient: {
      idPaciente: 0,
    },
  });
  const [insertClinicalHistory, setInsertClinicalHistory] = useState<InsertClinicalHistory>({
    medications: "",
    allergies: "",
    chronicDiseases: [{
      name: "",
      startDate: "",
      diagnosingDoctor: "",
    }],
    idPaciente: 0
  })
  const [disease, setDisease] = useState("");
  const [startDate, setStartDate] = useState("");
  const [diagnosingDoctor, setDiagnosingDoctor] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setInsertClinicalHistory(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    if (!id) {
      navigate("/doctor/historiales-clinicos");
    } else {
      const id_patient = parseInt(id, 10);

      const getClinicalHistoryPatient = async () => {
        try {
          const patient = await axios.get(URLs.GET_PATIENT);
          const patients = patient.data; // Asegúrate de que response.data es un array de pacientes
          const foundPatient = patients.find(
            (patient: PatientData) => patient.idPaciente === id_patient
          );
          console.log(patient);

          if (!foundPatient) {
            console.log("Paciente no encontrado");
            // navigate("/doctor/historiales-clinicos");
          }

          setPatient(foundPatient);
          const response = await axios.get(URLs.GET_CLINICAL_HISTORY);
          const foundClinicalHistory = response.data.find(
            (item: ClinicalHistory) => item.patient.idPaciente === id_patient
          );

          if (foundClinicalHistory) {
            setClinicalHistory(foundClinicalHistory)
            console.log("Historial clínico encontrado:", foundClinicalHistory)
          } else {
            console.log("No se encontró historial clínico para el paciente")
          }
        } catch (error) {
          console.log("Error al obtener historial clinico");
        }
      };
      getClinicalHistoryPatient();
    }
  }, []);

  const handleNewDisease = () => {
    const data = { name: disease, startDate, diagnosingDoctor };
      setInsertClinicalHistory((prev) => ({
        ...prev,
        chronicDiseases: [...prev.chronicDiseases, data],
      }));
      setDisease('')
      setStartDate('')
      setDiagnosingDoctor('')
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario
    console.log("HISTORIAL ACTUALIZADO", insertClinicalHistory); // Imprime el estado actual en la consola
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-slate-300">
      <Header />
      <div className="w-full flex flex-col gap-2 justify-between items-center p-7 bg-slate-300">
        <div className="rounded-lg bg-zinc-100 border-2 border-zinc-300 px-10 pt-6 pb-6 w-[90%] sm:w-[80%] max-w-[500px]">
          <h4 className="text-lg font-semibold mb-4 text-gray-900 text-center">
            Datos del paciente
          </h4>
          <div className="mb-4 flex flex-col">
            <div className="flex flex-row w-full mb-4 items-center">
              <p className="text-sm mb-2 text-gray-700 w-2/3">
                Nombre del paciente
              </p>
              <input
                type="text"
                value={patient?.firstName + " " + patient?.lastName}
                className={`px-3 py-2 text-sm w-full rounded-md border shadow-sm border-slate-300 bg-slate-300 text-gray-800 font-semibold 
           sm:text-sm disabled:shadow-none`}
                disabled
              />
            </div>

            <div className="flex flex-row w-full mb-4 items-center">
              <p className="text-sm mb-2 text-gray-700 w-2/3">
                Fecha de nacimiento
              </p>
              <input
                type="text"
                value={patient?.birthDate}
                className={`px-3 py-2 text-sm w-full rounded-md border shadow-sm border-slate-300 bg-slate-300 text-gray-800 font-semibold
                sm:text-sm disabled:shadow-none`}
                disabled
              />
            </div>
            <div className="flex flex-row w-full mb-4 items-center">
              <p className="text-sm mb-2 text-gray-700 w-2/3 ">Documentación</p>
              <input
                type="text"
                value={patient?.documentation}
                className={`px-3 py-2 text-sm w-full rounded-md border shadow-sm border-slate-300 bg-slate-300 text-gray-800 font-semibold
                sm:text-sm disabled:shadow-none`}
                disabled
              />
            </div>
            <div className="flex flex-row w-full items-center">
              <p className="text-sm mb-2 text-gray-700 w-2/3">Seguro médico</p>
              <input
                type="text"
                value={patient?.medicalInsurance}
                className={`px-3 py-2 text-sm w-full rounded-md border shadow-sm border-slate-300 bg-slate-300 text-gray-800 font-semibold
           sm:text-sm disabled:shadow-none`}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 justify-between items-center p-7 bg-slate-300">
        <form className="rounded-lg bg-zinc-100 border-2 border-zinc-300 px-10 pt-6 pb-6 w-[90%] sm:w-[80%] max-w-[500px]" onSubmit={handleSubmitForm}>
          <h4 className="text-lg font-semibold mb-4 text-gray-900 text-center">
            Historial clínico
          </h4>
          <div className="flex flex-col w-full mb-4">
            <p className="text-gray-700 mb-4 text-sm w-full text-left lg:w-2/3 lg:mb-1">
              Enfermedades crónicas
            </p>

            <table className="border-collapse border border-slate-100 w-full">
              <thead>
                <tr className="text-sm bg-slate-300">
                  <th className="border border-slate-100 font-semibold p-3 text-slate-900 text-left">
                    Enfermedad
                  </th>
                  <th className="border border-slate-100 font-semibold p-3 text-slate-900 text-left">
                    Año de diagnóstico
                  </th>
                  <th className="border border-slate-100 font-semibold p-3 text-slate-900 text-left">
                    Nombre del doctor
                  </th>
                </tr>
              </thead>
              <tbody>
                {clinicalHistory.chronicDiseases.map((disease, index) => (
                  <tr key={index} className="text-sm">
                    <td className="px-3 py-2 border shadow-sm border-slate-300 bg-slate-50 ">
                      {disease.name}
                    </td>
                    <td className="px-3 py-2 border shadow-sm border-slate-300 bg-slate-50">
                      {disease.startDate}
                    </td>
                    <td className="px-3 py-2 border shadow-sm border-slate-300 bg-slate-50">
                      {disease.diagnosingDoctor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col w-full mb-4 gap-3">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="disease" className="text-sm text-gray-700">
                Enfermedad
              </label>
              <input
                type="text"
                id="disease"
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
                placeholder="Nombre de la enfermedad y tipo"
                className={`px-3 py-2 text-sm w-[60%] rounded-md border shadow-sm  bg-zinc-100
                focus:outline-none sm:text-sm focus:ring-1 disabled:shadow-none 
                `}
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="diagnosisDate" className="text-sm text-gray-700">
                Fecha de diagnóstico
              </label>
              <input
                type="date"
                id="diagnosisDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={`px-3 py-2 text-sm w-[60%] rounded-md border shadow-sm  bg-zinc-100
                focus:outline-none sm:text-sm focus:ring-1 disabled:shadow-none `}
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="doctor" className="text-sm text-gray-700">
                Nombre doctor
              </label>
              <input
                type="text"
                id="doctor"
                value={diagnosingDoctor}
                placeholder="Dr. que diagnosticó la enfermedad"
                onChange={(e) => setDiagnosingDoctor(e.target.value)}
                className={`px-3 py-2 text-sm w-[60%] rounded-md border shadow-sm bg-zinc-100
                focus:outline-none sm:text-sm focus:ring-1 disabled:shadow-none }`}
              />
            </div>
            <Button color="type-1" onClick={handleNewDisease}>
              +
            </Button>
          </div>

          <div className="flex flex-row w-full mb-4 items-center">
            <p className="text-sm mb-2 text-gray-700 w-2/3">Medicamentos</p>
            <textarea
              value={
                clinicalHistory.medications ? clinicalHistory.medications : ""
              }
              name="medications"
              onChange={handleChange}
              className={`px-3 py-2 text-sm w-full rounded-md border shadow-sm border-slate-300 bg-slate-50 text-gray-800 font-semibold
      sm:text-sm disabled:shadow-none`}
              rows={clinicalHistory.medications ? 3 : 1}
            />
          </div>
          <div className="flex flex-row w-full mb-4 items-center">
            <p className="text-sm mb-2 text-gray-700 w-2/3">Alergias</p>
            <textarea
              value={
                clinicalHistory.allergies ? clinicalHistory.allergies : "-"
              }
              name="allergies"
              onChange={handleChange}
              className={`px-3 py-2 text-sm w-full rounded-md border shadow-sm border-slate-300 bg-slate-50 text-gray-800 font-semibold
      sm:text-sm disabled:shadow-none`}
              rows={clinicalHistory.medications ? 3 : 1}
            />
          </div>
          <Button color="type-1" type="submit">
              Actualizar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateHistorialClinico;
