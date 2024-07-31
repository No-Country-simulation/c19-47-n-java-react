import React, { useEffect, useState } from "react";
import Header from "../../../../components/Header";
import Button from "../../../../components/Button";
import axios from "axios";
import { URLs } from "../../../../config.tsx";
import Modal from "../../../../components/Modal";
import { BsPersonCheck } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";
import Footer from "../../../../components/Footer.tsx";

const specialtys = [
  { "id": 1, "name": "Cardiología" },
  { "id": 2, "name": "Dermatología" },
  { "id": 3, "name": "Gastroenterología" },
  { "id": 4, "name": "Neurología" },
  { "id": 5, "name": "Oftalmología" },
  { "id": 6, "name": "Otorrrinolaringología" },
  { "id": 7, "name": "Pediatría" },
  { "id": 8, "name": "Psiquiatría" },
  { "id": 9, "name": "Reumatología" },
  { "id": 10, "name": "Cirugía General" },
  { "id": 11, "name": "Medicina Interna" },
  { "id": 12, "name": "Endocrinología" },
  { "id": 13, "name": "Ginecología" },
  { "id": 14, "name": "Urología" },
  { "id": 15, "name": "Oncología" },
  { "id": 16, "name": "Neumología" },
  { "id": 17, "name": "Traumatología" },
  { "id": 18, "name": "Cirugía Plástica" },
  { "id": 19, "name": "Medicina de Urgencias" },
  { "id": 20, "name": "Patología" }
]

type DoctorData = {
  firstName: string;
  lastName: string;
  birthDate: string;
  documentation: number;
  gender: string;
  email: string;
  specialty: string;
  license: number;
};

type Error = {
  firstname: string;
  lastname: string;
  birthdate: string;
  documentation: string;
  gender: string;
  email: string;
  specialty: string;
  license: string;
};

