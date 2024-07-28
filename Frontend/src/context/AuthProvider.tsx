import React, { useState, useContext, createContext, ReactNode } from "react";

interface AuthContextType {
  user: {id:number, role:string} | null
  login: (credentials: { id: number; role: string }) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthContextType['user']>(null)

  const login = async (credentials: { id: number; role: string }) => {
    try {
      setUser(credentials);
    } catch (error) {
      throw new Error("Error de autenticación");
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context
}
