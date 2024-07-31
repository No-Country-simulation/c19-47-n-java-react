import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import axios from "axios";
import { URLs } from "../../../config";
import Modal from "../../../components/Modal";
import { LuCalendarCheck } from "react-icons/lu";
import { LuCalendarX } from "react-icons/lu";
import { useAuth } from "../../../context/AuthProvider";
import Footer from "../../../components/Footer";

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

const CreateConsulta = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [days, setDays] = useState<any[]>([]);
  const [selectDoctor, setSelectDoctor] = useState<number | null>(null);
  const [selectDay, setSelectDay] = useState<string>("");
  const [selectMotive, setSelectMotive] = useState<string>("");
  const [showSucessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errors, setErrors] = useState({
    doctorId: "",
    day: "",
    motive: "",
  });

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
            "lunes",
            "martes",
            "miércoles",
            "jueves",
            "viernes",
            "sábado",
            "domingo",
          ];

          // Crear un conjunto para facilitar la búsqueda
          const daySet = new Set(filteredDays.map((day: any) => day.day));

          // Filtrar y ordenar los días en base a `diasOrdenados`
          const sortedDays = diasOrdenados.filter((day) => daySet.has(day));

          setDays(sortedDays);
        } catch (error) {}
      };
      getDays();
    } else {
      setDays([]);
    }
  }, [selectDoctor]);

  const validateForm = () => {
    let hasErrors = false;
    const errors = {
      doctorId: "",
      day: "",
      motive: "",
    };

    if (selectDoctor === null) {
      errors.doctorId = "Debes seleccionar un médico";
      hasErrors = true;
    }

    if (selectDay === "") {
      errors.day = "Debes seleccionar un día";
      hasErrors = true;
    }

    if (selectMotive === "") {
      errors.motive = "Debes seleccionar un motivo";
      hasErrors = true;
    }

    setErrors(errors);
    return hasErrors;
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrorModal(false);
    setShowSuccessModal(false);

    const hasErrors = validateForm();

    if (!hasErrors){
      const data = {
        day: selectDay,
        motive: selectMotive,
        doctorId: selectDoctor,
        patientId: user?.id,
      };
      try {
        const response = await axios.post(URLs.ADD_CONSULTATION, data);
        if (response.status === 201) {
          setShowSuccessModal(true);
        }
      } catch (error) {
        console.log(error);
        setShowErrorModal(true);
      }
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
              className={`px-3 py-2 text-sm w-full rounded-md border shadow-sm 
              focus:outline-none sm:text-sm focus:ring-1 ${errors.doctorId && 'border border-red-500'}`}
              onChange={(e) => setSelectDoctor(Number(e.target.value))}
            >
              <option className="text-gray-600" value="">
                Seleccione un médico
              </option>
              {doctors.map((doctor) => (
                <option value={doctor.idDoctor} key={doctor.idDoctor}>
                  {`${doctor.gender === "female" ? "Dra." : "Dr."} ${
                    doctor.firstName
                  } ${doctor.lastName} - ${doctor.specialty}`}
                </option>
              ))}
            </select>
            {errors.doctorId && (
              <p className="text-sm text-red-500">{errors.doctorId}</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="day" className="text-gray-700">
              Seleccione una fecha
            </label>
            <select
              name=""
              id="day"
              className={`px-3 py-2 text-sm w-full rounded-md border shadow-sm 
                focus:outline-none sm:text-sm focus:ring-1 ${errors.day && 'border border-red-500'}`}
              onChange={(e) => {
                setSelectDay(e.target.value);
              }}
            >
              <option value="">Selecciona una opción</option>
              {days.map((day) => (
                <option value={day} key={day}>
                  {day.charAt(0).toUpperCase() + day.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
            {errors.day && <p className="text-sm text-red-500">{errors.day}</p>}
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="motive" className="text-gray-700">
              Motivo de la consulta
            </label>
            <select
              name=""
              id="motive"
              className={`px-3 py-2 text-sm w-full rounded-md border shadow-sm 
                focus:outline-none sm:text-sm focus:ring-1 ${errors.motive && 'border border-red-500'}`}
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
            {errors.motive && (
              <p className="text-sm text-red-500">{errors.motive}</p>
            )}
          </div>

          <div className="mt-5">
            <Button color="type-1" type="submit">
              Programar consulta
            </Button>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default CreateConsulta;
