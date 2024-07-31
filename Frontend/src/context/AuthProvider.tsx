import axios from "axios";
import React, { useState, useContext, createContext, ReactNode } from "react";
import { URLs } from "../config";

interface BaseUser {
  id: number;
  role: string;
  gender: string
}

interface Patient extends BaseUser {
  firstName: string;
  lastName: string;
  birthDate: string;
  documentation: string;
  email: string;
  medicalInsurance: string;
}

interface Doctor extends BaseUser {
  firstName: string;
  lastName: string;
  birthDate: string;
  documentation: string;
  specialty: string;
  email: string;
  license: string;
}

type User = Patient | Doctor | BaseUser;

interface AuthContextType {
  user: User | null;
  login: (credentials: { id: number; role: string }) => void;
  logout: () => void;
  getAdmin: () => BaseUser | null;
  getDoctor: () => Doctor | null;
  getPatient: () => Patient | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);

  const login = async (credentials: { id: number; role: string }) => {
    try {
      let foundUser;
      switch (credentials.role) {
        case "ADMIN":
          setUser({
            id: credentials.id,
            role: credentials.role,
            gender: ''
          });
          break;

        case "DOCTOR":
          const doctorResponse = await axios.get(URLs.DOCTOR);
          foundUser = doctorResponse.data.find(
            (u: any) => u.idDoctor === credentials.id
          );

          if (foundUser) {
            setUser({
              id: credentials.id,
              role: credentials.role,
              firstName: foundUser.firstName,
              lastName: foundUser.lastName,
              birthDate: foundUser.birthDate,
              documentation: foundUser.documentation,
              gender: foundUser.gender,
              specialty: foundUser.specialty,
              email: foundUser.email,
              license: foundUser.license,
            });
          }
          break;

        case "PATIENT":
          const patientResponse = await axios.get(URLs.GET_PATIENT);
          foundUser = patientResponse.data.find(
            (p: any) => p.idPaciente === credentials.id
          );
          if (foundUser) {
            setUser({
              id: credentials.id,
              role: credentials.role,
              firstName: foundUser.firstName,
              lastName: foundUser.lastName,
              gender: foundUser.gender,
              birthDate: foundUser.birthDate,
              documentation: foundUser.documentation,
              email: foundUser.email,
              medicalInsurance: foundUser.medicalInsurance,
            });
          }
          break;

        default:
          throw new Error("Rol no reconocido");
      }

    } catch (error) {
      console.error("Error de autenticación:", error);
      setUser(null);
    }
  };

  const logout = () => {
    setUser(null);
  };
  
  const getAdmin = (): BaseUser | null => {
    return user && user.role === "ADMIN" ? (user as BaseUser) : null;
  };
  const getDoctor = (): Doctor | null => {
    return user && user.role === "DOCTOR" ? (user as Doctor) : null;
  };
  
  const getPatient = (): Patient | null => {
    return user && user.role === "PATIENT" ? (user as Patient) : null;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getAdmin, getDoctor, getPatient }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context
}