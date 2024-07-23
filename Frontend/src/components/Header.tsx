import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Button from "./Button";
import { RiMentalHealthFill } from "react-icons/ri";

const Header = () => {
  return (
    <div className="w-full bg-white">
      <div className="bg-white w-full h-10 px-3 py-7 border border-b-slate-200 flex items-center justify-center">
        <div className="w-[1000px] flex items-center justify-between">
          <Link to="/admin/home">
            <div className="flex items-center">
              <RiMentalHealthFill className="text-5xl text-blue-950" />
              <h1 className="text-blue-950">
                Health<strong>Tech</strong>
              </h1>
            </div>
          </Link>
          <div className="w-28">
            <Button color="type-3">Cerrar sesión</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
