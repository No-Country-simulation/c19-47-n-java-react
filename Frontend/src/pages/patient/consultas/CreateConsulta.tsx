import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import axios from "axios";
import { URLs } from "../../../config";
import Modal from "../../../components/Modal";
import { RiErrorWarningFill } from "react-icons/ri";
import { LuCalendarCheck } from "react-icons/lu";
import { LuCalendarX } from "react-icons/lu";
import { useAuth } from "../../../context/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";

const motives = [
  {
    id: 1,
    name: "Dolores y Malestares Generales",
  },
  {
    id: 2,
    name: "Síntomas Respiratorios",
  },
  {
    id: 3,
    name: "Problemas Digestivos",
  },
  {
    id: 4,
    name: "Control de Enfermedades Crónicas",
  },
  {
    id: 5,
    name: "Chequeo General de Salud",
  },
  {
    id: 6,
    name: "Otro",
  },
];

const spanishToDayIndex = (day: string): number => {
  const days: Record<string, number> = {
    domingo: 0,
    lunes: 1,
    martes: 2,
    miércoles: 3,
    jueves: 4,
    viernes: 5,
    sábado: 6,
  };
  return days[day.toLowerCase()] ?? -1; // Retorna -1 si el día no está en el objeto
};

const CreateConsulta = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [days, setDays] = useState<any[]>([]);
  const [selectDoctor, setSelectDoctor] = useState<number | null>(null);
  const [selectDay, setSelectDay] = useState<Date | null>(null);
  const [selectMotive, setSelectMotive] = useState<string>("");
  const [disabledDays, setDisabledDays] = useState<number[]>([]);
  const [showSucessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const { getPatient } = useAuth();
  const user = getPatient();

  useEffect(() => {
    const getdoctors = async () => {
      try {
        const response = await axios.get(URLs.DOCTOR);
        setDoctors(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getdoctors();
  }, []);

  useEffect(() => {
    if (selectDoctor) {
      const getDays = async () => {
        try {
          const response = await axios.get(URLs.DOCTOR_WORK_SCHEDULES);
          const filteredDays = response.data.filter(
            (day: any) => day.doctor.idDoctor === selectDoctor
          );
          const diasOrdenados = [
            "domingo",
            "lunes",
            "martes",
            "miércoles",
            "jueves",
            "viernes",
            "sábado",
          ];

          const sortedDays = filteredDays
            .map((day: any) => spanishToDayIndex(day.day))
            .filter((index: number) => index !== -1);

          setDisabledDays(sortedDays);
        } catch (error) {}
      };
      getDays();
    } else {
      setDays([]);
    }
  }, [selectDoctor]);

  const isDisabled = (date: Date): boolean => {
    if (disabledDays.length === 0) {
      return false; // No hay días desactivados, por lo que no se debe desactivar ninguna fecha
    }
    const day = date.getDay();
    return !disabledDays.includes(day);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrorModal(false);
    setShowSuccessModal(false);

    const formatedDateString = selectDay?.toISOString()

    const data = {
      day: formatedDateString,
      motive: selectMotive,
      doctorId: selectDoctor,
      patientId: user?.id,
    };

    console.log(data);

    try {
      const response = await axios.post(URLs.ADD_CONSULTATION, data);
      if (response.status === 201) {
        console.log("Consulta creada");
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.log(error);
      setShowErrorModal(true);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Header />
      <div className="flex flex-col w-full items-center sm:w-3/5 sm:max-w-[500px] p-6 mt-5 text-gray-900">
        {showErrorModal ? (
          <Modal
            type="error"
            title="¡Oops...!"
            content=""
            buttonText="Aceptar"
            icon={<LuCalendarX />}
          />
        ) : (
          showSucessModal && (
            <Modal
              type="success"
              title="¡Consulta programada!"
              content=""
              icon={<LuCalendarCheck />}
              buttonText="Aceptar"
              linkClose="/pacientes/consultas"
            />
          )
        )}

        <h2 className="text-2xl md:text-3xl font-bold">
          Programar una consulta
        </h2>
      </div>
      <hr className="border border-zinc-300 w-3/5" />
      <div className="w-full flex items-center justify-center mt-2">
        <form
          onSubmit={handleSubmitForm}
          className="flex flex-col w-[90%] sm:w-[80%] max-w-[500px] p-5 gap-5"
        >
          <div className="flex flex-col gap-3">
            <label htmlFor="doctor" className="text-gray-700">
              Seleccione un médico
            </label>
            <select
              name=""
              id="doctor"
              className="px-3 py-2 text-sm w-full rounded-md border border-slate-300 shadow-sm 
              focus:outline-none sm:text-sm focus:ring-1"
              onChange={(e) => setSelectDoctor(Number(e.target.value))}
            >
              <option className="text-gray-600" value="">
                Seleccione un médico
              </option>
              {doctors.map((doctor) => (
                <option value={doctor.idDoctor} key={doctor.idDoctor}>
                  {doctor.firstName + " " + doctor.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="day" className="text-gray-700">
              Seleccione una fecha
            </label>
            <DatePicker
              selected={selectDay}
              onChange={(date: Date | null) => setSelectDay(date)}
              filterDate={(date: Date) => !isDisabled(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecciona una fecha"
              locale={es}
              className="px-3 py-2 text-sm w-full rounded-md border border-slate-300 shadow-sm 
              focus:outline-none sm:text-sm focus:ring-1"
              disabled={selectDoctor?false:true}
            />
            {/* <select
              name=""
              id="day"
              className="px-3 py-2 text-sm w-full rounded-md border border-slate-300 shadow-sm 
              focus:outline-none sm:text-sm focus:ring-1"
              onChange={(e) => {
                setSelectDay(e.target.value);
              }}
            >
              <option value="">Selecciona una opción</option>
              {days.map((day) => (
                <option value={day.day} key={day.id}>
                  {day.day.charAt(0).toUpperCase() +
                    day.day.slice(1).toLowerCase()}
                </option>
              ))}
            </select> */}
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="motive" className="text-gray-700">
              Motivo de la consulta
            </label>
            <select
              name=""
              id="motive"
              className="px-3 py-2 text-sm w-full rounded-md border border-slate-300 shadow-sm 
              focus:outline-none sm:text-sm focus:ring-1"
              onChange={(e) => setSelectMotive(e.target.value)}
            >
              <option className="text-gray-600" value="">
                Seleccione un motivo
              </option>

              {motives.map((motive) => (
                <option value={motive.name} key={motive.id}>
                  {motive.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-5">
            <Button color="type-1" type="submit">
              Programar consulta
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateConsulta;
