import React, { useState } from "react";
import Header from "../../../../components/Header";
import InformacionPaciente from "./PatientInfo";
import HistorialClinico from "./MedicalHistory";
import ConfirmarRegistro from "./ConfirmarRegistro";
import Footer from "../../../../components/Footer";

const PatientRegister = () => {
  const [step, setStep] = useState(1);

  type PatientData = {
    firstName: string;
    lastName: string;
    birthDate: string;
    documentation: number;
    gender: string;
    email: string;
    medicalInsurance: string;
  };

  const [patientData, setPatientData] = useState<PatientData>({
    firstName: "",
    lastName: "",
    birthDate: "",
    documentation: 0,
    gender: "",
    email: "",
    medicalInsurance: "",
  });

  type MedicalHistory = {
    chronicDiseases: {
      name: string;
      startDate: string;
      diagnosingDoctor: string;
    }[];
    medications: string;
    allergies: string;
  };

  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory>({
    chronicDiseases: [],
    medications: "",
    allergies: "",
  });

  const nextStep = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setStep(step + 1);
  };
  const prevStep = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setStep(step - 1)
  }

  const handleChange =
    (input: string, dataType: "patient" | "medical") =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (dataType === "patient") {
        setPatientData({ ...patientData, [input]: e.target.value });
      } else {
        setMedicalHistory({ ...medicalHistory, [input]: e.target.value });
      }
    };

  return (
    <div className="flex flex-col items-center h-full">
      <Header />
      <div className="flex flex-row mb-10 mt-10 justify-center items-center w-2/3 sm:w-[500px]">
        <h1
          className={`flex items-center justify-center w-12 h-10 sm:text-lg sm:h-12 rounded-full ${
            step === 1 ? `bg-sky-800 text-white` : `bg-sky-950 text-white`
          }`}
        >
          1
        </h1>
        <hr className="w-32 border border-zinc-300" />
        <h1
          className={`sm:h-12 w-12 h-10 flex items-center justify-center text-lg rounded-full border ${
            step === 2
              ? `bg-sky-800 text-white`
              : `border-zinc-300 text-zinc-300`
          } 
          ${step > 2 ? `bg-sky-950 text-white` : ``}`}
        >
          2
        </h1>
        <hr className="w-32 border border-zinc-300" />
        <h1
          className={`sm:h-12 h-10 w-12 flex items-center justify-center text-lg rounded-full border ${
            step === 3
              ? `bg-sky-800 text-white`
              : `border-zinc-300 text-zinc-300`
          } `}
        >
          3
        </h1>
      </div>
      <h2 className="text-3xl mb-10 font-bold text-zinc-700">Nuevo paciente</h2>
      {(() => {
        switch (step) {
          case 1:
            return (
              <InformacionPaciente
                nextStep={nextStep}
                handleChange={handleChange}
                values={patientData}
              />
            );
          case 2:
            return (
              <HistorialClinico
                prevStep={prevStep}
                nextStep={nextStep}
                handleChange={handleChange}
                values={medicalHistory}
                setValues={setMedicalHistory}
              />
            );
          case 3:
            return (
              <ConfirmarRegistro
                patient={patientData}
                medical={medicalHistory}
                prevStep={prevStep}
              />
            );
            return null;
        }
      })()}
      <Footer />
    </div>
  );
};

export default PatientRegister;
