import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    
  });
    //default axios
//   axios.defaults.headers.common["Authorization"] = auth?.token;

 useEffect(() => {
    const data = localStorage.getItem("UserInfo");
    if (data) {
      const user = JSON.parse(data);
      setAuth({
        ...auth,
        user:user,
        
      });
    }
    //eslint-disable-next-line
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};
// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
