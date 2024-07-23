import { ReactNode } from 'react'

type ButtonProps = {
    children: ReactNode,
    color: "type-1" | "type-2" | "type-3" | "type-4"
    type?: "submit" | "button"
    onClick?: () => void
}

const Button = ({children, color = "type-1", type = "button", onClick}:ButtonProps) => {

    const classTypes = {
        'type-1': {
            style: 'bg-sky-700 border border-solid border-sky-700 text-white rounded-md hover:bg-sky-900'
        },
        'type-2': {
            style: 'bg-blue-100 border border-solid border-sky-800 text-sky-800 rounded-md hover:bg-sky-900 hover:text-white p-6'
        },
        'type-3': {
            style: 'border border-solid border-sky-800 text-sky-800 rounded-md hover:bg-sky-900 hover:text-white'
        },
        'type-4': {
            style: 'bg-sky-600 border border-solid text-white rounded-md hover:bg-sky-900 hover:text-white p-6'
        },
        //Definir mas styles
    }


  return (
    <div className='flex flex-col w-full'>
        <button onClick={onClick} className={`flex justify-center items-center h-10 text-base p-2 ${classTypes[color].style}`} type={type}>{children}</button>
    </div>
  )
}

export default Button