import { useState, FormEvent } from "react";
import Button from "../components/Button";
import { TbEyeClosed } from "react-icons/tb";
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { URLs } from "../config.tsx";
import axios from "axios";
import { useAuth } from "../context/AuthProvider.tsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = { email, password }

    if (!email || !password) {
      setError("El campo correo y contraseña son obligatorios.")
      return
    }

    try {
      const resultUser = await axios.post(URLs.LOG_IN, data)
      const { id, role } = resultUser.data

      await login({ id, role })

      if (resultUser.status === 200) {
        switch (role) {
          case "ADMIN":
            navigate("/admin/home")
            break
          case "DOCTOR":
            navigate("/medicos/home")
            break
          case "PATIENT":
            navigate("/pacientes/home")
            break
          default:
            setError("Error: rol no reconocido")
        }
      } else {
        setError("Credenciales incorrectas. Inténtelo nuevamente.")
      }
    } catch (error : any) {
      let defaultError = "Error al iniciar sesión. Inténtelo nuevamente."
      if (error?.response?.data === "Invalid password"){
        defaultError = "La contraseña no es correcta. Compruébala."
      }
      console.error("Error al iniciar sesión:", error)
      setError(defaultError)
    }
  }

  return (
    <div className="flex flex-col w-full h-full bg-blue-300">
      <div className="flex flex-col justify-evenly w-full h-[40%] sm:h-[30%] px-10">
        <div className="sm:flex sm:flex-col sm:text-center text-sm w-full">
          <div className="flex flex-col justify-center h-50 sm:h-36 mb-6">
            <div className="mb-6 sm:m-10 flex justify-center text-center">
              <p
                className={`w-full sm:w-3/5 max-w-[500px] text-red-800 bg-red-100 border border-red-600 p-2 rounded-md font-bold ${
                  error ? `` : `invisible`
                }`}
              >
                {error ? error : ""}
              </p>
            </div>
            <h2 className="text-zinc-900 font-bold text-3xl sm:text-5xl sm:m-3">
              Bienvenido
            </h2>
            <p className="text-zinc-900 font-regular text-xl">
              Inicie sesión para continuar
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full h-[60%] sm:items-center sm:mt-6">
        <div className="bg-white rounded-t-xxl p-10 sm:w-[400px] sm:max-w-[400px] h-full sm:h-[320px] sm:rounded-xxl">
          <form action="" onSubmit={handleSubmit} method="post">
            <div className="flex flex-col mb-8">
              <label htmlFor="email" className="text-sm mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                placeholder="Ingrese su correo electrónico"
                className={`px-3 py-2 text-sm w-full rounded-md focus:outline-none focus:ring-sky-500 invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-600 disabled:shadow-none
                  ${
                    error
                      ? email
                        ? `border border-sky-500`
                        : `border border-red-500 placeholder-red-500 focus:ring-red-600`
                      : `border shadow-sm border-slate-300 placeholder-slate-400 
                  focus:outline-none sm:text-sm focus:ring-1 disabled:shadow-none`
                  }`}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-8 relative">
              <label htmlFor="password" className="text-sm mb-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={viewPassword ? "text" : "password"}
                  id="password"
                  placeholder="Ingrese su contraseña"
                  className={`px-3 py-2 text-sm w-full rounded-md focus:outline-none focus:ring-sky-500 invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-600 disabled:shadow-none
                    ${
                      error
                        ? password
                          ? `border border-sky-500`
                          : `border border-red-500 placeholder-red-500 focus:ring-red-600`
                        : `border shadow-sm border-slate-300 placeholder-slate-400 
                    focus:outline-none sm:text-sm focus:ring-1 disabled:shadow-none`
                    }`}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute flex items-center top-0 right-0 px-3 py-3">
                  {viewPassword ? (
                    <p
                      className="cursor-pointer"
                      onClick={() => setViewPassword(!viewPassword)}
                    >
                      <FaRegEye />
                    </p>
                  ) : (
                    <p
                      className="cursor-pointer"
                      onClick={() => setViewPassword(!viewPassword)}
                    >
                      <TbEyeClosed />
                    </p>
                  )}
                </div>
              </div>
            </div>
            <Button color="type-1" type="submit">
              Ingresar
            </Button>
            {/* Próxima mejora 
            <div className="w-full mt-5 text-center">
              <a
                className="text-sky-800 text-sm underline underline-offset-2"
                href="#"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
