import React, { useEffect, useState } from "react"
import Button from "../../../../components/Button"

type RegisterProps = {
  nextStep: () => void
  handleChange: (
    field: string,
    dataType: "patient" | "medical"
  ) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  values: PatientData
}

type PatientData = {
  firstName: string
  lastName: string
  birthDate: string
  documentation: number
  gender: string
  email: string
  medicalInsurance: string
}

type Error = {
  name: string
  lastname: string
  birthdate: string
  documentation: string
  gender: string
  email: string
}

const PatientInfo = ({
  nextStep,
  handleChange,
  values,
}: RegisterProps) => {
  const [date,setDate] = useState('')
  const [error, setError] = useState<Error>({
    name: "",
    lastname: "",
    birthdate: "",
    documentation: "",
    gender: "",
    email: "",
  })

  useEffect(()=>{
    const today = new Date()
    const dateFormat = today.toISOString().split('T')[0]
    setDate(dateFormat)
  },[])

  const handleValidateForm = () => {
    const nameRegex =  /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const errors: Error = {
      name: "",
      lastname: "",
      birthdate: "",
      documentation: "",
      gender: "",
      email: "",
    }

    if (!values.firstName || !nameRegex.test(values.firstName)) {
      errors.name = "El campo nombre admite solo letras y espacio"
    } else {
      errors.name = ""
    }

    if (!values.lastName || !nameRegex.test(values.lastName)) {
      errors.lastname = "El campo apellido admite solo letras y espacio"
    } else {
      errors.lastname = ""
    }

    if (!values.birthDate) {
      errors.birthdate = "Campo obligatorio"
    } else {
      errors.birthdate = ""
    }

    const documentation = String(values.documentation)
    if (documentation === "0" || !documentation || documentation.length > 10) {
      errors.documentation =
        "El formato documento puede contener hasta 10 dígitos y es obligatorio"
    } else {
      errors.documentation = ""
    }

    if (values.gender !== "male" && values.gender !== "female") {
      errors.gender = "Campo obligatorio"
    } else {
      errors.gender = ""
    }

    if (!values.email || !emailRegex.test(values.email)) {
      errors.email = "El formato del correo electrónico no es válido"
    } else {
      errors.email = ""
    }

    setError(errors)

    return Object.values(errors).every((msg) => msg === "")
  }

  const handleSubmit = () => {
    const hasErrors = handleValidateForm()

    if (hasErrors) {
      nextStep()
    } else {
      console.error(hasErrors)
    }
    
  }

  return (
    <form className="rounded-lg bg-zinc-50 border-2 border-zinc-300 px-10 pt-6 pb-8 w-[90%] sm:w-[80%] max-w-[500px]">
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
            value={values.firstName}
            onChange={handleChange("firstName", "patient")}
            className={`px-3 py-2 text-sm w-full rounded-md focus:outline-none focus:ring-sky-500 ${
              error
                ? error.name
                  ? `border border-red-500 placeholder-red-500 focus:ring-red-600 text-red-600`
                  : `border border-sky-500`
                : `border shadow-sm border-slate-300 placeholder-slate-400 
            focus:outline-none sm:text-sm focus:ring-1`
            }`}
          />
          {error.name && <p className="text-sm text-red-500">{error.name}</p>}
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
            value={values.lastName}
            onChange={handleChange("lastName", "patient")}
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
          max={date}
          value={values.birthDate}
          onChange={handleChange("birthDate", "patient")}
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
          value={values.documentation === 0 ? "" : values.documentation}
          onChange={handleChange("documentation", "patient")}
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
          value={values.gender}
          onChange={handleChange("gender", "patient")}
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
        {error.gender && <p className="text-sm text-red-500">{error.gender}</p>}
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
          value={values.email}
          onChange={handleChange("email", "patient")}
          className={`px-3 py-2 text-sm w-full rounded-md focus:outline-none focus:ring-sky-500 ${
            error
              ? error.email
                ? `border border-red-500 placeholder-red-500 focus:ring-red-600 text-red-600`
                : `border border-sky-500`
              : `border shadow-sm border-slate-300 placeholder-slate-400 
          focus:outline-none sm:text-sm focus:ring-1`
          }`}
        />
        {error.email && <p className="text-sm text-red-500">{error.email}</p>}
      </div>
      <div className="mb-7 flex flex-col">
        <label
          htmlFor="healthInsurance"
          className="text-md mb-2 text-zinc-800 font-semibold"
        >
          Seguro médico (opcional)
        </label>
        <select
          id="healthInsurance"
          value={values.medicalInsurance}
          onChange={handleChange("medicalInsurance", "patient")}
          className={`px-3 py-2 text-sm w-full rounded-md  focus:ring-sky-500 border border-slate-300 shadow-sm  placeholder-slate-400 focus:outline-none sm:text-sm focus:ring-1
          `}
        >
          <option value="">Seleccione un seguro médico</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </div>
      <Button color="type-1" onClick={handleSubmit}>
        Continuar
      </Button>
    </form>
  )
}

export default PatientInfo
