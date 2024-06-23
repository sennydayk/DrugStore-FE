import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string, userEmail: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!sessionStorage.getItem("token")
  );

  const login = (token: string, userEmail: string) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("myId", userEmail);
    setIsLoggedIn(true);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("myId");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
