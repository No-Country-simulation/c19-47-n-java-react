import Header from '../../components/Header'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'

const HomePatient = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <Header />
      <div className="flex flex-col w-full h-full items-center sm:w-3/5 sm:max-w-[500px] p-6 mt-24">
        <h2 className="text-3xl font-bold">Hola Test Test,</h2>
        <p className="text-xl font-normal">¿qué deseas hacer hoy?</p>
        <div className="flex flex-col justify-evenly h-[40%] w-80">
          <Link to="/pacientes/perfil">
            <Button color="type-4">Ver perfil</Button>
          </Link>
          <Link to="/pacientes/programar-consulta">
            <Button color="type-4">Programar una consulta</Button>
          </Link>
          <Link to="/pacientes/consultas">
            <Button color="type-4">Ver consultas programadas</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePatient