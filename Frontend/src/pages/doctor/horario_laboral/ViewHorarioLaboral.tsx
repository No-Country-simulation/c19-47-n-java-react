import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { URLs } from "../../../config";

type WorkSchedules = {
  shiftsPerDay: number;
  day: string;
  doctor: {
    id_doctor: number;
  };
};

const ViewHorarioLaboral = () => {
  const [horarios, setHorarios] = useState<WorkSchedules[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getWorkSchedules = async () => {
      try {
        const response = await axios.get(URLs.DOCTOR_WORK_SCHEDULES);
        setHorarios(response.data);
      } catch (error) {
        console.log(error);
        setError("Error al obtener horarios laborales. Inténtelo nuevamente.");
      }
    };
    getWorkSchedules();
  }, []);

  const calculateTotalShifts = () => {
    let totalShifts = 0;
    horarios.forEach((horario) => {
      totalShifts += horario.shiftsPerDay;
    });
    return totalShifts;
  };

  const diasOrdenados = [
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
    "domingo",
  ];
  horarios.sort((a, b) => {
    const dayA = a.day.toLowerCase();
    const dayB = b.day.toLowerCase();
    return diasOrdenados.indexOf(dayA) - diasOrdenados.indexOf(dayB);
  });

  return (
    <div className="w-full h-screen flex flex-col items-center bg-slate-300">
      <Header />
      <div className="w-full lg:max-w-[900px] flex flex-col gap-2 md:flex-row justify-between p-7">
        <h2 className="font-bold text-gray-700 text-3xl">Horarios laborales</h2>
        <Link to="/medicos/nuevo-horario">
          <Button color="type-1">Nuevo horario</Button>
        </Link>
      </div>
      <div className="w-full flex justify-center mt-2 mb-2 bg-slate-300">
        <div className="lg:w-[500px]">
          <table className="w-full bg-white rounded-lg divide-y divide-gray-300">
            <thead>
              <tr className="text-gray-700 font-bold text-sm">
                <th className="border border-b-gray-400 p-3 w-1/2 text-start">
                  Días de trabajo
                </th>
                <th className="text-start border border-b-gray-400 p-3 w-1/4">
                  Cantidad de turnos disponibles por día
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {error ? (
                <tr>
                  <td
                    className="border border-gray-100 p-3 text-red-500"
                    colSpan={2}
                  >
                    {error}
                  </td>
                </tr>
              ) : (
                horarios.map((horario, index) => (
                  <React.Fragment key={index}>
                    <tr
                      key={index}
                      className="hover:bg-blue-300 hover:text-gray-800"
                    >
                      <td className="border border-r-gray-200 p-3">
                        {horario.day.charAt(0).toUpperCase() +
                          horario.day.slice(1)}
                      </td>

                      <td className="text-end border border-gray-200 p-3">
                        {horario.shiftsPerDay}
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              )}
              <tr className="bg-gray-100 text-gray-700 font-bold text-sm">
                <td className="text-start border border-b-gray-400 p-3">
                  Total de turnos disponibles por semana
                </td>
                <td className="text-end border border-b-gray-400 p-3">
                  {calculateTotalShifts()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewHorarioLaboral;
