import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Button from "../../../components/Button";
import axios from "axios";
import { URLs } from "../../../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import Footer from "../../../components/Footer";

type WorkSchedule = {
  id: number;
  shiftsPerDay: number;
  day: string;
  doctor: {
    idDoctor: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    documentation: string;
    gender: string;
    specialty: string;
    email: string;
    license: number;
    state: boolean;
  };
};

const CreateHorarioLaboral = () => {
  const { getDoctor } = useAuth();
  const doctor = getDoctor();

  const navigate = useNavigate();
  const [daysUsed, setDaysUsed] = useState<string[]>([]);
  const [quantityShift, setQuantityShift] = useState<number>();
  const [days, setDays] = useState<string[]>([]);
  const [errors, setErrors] = useState({
    quantityShift: "",
    days: "",
  });

  useEffect(() => {
    const doctorId = doctor?.id;
    const getDaysUsed = async () => {
      try {
        const response = await axios.get(URLs.DOCTOR_WORK_SCHEDULES);
        const foundDaysUsed = response.data
          .filter((item: WorkSchedule) => item.doctor.idDoctor === doctorId)
          .map((item: WorkSchedule) => item.day);
        setDaysUsed(foundDaysUsed);
        setDays(foundDaysUsed);
      } catch (error) {
        console.log(error);
      }
    };
    getDaysUsed();
  }, []);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;

    if (days.includes(id)) {
      setDays(days.filter((day) => day !== id));
    } else {
      // Si el día no está en days, agregarlo (permitir marcar)
      setDays([...days, id]);
    }
  };

  const validateForm = (days : Array<string>) => {
    let hasErrors = false;
    const errors = {
      quantityShift: "",
      days: "",
    };

    if (quantityShift === 0 || quantityShift === undefined) {
      errors.quantityShift = "La cantidad de turnos es obligatoria";
      hasErrors = true;
    }

    if (days.length <= 0) {
      errors.days = "Debes seleccionar al menos un día";
      hasErrors = true;
    }
    setErrors(errors);
    return hasErrors;
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newDays = days.filter((day) => !daysUsed.includes(day));
    const hasErrors = validateForm(newDays);

    if (!hasErrors) {
      const data = {
        shiftsPerDay: quantityShift,
        days: newDays,
        doctorId: doctor?.id,
      };

      try {
        await axios.post(URLs.DOCTOR_WORK_SCHEDULES, data);
        navigate("/medicos/horarios-laborales");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Header />
      <div className="flex flex-col w-full items-center sm:w-3/5 sm:max-w-[500px] p-6 mt-5 text-gray-900">
        <h2 className="text-3xl font-bold">Horarios laborales</h2>
      </div>
      <hr className="border border-zinc-300 w-3/5" />
      <div className="w-full flex items-center justify-center mt-2">
        <form
          onSubmit={handleSubmitForm}
          className="flex flex-col w-[90%] sm:w-[80%] max-w-[500px] p-5 gap-2"
        >
          <label htmlFor="turnos" className="text-gray-700">
            Cantidad de turnos por día
          </label>
          <input
            type="number"
            name=""
            id="turnos"
            onChange={(e) => setQuantityShift(Number(e.target.value))}
            className={`px-3 py-2 text-sm w-full rounded-md border shadow-sm  bg-zinc-100
              focus:outline-none sm:text-sm focus:ring-1 disabled:shadow-none ${errors.quantityShift && 'border border-red-500'}`}
          />
          {errors.quantityShift && (
            <p className="text-sm text-red-500">{errors.quantityShift}</p>
          )}
          <label htmlFor="lunes" className="text-gray-700 mt-3">
            Seleccione los días
          </label>
          {[
            "lunes",
            "martes",
            "miércoles",
            "jueves",
            "viernes",
            "sábado",
            "domingo",
          ].map((day) => (
            <div key={day} className="flex gap-2">
              <input
                type="checkbox"
                id={day}
                onChange={handleCheckboxChange}
                className="w-4"
                disabled={daysUsed.includes(day)}
                checked={days.includes(day)}
              />
              <label htmlFor={day} className="text-gray-700">
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </label>
            </div>
          ))}
          {errors.days && (
            <p className="text-sm text-red-500">{errors.days}</p>
          )}
          <div className="mt-5">
            <Button color="type-1" type="submit">
              Agregar
            </Button>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  );
};
export default CreateHorarioLaboral;
