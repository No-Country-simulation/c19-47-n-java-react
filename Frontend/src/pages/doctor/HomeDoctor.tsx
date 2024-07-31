import React from 'react'
import Header from '../../components/Header'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import { useAuth } from '../../context/AuthProvider'
import Footer from '../../components/Footer'

const HomeDoctor = () => {
  const {getDoctor} = useAuth()
  const doctor = getDoctor()

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Header />
      <div className="flex flex-col w-full h-full items-center sm:w-3/5 sm:max-w-[500px] p-6 mt-24">
        <h2 className="text-3xl font-bold">Hola {doctor?.gender === "female" ? "Dra." : "Dr."} {doctor?.firstName+" "+doctor?.lastName},</h2>
        <p className="text-xl font-normal">¿qué deseas hacer hoy?</p>
        <div className="flex flex-col justify-evenly h-[50%] w-80">
          <Link to="/medicos/perfil">
            <Button color="type-4">Ver perfil</Button>
          </Link>
          <Link to="/medicos/horarios-laborales">
            <Button color="type-4">Ver horarios laborales</Button>
          </Link>
          <Link to="/medicos/consultas-programadas">
            <Button color="type-4">Ver consultas programadas</Button>
          </Link>
          <Link to="/medicos/historiales-clinicos">
            <Button color="type-4">Ver historiales clínicos</Button>
          </Link>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default HomeDoctor