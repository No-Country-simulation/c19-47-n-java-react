import { useState } from "react";
import Button from "../../../../components/Button";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { URLs } from "../../../../config.tsx";
import Modal from "../../../../components/Modal";
import { BsPersonCheck } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";

type PatientData = {
  firstName: string;
  lastName: string;
  birthDate: string;
  documentation: number;
  gender: string;
  email: string;
  medicalInsurance: string;
};

type MedicalHistory = {
  chronicDiseases: {
    name: string;
    startDate: string;
    diagnosingDoctor: string;
  }[];
  medications: string;
  allergies: string;
};

type RegisterProps = {
  patient: PatientData;
  medical: MedicalHistory;
  prevStep: () => void;
};

const isEmpty = (obj: {}) => {
  return Object.values(obj).every((value) => {
    return value === "" || (Array.isArray(value) && value.length === 0);
  });
};

const ConfirmRegister = ({ patient, medical, prevStep }: RegisterProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSucessModal, setShowSuccessModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)


  const handleNewPatient = async () => {
    const {
      firstName,
      lastName,
      birthDate,
      documentation,
      gender,
      email,
      medicalInsurance,
    } = patient;
    const dataPatient = {
      firstName,
      lastName,
      birthDate,
      documentation,
      gender,
      email,
      medicalInsurance,
    };

    setShowErrorModal(false)
    setShowSuccessModal(false)
    setLoading(true)

    try {
      const resultPatient = await axios.post(URLs.ADD_PATIENT, dataPatient);
      
      if (resultPatient.status === 201) {
        console.log("Paciente agregado");
        setShowSuccessModal(true)

        const { chronicDiseases, medications, allergies } = medical;

        if (!isEmpty({ chronicDiseases, medications, allergies })) {
          const id = resultPatient.data.idPaciente;
          const medicalHistory = {
            chronicDiseases,
            medications,
            allergies,
            id,
          };

          const resultMedicalHistory = await axios.post(
            URLs.ADD_CLINICAL_HISTORY,
            medicalHistory
          );
 
          if (resultMedicalHistory.status === 201) {
            console.log("Historia médica agregada");
          }else{
            console.log("Error al agregar historia médica");
            setShowErrorModal(true)
            setError('Ha ocurrido un error, inténtelo nuevamente.')
          }
        }else{
          console.log("No hay datos médicos para agregar.");
        }
        
      } 

    } catch (error) {
      console.error(error);
      const errorMsg = (error as any).response?.data?.error
      console.warn(errorMsg)
      setError(errorMsg)
      setShowErrorModal(true)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col rounded-lg bg-stone-50 border-2 border-zinc-300 px-6 pt-6 pb-6 w-[90%] sm:w-[80%] max-w-[1000px]">
      {showErrorModal 
      ? (
         (<Modal 
           type="error"
           title="¡Oops...!" 
           content={error}
           icon = {<RiErrorWarningFill />}
           />)
          ) : showSucessModal && (
            <Modal 
            type="success"
            title="¡Paciente registrado!" 
            content="El paciente se registró con éxito."
            icon = {<BsPersonCheck />}
            buttonLeft={{text:"Ver pacientes",link:"/admin/pacientes"}}
            buttonRight={{text:"Nuevo paciente",link:"/admin/pacientes/nuevo"}}
            linkClose="/admin/pacientes"
            />
       )
      }

      <h3 className="text-xl font-semibold mb-1 text-zinc-800 text-center">
        CONFIRMACIÓN DE DATOS
      </h3>
      <p className="text-center text-base text-gray-600">
        Si los datos son correctos presiona <strong>Crear paciente</strong>
      </p>
      <p className="mb-6 text-center text-base text-gray-600">
        Si los datos son incorrectos presiona <strong>Volver</strong>
      </p>

      <div className="flex flex-col lg:flex-row lg:justify-around">
        <div className="flex flex-col lg:w-1/2 lg:p-6">
          <p className="text-gray-700 text-center text-lg font-semibold mb-4">
            Datos personales
          </p>
          <hr className="mb-6" />
          <div className="flex flex-row w-full mb-4 items-center">
            <p className="text-sm mb-2 text-gray-700 w-2/3">Nombre/s</p>
            <input
              type="text"
              value={patient.firstName}
              className={`px-3 py-2 text-sm w-full rounded-md border shadow-sm border-slate-300 bg-slate-300 text-gray-800 font-semibold 
           sm:text-sm disabled:shadow-none`}
              disabled
            />
          </div>
          <div className="flex flex-row w-full mb-4 items-center">
            <p className="text-sm mb-2 text-gray-700 w-2/3">Apellido/s</p>
            <input
              type="text"
              value={patient.lastName}
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
              value={patient.birthDate}
              className={`px-3 py-2 text-sm w-full rounded-md border shadow-sm border-slate-300 bg-slate-300 text-gray-800 font-semibold
           sm:text-sm disabled:shadow-none`}
              disabled
            />
          </div>
          <div className="flex flex-row w-full mb-4 items-center">
            <p className="text-sm mb-2 text-gray-700 w-2/3 ">Documentación</p>
            <input
              type="text"
              value={patient.documentation}
              className={`px-3 py-2 text-sm w-full rounded-md border shadow-sm border-slate-300 bg-slate-300 text-gray-800 font-semibold
           sm:text-sm disabled:shadow-none`}
              disabled
            />
          </div>
          <div className="flex flex-row w-full mb-4 items-center">
            <p className="text-sm mb-2 text-gray-700 w-2/3">Género</p>
            <input
              type="text"
              value={patient.gender === "male" ? "Masculino" : "Femenino"}
              className={`px-3 py-2 text-sm w-full rounded-md border shadow-sm border-slate-300 bg-slate-300 text-gray-800 font-semibold
           sm:text-sm disabled:shadow-none`}
              disabled
            />
          </div>
          <div className="flex flex-row w-full mb-4 items-center">
            <p className="text-sm mb-2 text-gray-700 w-2/3">
              Correo electrónico
            </p>
            <input
              type="text"
              value={patient.email}
              className={`px-3 py-2 text-sm w-full rounded-md border shadow-sm border-slate-300 bg-slate-300 text-gray-800 font-semibold
           sm:text-sm disabled:shadow-none`}
              disabled
            />
          </div>
          <div className="flex flex-row w-full mb-8 lg:mb-4 items-center">
            <p className="text-sm mb-2 text-gray-700 w-2/3">Seguro médico</p>
            <input
              type="text"
              value={
                patient.medicalInsurance === "" ? "-" : patient.medicalInsurance
              }
              className={`px-3 py-2 text-sm w-full rounded-md border shadow-sm border-slate-300 bg-slate-300 text-gray-800 font-semibold
           sm:text-sm disabled:shadow-none`}
              disabled
            />
          </div>
        </div>

        <div className="lg:w-1/2 lg:p-6">
          <p className="text-gray-700 mb-4 text-center text-lg font-semibold">
            Historial clínico
          </p>
          <hr className="mb-6" />
          <div className="flex flex-col lg:flex-row w-full mb-4 items-center">
            <p className="text-gray-700 mb-2 text-sm w-full text-left lg:w-2/3 lg:mb-1">
              Enfermedades crónicas
            </p>
            {medical.chronicDiseases && medical.chronicDiseases.length > 0 ? (
              <table className="border-collapse border border-slate-100 text-sm bg-stone-50 w-full">
                <thead>
                  <tr className="text-sm lg:text-xs bg-slate-300">
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
                  {medical.chronicDiseases.map((disease, index) => (
                    <tr key={index} className="text-sm lg:text-xs">
                      <td className="px-3 py-2 border shadow-sm border-slate-100 bg-slate-300">
                        {disease.name}
                      </td>
                      <td className="px-3 py-2 border shadow-sm border-slate-100 bg-slate-300">
                        {disease.startDate}
                      </td>
                      <td className="px-3 py-2 border shadow-sm border-slate-100 bg-slate-300">
                        {disease.diagnosingDoctor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <input
                type="text"
                value="-"
                className={`px-3 py-2 text-sm w-full rounded-md border shadow-sm border-slate-300 bg-slate-300 text-gray-800 font-semibold
                sm:text-sm disabled:shadow-none`}
                disabled
              />
            )}
          </div>
          <div className="flex flex-row w-full mb-4 items-center">
            <p className="text-sm mb-2 text-gray-700 w-2/3">Medicamentos</p>
            <textarea
              value={medical.medications ? medical.medications : "-"}
              className={`px-3 py-2 text-sm w-full rounded-md border shadow-sm border-slate-300 bg-slate-300 text-gray-800 font-semibold
      sm:text-sm disabled:shadow-none`}
              disabled
              rows={medical.medications ? 3 : 1}
            />
          </div>
          <div className="flex flex-row w-full mb-4 items-center">
            <p className="text-sm mb-2 text-gray-700 w-2/3">Alergias</p>
            <textarea
              value={medical.allergies ? medical.allergies : "-"}
              className={`px-3 py-2 text-sm w-full rounded-md border shadow-sm border-slate-300 bg-slate-300 text-gray-800 font-semibold
      sm:text-sm disabled:shadow-none`}
              disabled
              rows={medical.medications ? 3 : 1}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-evenly mt-8">
        <div className="lg:w-[500px] w-full flex justify-center gap-10">
          <div className="w-1/3 lg:max-w-[190px]">
            <Button color="type-3" onClick={prevStep}>
              Volver
            </Button>
          </div>
          <div className="w-1/3 max-w-[190px]">
            <Button color="type-1" onClick={handleNewPatient}>
              Registrar paciente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRegister;
