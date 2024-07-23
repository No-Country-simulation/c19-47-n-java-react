import React from "react";
import Button from "../../components/Button";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";

const HomeAdmin = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <Header />
      <div className="flex flex-col w-full h-full sm:w-3/5 sm:max-w-[500px] p-6 mt-24">
        <h2 className="text-3xl font-bold">Hola Administrador,</h2>
        <p className="text-xl font-normal">¿qué deseas hacer hoy?</p>

        <div className="flex flex-col justify-evenly h-[30%]">
          <Link to="/admin/pacientes">
            <Button color="type-2">Pacientes</Button>
          </Link>
          <Link to="/admin/medicos">
            <Button color="type-2">Médicos</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
