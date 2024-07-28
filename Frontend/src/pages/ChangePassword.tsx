import React, { useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    currentPasswordEmpty: "",
    newPasswordEmpty: "",
    newConfirmPasswordEmpty: "",
    matchPasswords: ""
  });

  const validateForm = () => {

    const hasErrors = {
      currentPasswordEmpty:"",
      newPasswordEmpty:"",
      newConfirmPasswordEmpty:"",
      matchPasswords:""
    }

    if (newPassword !== newConfirmPassword){
      hasErrors.matchPasswords="Las contraseñas no coinciden"
    }

    if (currentPassword.trim()===""){
      hasErrors.currentPasswordEmpty="La contraseña actual es obligatoria"
    }

    if (newPassword.trim()===""){
      hasErrors.newPasswordEmpty="La nueva contraseña es obligatoria"
    }

    if (newConfirmPassword.trim()===""){
      hasErrors.newConfirmPasswordEmpty="La confirmación de la nueva contraseña es obligatoria"
    }

    setErrors(hasErrors)
    //Validar si las nuevas son iguales, manejar estados de error para compronar que todos esten llenos y si son distintos tambien
  }

  const handleSubmitForm = (e:React.FormEvent) => {
    e.preventDefault()
    validateForm()
  }

  return (
    <div className="w-full h-full flex flex-col items-center bg-slate-50">
      <Header />
      <div className="w-5/6 md:w-1/2 flex flex-col justify-center items-center sm:max-w-[500px] p-4 mt-24 bg-slate-300 rounded-lg">
        <h2 className="text-2xl font-bold mb-3 text-blue-950">
          Actualiza tu contraseña
        </h2>
        <p className="mb-3 text-blue-950 text-center">
          Introduce tu contraseña actual y una nueva contraseña.
        </p>
        <form className="flex flex-col items-center w-full bg-slate-200 rounded-lg p-4 gap-6" onSubmit={handleSubmitForm}>
          <div className="flex flex-col text-start w-full gap-2">
            <label className="text-xs font-bold text-gray-700"  htmlFor="currentPassword">
              CONTRASEÑA ACTUAL
            </label>
            <input
              type="password"
              id="currentPassword"
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={`bg-slate-50 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-700 ${errors.currentPasswordEmpty && 'border border-red-500'}`}
            />
            {errors.currentPasswordEmpty && <p className="text-sm text-red-500">{errors.currentPasswordEmpty}</p>}
          </div>
          <div className="flex flex-col text-start w-full gap-2">
            <label className="text-xs font-bold text-gray-700" htmlFor="newPassword">
              NUEVA CONTRASEÑA
            </label>
            <input
              type="password"
              id="newPassword"
              onChange={(e) => setNewPassword(e.target.value)}
              className={`bg-slate-50 px-4 py-2 rounded-lg focus:outline-none focus:ring-sky-700 ${errors.newPasswordEmpty && 'border border-red-500'} ${errors.matchPasswords && 'border border-red-500'}`}
            />
            {errors.newPasswordEmpty && <p className="text-sm text-red-500">{errors.newPasswordEmpty}</p>}
          </div>
          <div className="flex flex-col text-start w-full gap-2">
            <label className="text-xs font-bold text-gray-700" htmlFor="confirmNewPassword">
              CONFIRMAR NUEVA CONTRASEÑA
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              onChange={(e) => setNewConfirmPassword(e.target.value)}
              className={`bg-slate-50 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-700 ${errors.newConfirmPasswordEmpty && 'border border-red-500'}${errors.matchPasswords && 'border border-red-500'}`}
            />
            {errors.newConfirmPasswordEmpty && <p className="text-sm text-red-500">{errors.newConfirmPasswordEmpty}</p>}
            {errors.matchPasswords && <p className="text-sm text-red-500">{errors.matchPasswords}</p>}
          </div>

          <Button color="type-1" type="submit">Confirmar</Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
