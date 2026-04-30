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

  const signUp = async (email, password) => {
    const response = await authService.signUp(email, password);
    if(response?.error){
      return response.error;
    }

    return signIn(email, password); // Auto-login after sign up
  },
  
  const signOut = async () => {
    await authService.signOut();
    setUser(null);
    await checkUser();
  },

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      signUp,
      signOut,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => useContext(AuthContext);