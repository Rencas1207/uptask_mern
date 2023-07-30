import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import clientAxios from '../config/clientAxios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clientAxios('/usuarios/perfil', config);
        setAuth(data);
        // navigate('/projects');
      } catch (error) {
        setAuth({});
      } finally {
        setLoading(false);
      }
    };
    autenticarUsuario();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
