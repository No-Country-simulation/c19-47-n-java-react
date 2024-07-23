import React from 'react'
import { VscArrowLeft } from "react-icons/vsc";

const ButtonBack = () => {
  return (
    <div>
        <button className='bg-white p-3 rounded-full'>
            <VscArrowLeft color='#0369a1' size="1.2rem"/>
        </button>
    </div>
  )
}

export default ButtonBack