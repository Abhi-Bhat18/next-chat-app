"use client";
import React, { createContext, ReactNode, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/navigation";

interface UserInterface {
  id: string;
  email: string;
  iat: number;
  exp: number;
  name?: string;
}

interface AuthInterface {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
  user: UserInterface | null;
}

const initialState: AuthInterface = {
  loggedIn: false,
  setLoggedIn: () => {},
  logout: () => {},
  user: null,
};

export const AuthContext = createContext<AuthInterface>(initialState);

interface ReactProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<ReactProps> = ({ children }) => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const logout = () => {
    localStorage.removeItem("token");
  };

  const [user, setUser] = useState<UserInterface | null>(null);
  const checkLogin = () => {
    const token = localStorage.getItem("token");
    setLoggedIn(true);
    if (token) {
      const decoded: UserInterface = jwt_decode(token);
      setUser(decoded);
    } else {
      setLoggedIn(false);
      setUser(null);
      router.push("/login");
    }
  };

  useEffect(() => {
    console.log("Calling the checkLogin function");
    checkLogin();
  }, []);
  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