const DoctorRegister = () => {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorServer, setErrorServer] = useState("");
  const [date,setDate] = useState('')

  const [doctor, setDoctor] = useState<DoctorData>({
    firstName: "",
    lastName: "",
    birthDate: "",
    documentation: 0,
    gender: "",
    email: "",
    specialty: "",
    license: 0,
  });

  const [error, setError] = useState({
    firstname: "",
    lastname: "",
    birthdate: "",
    documentation: "",
    gender: "",
    email: "",
    specialty: "",
    license: "",
  });

  useEffect(()=>{
    const today = new Date()
    const dateFormat = today.toISOString().split('T')[0]
    setDate(dateFormat)
  },[])

  const handleValidateForm = () => {
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors: Error = {
      firstname: "",
      lastname: "",
      birthdate: "",
      documentation: "",
      gender: "",
      email: "",
      specialty: "",
      license: "",
    };

    if (!doctor.firstName || !nameRegex.test(doctor.firstName)) {
      errors.firstname = "El campo nombre admite solo letras y espacio";
    } else {
      errors.firstname = "";
    }

    if (!doctor.lastName || !nameRegex.test(doctor.lastName)) {
      errors.lastname = "El campo apellido admite solo letras y espacio";
    } else {
      errors.lastname = "";
    }

    if (!doctor.birthDate) {
      errors.birthdate = "Campo obligatorio";
    } else {
      errors.birthdate = "";
    }

    const documentation = String(doctor.documentation);
    if (documentation === "0" || !documentation || documentation.length > 10) {
      errors.documentation =
        "El formato documento puede contener hasta 10 dígitos y es obligatorio";
    } else {
      errors.documentation = "";
    }

    if (doctor.gender !== "male" && doctor.gender !== "female") {
      errors.gender = "Campo obligatorio";
    } else {
      errors.gender = "";
    }

    if (!doctor.email || !emailRegex.test(doctor.email)) {
      errors.email = "El formato del correo electrónico no es válido";
    } else {
      errors.email = "";
    }

    if (!doctor.specialty) {
      errors.specialty = "El formato de especialidad no es válido";
    } else {
      errors.specialty = "";
    }

    const license = String(doctor.license);
    if (license === "0" || !license || license.length > 10) {
      errors.license =
        "El formato licencia puede contener hasta 10 dígitos y es obligatorio";
    } else {
      errors.license = "";
    }

    setError(errors);

    return Object.values(errors).every((msg) => msg === "");
  };

  const handleSubmit = async () => {
    const hasErrors = handleValidateForm();
    if (hasErrors) {
      try {
        const {
          firstName,
          lastName,
          birthDate,
          documentation,
          gender,
          email,
          license,
          specialty,
        } = doctor;
        const dataDoctor = {
          firstName,
          lastName,
          birthDate,
          documentation,
          gender,
          email,
          license,
          specialty,
        };

        setShowErrorModal(false);
        setShowSuccessModal(false);

        console.log(dataDoctor)

        const result = await axios.post(URLs.DOCTOR, dataDoctor);

        if (result.status === 201) {
          console.log("Médico agregado");
          setShowSuccessModal(true);
        } else {
          setShowErrorModal(true);
        }
      } catch (error) {
        console.log(error);
        const errorMsg = (error as any).response?.data?.error
        setErrorServer(errorMsg);
        setShowErrorModal(true);
      }
    } 
  };

  const handleChange =
    (input: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setDoctor({ ...doctor, [input]: e.target.value });
    };

  return (
    <>
      <div className="flex flex-col items-center min-h-screen">
        <Header/>
        {showErrorModal ? (
          <Modal
            type="error"
            title="¡Oops...!"
            content={errorServer}
            buttonText="Aceptar"
            icon={<RiErrorWarningFill />}
          />
        ) : (
          showSuccessModal && (
            <Modal
              type="success"
              title="¡Médico registrado!"
              content=""
              icon={<BsPersonCheck />}
              buttonText="Aceptar"
              linkClose="/admin/medicos"
            />
          )
        )}
        <h2 className="text-3xl mb-10 mt-10 font-bold text-zinc-700">Nuevo médico</h2>
        <form className="rounded-lg bg-zinc-50 border-2 border-zinc-300 px-10 pt-6 pb-8 w-[90%] sm:w-[80%] max-w-[500px] mb-4">
          <h4 className="text-lg font-semibold mb-5 text-zinc-800 text-center">
            INFORMACIÓN PERSONAL
          </h4>
          <div className="mb-4 flex flex-row gap-3">
            <div className="flex flex-col w-1/2">
              <label
                htmlFor="name"
                className="text-md mb-2 text-zinc-800 font-semibold"
              >
                Nombre/s
              </label>
              <input
                type="text"
                id="name"
                value={doctor.firstName}
                onChange={handleChange("firstName")}
                className={`px-3 py-2 text-sm w-full rounded-md focus:outline-none focus:ring-sky-500 ${
                  error
                    ? error.firstname
                      ? `border border-red-500 placeholder-red-500 focus:ring-red-600 text-red-600`
                      : `border border-sky-500`
                    : `border shadow-sm border-slate-300 placeholder-slate-400 
            focus:outline-none sm:text-sm focus:ring-1`
                }`}
              />
              {error.firstname && (
                <p className="text-sm text-red-500">{error.firstname}</p>
              )}
            </div>
            <div className="flex flex-col w-1/2">
              <label
                htmlFor="lastname"
                className="text-md mb-2 text-zinc-800 font-semibold"
              >
                Apellido/s
              </label>
              <input
                type="text"
                id="lastname"
                value={doctor.lastName}
                onChange={handleChange("lastName")}
                className={`px-3 py-2 text-sm w-full rounded-md focus:outline-none focus:ring-sky-500 ${
                  error
                    ? error.lastname
                      ? `border border-red-500 placeholder-red-500 focus:ring-red-600 text-red-600`
                      : `border border-sky-500`
                    : `border shadow-sm border-slate-300 placeholder-slate-400 
          focus:outline-none sm:text-sm focus:ring-1`
                }`}
              />
              {error.lastname && (
                <p className="text-sm text-red-500">{error.lastname}</p>
              )}
            </div>
          </div>
          <div className="mb-4 flex flex-col">
            <label
              htmlFor="birthdate"
              className="text-md mb-2 text-zinc-800 font-semibold"
            >
              Fecha de nacimiento
            </label>
            <input
              type="date"
              id="birthdate"
              value={doctor.birthDate}
              max={date}
              onChange={handleChange("birthDate")}
              className={`px-3 py-2 text-sm w-full rounded-md focus:outline-none focus:ring-sky-500 ${
                error
                  ? error.birthdate
                    ? `border border-red-500 placeholder-red-500 focus:ring-red-600 text-red-600`
                    : `border border-sky-500`
                  : `border shadow-sm border-slate-300 placeholder-slate-400 
          focus:outline-none sm:text-sm focus:ring-1`
              }`}
            />
            {error.birthdate && (
              <p className="text-sm text-red-500">{error.birthdate}</p>
            )}
          </div>
          <div className="mb-4 flex flex-col">
            <label
              htmlFor="documentation"
              className="text-md mb-2 text-zinc-800 font-semibold"
            >
              Documentación
            </label>
            <input
              type="number"
              id="documentation"
              value={doctor.documentation === 0 ? "" : doctor.documentation}
              onChange={handleChange("documentation")}
              className={`px-3 py-2 text-sm w-full rounded-md focus:outline-none focus:ring-sky-500 ${
                error
                  ? error.documentation
                    ? `border border-red-500 placeholder-red-500 focus:ring-red-600 text-red-600`
                    : `border border-sky-500`
                  : `border shadow-sm border-slate-300 placeholder-slate-400 
          focus:outline-none sm:text-sm focus:ring-1`
              }`}
            />
            {error.documentation && (
              <p className="text-sm text-red-500">{error.documentation}</p>
            )}
          </div>
          <div className="mb-4 flex flex-col">
            <label
              htmlFor="gender"
              className="text-md mb-2 text-zinc-800 font-semibold"
            >
              Género
            </label>
            <select
              id="gender"
              value={doctor.gender}
              onChange={handleChange("gender")}
              className={`px-3 py-2 text-sm w-full rounded-md focus:outline-none focus:ring-sky-500 ${
                error
                  ? error.gender
                    ? `border border-red-500 placeholder-red-500 focus:ring-red-600 text-red-600`
                    : `border border-sky-500`
                  : `border shadow-sm border-slate-300 placeholder-slate-400 
          focus:outline-none sm:text-sm focus:ring-1`
              }`}
            >
              <option value="">Seleccionar género</option>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
            </select>
            {error.gender && (
              <p className="text-sm text-red-500">{error.gender}</p>
            )}
          </div>

          <div className="mb-4 flex flex-col">
            <label
              htmlFor="email"
              className="text-md mb-2 text-zinc-800 font-semibold"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={doctor.email}
              onChange={handleChange("email")}
              className={`px-3 py-2 text-sm w-full rounded-md focus:outline-none focus:ring-sky-500 ${
                error
                  ? error.email
                    ? `border border-red-500 placeholder-red-500 focus:ring-red-600 text-red-600`
                    : `border border-sky-500`
                  : `border shadow-sm border-slate-300 placeholder-slate-400 
          focus:outline-none sm:text-sm focus:ring-1`
              }`}
            />
            {error.email && (
              <p className="text-sm text-red-500">{error.email}</p>
            )}
          </div>
          <div className="mb-4 flex flex-col">
            <label
              htmlFor="license"
              className="text-md mb-2 text-zinc-800 font-semibold"
            >
              Número de licencia
            </label>
            <input
              type="number"
              id="license"
              value={doctor.license === 0 ? '' : doctor.license }
              onChange={handleChange("license")}
              className={`px-3 py-2 text-sm w-full rounded-md focus:outline-none focus:ring-sky-500 ${
                error
                  ? error.license
                    ? `border border-red-500 placeholder-red-500 focus:ring-red-600 text-red-600`
                    : `border border-sky-500`
                  : `border shadow-sm border-slate-300 placeholder-slate-400 
          focus:outline-none sm:text-sm focus:ring-1`
              }`}
            />
            {error.license && (
              <p className="text-sm text-red-500">{error.license}</p>
            )}
          </div>
          <div className="mb-7 flex flex-col">
            <label
              htmlFor="specialty"
              className="text-md mb-2 text-zinc-800 font-semibold"
            >
              Especialidad
            </label>
            <select
          id="healthInsurance"
          value={doctor.specialty}
          onChange={handleChange("specialty")}
          className={`px-3 py-2 text-sm w-full rounded-md focus:ring-sky-500 border border-slate-300 shadow-sm placeholder-slate-400 focus:outline-none sm:text-sm focus:ring-1`}
        >
          <option value="">Seleccione una especialidad</option>
          {specialtys.map((specialty) => (
            <option key={specialty.id} value={specialty.name}>
              {specialty.name}
            </option>
          ))}
        </select>
          </div>

          <Button color="type-1" onClick={handleSubmit}>
            Registrar médico
          </Button>
        </form>
        <Footer/>
      </div>
    </>
  );
};

export default DoctorRegister;
