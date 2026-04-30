import{createContext, useState, useEffect, useContext} from "react";
import {authService} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    checkUser();
  },[]);

  const checkUser = async () => {
    setLoading(true);
    const response = await authService.getUser();
    if(response?.error){
      setUser(null);
    }else{
      setUser(response);
    }

    setLoading(false);
  },

  const signIn = async (email, password) => {
    const response = await authService.signIn(email, password);
    if(response?.error){
      return response.error;
    }

    await checkUser();
    return {success: true};
  },
  
};