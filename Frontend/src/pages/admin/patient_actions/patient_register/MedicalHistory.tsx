import React, { useState } from "react";
import Button from "../../../../components/Button";

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
  prevStep: () => void;
  nextStep: () => void;
  handleChange: (
    field: string,
    dataType: "patient" | "medical"
  ) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  values: MedicalHistory;
  setValues: React.Dispatch<React.SetStateAction<MedicalHistory>>;
};

const MedicalHistory = ({
  prevStep,
  nextStep,
  handleChange,
  values,
  setValues,
}: RegisterProps) => {
  const [disease, setDisease] = useState("");
  const [startDate, setStartDate] = useState("");
  const [diagnosingDoctor, setDiagnosingDoctor] = useState("");

  const [error, setError] = useState(false);

  const handleNewDisease = () => {
    let hasError = false;

    if (!disease) {
      hasError = true;
    }

    if (!startDate) {
      hasError = true;
    }

    if (!diagnosingDoctor) {
      hasError = true;
    }

    setError(hasError);

    if (!hasError) {
      const data = { name: disease, startDate, diagnosingDoctor };
      setValues((prev) => ({
        ...prev,
        chronicDiseases: [...prev.chronicDiseases, data],
      }));
      setDisease('')
      setStartDate('')
      setDiagnosingDoctor('')
    }
  };

  return (
    <form
      action=""
      className="rounded-lg bg-zinc-50 border-2 border-zinc-300 px-10 pt-6 pb-6 w-[90%] sm:w-[80%] max-w-[500px]"
    >
      <h4 className="text-lg font-semibold mb-4 text-gray-900 text-center">
        HISTORIAL CLÍNICO
      </h4>
      <div className="mb-4 flex flex-col gap-3">
        <div>
          <h1 className="text-md font-semibold text-gray-900">
            Enfermedades crónicas (opcional)
          </h1>
          <p className="text-sm text-gray-600 font-base">
            Presiona el <strong>+</strong> para guardar la nueva enfermedad
          </p>
        </div>
        {error && (
          <p className="text-sm text-red-500">Completa todos los campos</p>
        )}
        {values.chronicDiseases && values.chronicDiseases.length > 0 ? (
          <table className="border-collapse w-full border border-slate-400 text-sm bg-stone-50 ">
            <thead>
              <tr className="text-sm bg-sky-100">
                <th className="border border-slate-300 dark:border-slate-600 font-semibold p-1 text-slate-900 dark:text-slate-200 text-left">
                  Enfermedad
                </th>
                <th className="border border-slate-300 dark:border-slate-600 font-semibold p-1 text-slate-900 dark:text-slate-200 text-left">
                  Año de diagnóstico
                </th>
                <th className="border border-slate-300 dark:border-slate-600 font-semibold p-1 text-slate-900 dark:text-slate-200 text-left">
                  Nombre del doctor
                </th>
              </tr>
            </thead>
            <tbody>
              {values.chronicDiseases.map((disease, index) => (
                <tr key={index}>
                  <td
                    className={
                      "border border-slate-300 dark:border-slate-600 p-1 text-slate-900 dark:text-slate-200 text-left"
                    }
                  >
                    {disease.name}
                  </td>
                  <td className="border border-slate-300 dark:border-slate-600 p-1 text-slate-900 dark:text-slate-200 text-left">
                    {disease.startDate}
                  </td>
                  <td className="border border-slate-300 dark:border-slate-600 p-1 text-slate-900 dark:text-slate-200 text-left">
                    {disease.diagnosingDoctor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          ""
        )}
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
            focus:outline-none sm:text-sm focus:ring-1 disabled:shadow-none ${
              error
                ? "border-red-500 placeholder-red-500"
                : "border-slate-300 placeholder-slate-400"
            }`}
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
            focus:outline-none sm:text-sm focus:ring-1 disabled:shadow-none ${
              error
                ? "border-red-500 placeholder-red-500"
                : "border-slate-300 placeholder-slate-400"
            }`}
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
            focus:outline-none sm:text-sm focus:ring-1 disabled:shadow-none ${
              error
                ? "border-red-500 placeholder-red-500"
                : "border-slate-300 placeholder-slate-400"
            }`}
          />
        </div>
        <Button color="type-1" onClick={handleNewDisease}>
          +
        </Button>
      </div>

      <div className="mb-4 flex flex-col">
        <label htmlFor="medicines" className="text-md mb-2 text-zinc-800 font-semibold">
          Medicamentos (opcional)
        </label>
        <input
          type="text"
          id="medicines"
          value={values.medications}
          onChange={handleChange("medications", "medical")}
          className={`px-3 py-2 text-sm w-full rounded-md border shadow-sm border-slate-300 placeholder-slate-400 bg-zinc-100
            focus:outline-none sm:text-sm focus:ring-1 disabled:shadow-none`}
        />
      </div>
      <div className="mb-4 flex flex-col">
        <label htmlFor="allergies" className="text-md mb-2 text-zinc-800 font-semibold">
          Alergias (opcional)
        </label>
        <input
          type="text"
          id="allergies"
          value={values.allergies}
          onChange={handleChange("allergies", "medical")}
          className={`px-3 py-2 text-sm w-full rounded-md border shadow-sm border-slate-300 placeholder-slate-400 bg-zinc-100
            focus:outline-none sm:text-sm focus:ring-1 disabled:shadow-none`}
        />
      </div>

      <div className="w-full flex justify-evenly mt-8">
        <div className="w-1/3">
          <Button color="type-3" onClick={prevStep}>
            Volver
          </Button>
        </div>
        <div className="w-1/3">
          <Button color="type-1" onClick={nextStep}>
            Continuar
          </Button>
        </div>
      </div>
    </form>
  );
};

export default MedicalHistory;
