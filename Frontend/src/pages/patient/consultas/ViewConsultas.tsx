import { useState } from 'react'
import Header from '../../../components/Header'
import Button from '../../../components/Button'
import { Link } from 'react-router-dom'

type Consultation = () => {
    day: string,
    motive: string,
    doctorId: number,
    patientId: number
}


const ViewConsultas = () => {

    const [consultas,setConsultas] = useState<any>([])

  return (
    <div className="w-full h-full flex flex-col lg:items-center bg-slate-300">
    <Header />
    <div className="w-full lg:max-w-[900px] flex flex-col md:flex-row gap-5 justify-between p-3 lg:p-0 lg:m-7">
      <h2 className="font-bold text-gray-700 text-2xl md:text-3xl pt-3 pl-3">
        Consultas programadas
      </h2>
      <Link to="/pacientes/programar-consulta">
          <Button color="type-4">Programar consulta</Button>
        </Link>
    </div>
   
        {consultas ? (
            <div className='w-full flex items-center justify-center mt-10'>
              <h2 className='text-center bg-yellow-100 border border-orange-300 rounded-lg text-orange-600 w-4/5 md:w-1/2 max-w-96 h-10 flex items-center justify-center py-5'>Aún no hay consultas programadas.</h2>
            </div>
        ):(
            ""
        )}
    </div>
  )
}

export default ViewConsultas