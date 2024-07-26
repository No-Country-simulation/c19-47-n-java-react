import React, { ReactNode, useState } from "react";
import Button from "./Button";
import { IoCloseOutline } from "react-icons/io5";
import { BsPersonCheck } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

type ModalProps = {
  type: "success" | "error" | "warning" | "info";
  icon?: ReactNode;
  title: string;
  content: string;
  buttonText: string;
  linkClose?: string;
};

const Modal = ({
  type = "success",
  icon = <BsPersonCheck />,
  title = "Title",
  content = "Content",
  buttonText = "",
  linkClose = "",
}: ModalProps) => {
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  const classTypes = {
    success: "text-green-600",
    error: "text-red-600",
    warning: "",
    info: "",
  };

  const handleClose = () => {
    setShowModal(false)
    linkClose ? navigate(linkClose) : null
  }

  return showModal ? (
    <div className="h-screen w-screen bg-slate-900 bg-opacity-70 fixed inset-0 flex justify-center items-center">
      <div className="bg-white flex flex-col rounded-lg p-8 w-4/5 sm:max-w-[500px] ">
        <div className="flex justify-end">
          <IoCloseOutline
            size="1.5rem"
            className="cursor-pointer text-slate-900"
            onClick={handleClose}
          />
        </div>
        <div className="flex flex-col items-center text-center mt-4">
          <i className={`text-6xl sm:text-7xl mb-3 ${classTypes[type]}`}>
            {icon}
          </i>
          <h2 className={`text-xl sm:text-2xl font-bold ${classTypes[type]}`}>
            {title}
          </h2>
        </div>
        <div className="flex flex-col flex-grow justify-between items-center">
          <p className="text-base m-3 text-slate-800">{content}</p>
          <div className="flex gap-3 mb-3">
            <Button color="type-3" onClick={handleClose}>
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Modal;
