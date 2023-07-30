import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import clientAxios from '../config/clientAxios';
import Alert from '../components/Alert';

const NewPassword = () => {
  const [tokenValido, setTokenValido] = useState(false);
  const [alert, setAlert] = useState({});
  const [password, setPassword] = useState('');
  const [passwordModified, setPasswordModified] = useState(false);
  const { token } = useParams();

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clientAxios(`/usuarios/forget-password/${token}`);
        setTokenValido(true);
        setPasswordModified(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const { msg } = alert;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlert({
        msg: 'El password debe ser mínimo de 6 caracteres',
        error: true,
      });
      return;
    }

    try {
      const url = `/usuarios/forget-password/${token}`;
      const { data } = await clientAxios.post(url, { password });
      setAlert({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl">
        Reestablece tu password y no pierdas acceso a tus{' '}
        <span className="text-slate-700"> proyectos</span>
      </h1>
      {msg && <Alert alert={alert} />}
      {tokenValido && (
        <form
          className="my-10 bg-white shadow rounded-lg px-10 py-5"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Nuevo Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Escribe tu Nuevo Password"
              className="w-full mt-3 p-3 outline-none rounded-xl bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Guardar Nuevo Password"
            className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}

      {passwordModified && (
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm "
          to="/"
        >
          Inicia Sesión
        </Link>
      )}
    </>
  );
};

export default NewPassword;
