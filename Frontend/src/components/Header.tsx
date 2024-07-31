import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { RiMentalHealthFill } from "react-icons/ri";
import { useAuth } from "../context/AuthProvider";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getHomeLink = () => {
    switch (user?.role) {
      case "ADMIN":
        return "/admin/home";
      case "PATIENT":
        return "/pacientes/home";
      case "DOCTOR":
        return "/medicos/home";
      default:
        return "/login";
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full bg-white">
      <div className="bg-white w-full h-10 px-3 py-7 border border-b-slate-200 flex items-center justify-center">
        <div className="w-[1000px] flex items-center justify-between">
          <Link to={getHomeLink()}>
            <div className="flex items-center">
              <RiMentalHealthFill className="text-5xl text-blue-950" />
              <h1 className="text-blue-950 text-lg">
                Health<strong>Tech</strong>
              </h1>
            </div>
          </Link>
          <button
            className="text-sky-950 block md:hidden text-3xl "
            onClick={toggleMenu}
          >
            {isOpen ? <IoClose/> : <IoMenu />}
          </button>
          <div className="hidden md:flex items-center gap-7 text-gray-500">
          {user?.role === "ADMIN" && (
          <>
            <Link to="/admin/home" className="hover:text-sky-950">Inicio</Link>
            <Link to="/admin/pacientes" className="hover:text-sky-950">Pacientes</Link>
            <Link to="/admin/medicos" className="hover:text-sky-950">Médicos</Link>
          </>
        )}
        {user?.role === "PATIENT" && (
          <>
            <Link to="/pacientes/home" className="hover:text-sky-950">Inicio</Link>
            <Link to="/pacientes/perfil" className="hover:text-sky-950">Perfil</Link>
            <Link to="/pacientes/consultas" className="hover:text-sky-950">Consultas</Link>
          </>
        )}
        {user?.role === "DOCTOR" && (
          <>
            <Link to="/medicos/home" className="hover:text-sky-950">Inicio</Link>
            <Link to="/medicos/perfil" className="hover:text-sky-950">Perfil</Link>
            <Link to="/medicos/horarios-laborales" className="hover:text-sky-950">Horarios laborales</Link>
            <Link to="/medicos/consultas-programadas" className="hover:text-sky-950">Consultas</Link>
            <Link to="/medicos/historiales-clinicos" className="hover:text-sky-950">Historiales clínicos</Link>
          </>
        )}

            <Button color="type-3" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </div>
        </div>
      </div>
      <div
        className={`bg-white w-full p-6 flex flex-col md:hidden fixed items-start gap-7 ${
          isOpen ? "block" : "hidden"
        } border border-b-8 border-slate-300 text-gray-500 `}
      >
        {user?.role === "ADMIN" && (
          <>
            <Link to="/admin/home" className="hover:text-sky-950">Inicio</Link>
            <Link to="/admin/pacientes" className="hover:text-sky-950">Pacientes</Link>
            <Link to="/admin/medicos" className="hover:text-sky-950">Médicos</Link>
          </>
        )}
        {user?.role === "PATIENT" && (
          <>
            <Link to="/pacientes/home" className="hover:text-sky-950">Inicio</Link>
            <Link to="/pacientes/perfil" className="hover:text-sky-950">Perfil</Link>
            <Link to="/pacientes/consultas" className="hover:text-sky-950">Consultas</Link>
          </>
        )}
        {user?.role === "DOCTOR" && (
          <>
            <Link to="/medicos/home" className="hover:text-sky-950">Inicio</Link>
            <Link to="/medicos/perfil" className="hover:text-sky-950">Perfil</Link>
            <Link to="/medicos/horarios-laborales" className="hover:text-sky-950">Horarios laborales</Link>
            <Link to="/medicos/consultas-programadas" className="hover:text-sky-950">Consultas</Link>
            <Link to="/medicos/historiales-clinicos" className="hover:text-sky-950">Historiales clínicos</Link>
          </>
        )}

        <Button color="type-3" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>
    </nav>
  );
};

export default Header;
