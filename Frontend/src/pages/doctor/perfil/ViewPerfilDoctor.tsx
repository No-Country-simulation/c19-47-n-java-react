import Header from "../../../components/Header";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import Footer from "../../../components/Footer";

const ViewPerfilDoctor = () => {

  const {getDoctor} = useAuth()
  const doctor = getDoctor()


  return (
    <div className="w-full h-full flex flex-col items-center bg-white">
      <Header />
      <div className="w-5/6 md:w-1/2 flex flex-col justify-center items-center sm:max-w-[500px] p-4 mt-10 bg-slate-300 rounded-lg">
      <h2 className="text-2xl font-bold mb-3 text-blue-950">Mi perfil</h2>
        <div className="flex flex-col items-center w-full bg-slate-200 rounded-lg p-4 gap-6">
          <div className="flex flex-col text-start w-full">
            <label className="text-xs font-bold text-gray-700">
              NOMBRE COMPLETO
            </label>
            <input
              type="text"
              value={doctor?.firstName+" "+doctor?.lastName}
              disabled
              className="bg-slate-200"
            />
          </div>
          <div className="flex flex-col text-start w-full">
            <label className="text-xs font-bold text-gray-700">
              FECHA DE NACIMIENTO
            </label>
            <input
              type="text"
              value={`${doctor?.birthDate.split('-')[2]}-${doctor?.birthDate.split('-')[1]}-${doctor?.birthDate.split('-')[0]}`}
              disabled
              className="bg-slate-200"
            />
          </div>
          <div className="flex flex-col text-start w-full">
            <label className="text-xs font-bold text-gray-700">CORREO</label>
            <input
              type="text"
              value={doctor?.email}
              disabled
              className="bg-slate-200"
            />
          </div>
          <div className="flex flex-col text-start w-full">
            <label className="text-xs font-bold text-gray-700">
              DOCUMENTACIÓN
            </label>
            <input
              type="text"
              value={doctor?.documentation}
              disabled
              className="bg-slate-200"
            />
          </div>
          <div className="flex flex-col text-start w-full">
            <label className="text-xs font-bold text-gray-700">
              LICENCIA
            </label>
            <input
              type="text"
              value={doctor?.license}
              disabled
              className="bg-slate-200"
            />
          </div>
          <div className="flex flex-col text-start w-full">
            <label className="text-xs font-bold text-gray-700">
              ESPECIALIDAD
            </label>
            <input
              type="text"
              value={doctor?.specialty}
              disabled
              className="bg-slate-200"
            />
          </div>
          <Link to="cambiar-contraseña">
            <Button color="type-1">Cambiar contraseña</Button>
          </Link>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ViewPerfilDoctor;
