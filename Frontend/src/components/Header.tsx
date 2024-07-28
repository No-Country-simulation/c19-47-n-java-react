import React from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { RiMentalHealthFill } from "react-icons/ri";
import { useAuth } from "../context/AuthProvider";

const Header = () => {
  const {user,logout} = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const getHomeLink = () => {
    switch (user?.role){
      case 'ADMIN' : return '/admin/home'
      case 'PATIENT' : return '/pacientes/home'
      case 'DOCTOR': return '/medicos/home'
      default: return '/login'
    }
  }

  return (
    <div className="w-full bg-white">
      <div className="bg-white w-full h-10 px-3 py-7 border border-b-slate-200 flex items-center justify-center">
        <div className="w-[1000px] flex items-center justify-between">
          <Link to={getHomeLink()}>
            <div className="flex items-center">
              <RiMentalHealthFill className="text-5xl text-blue-950" />
              <h1 className="text-blue-950">
                Health<strong>Tech</strong>
              </h1>
            </div>
          </Link>
          <div className="w-28">
            <Button color="type-3" onClick={handleLogout}>Cerrar sesión</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
