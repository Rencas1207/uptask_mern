import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import clientAxios from '../config/clientAxios';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '' || email.length < 6) {
      setAlert({
        msg: 'El Email es obligatorio',
        error: true,
      });
      return;
    }

    try {
      const { data } = await clientAxios.post('/usuarios/forget-password', {
        email,
      });

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

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl">
        Recupera tu acceso y no pierdas tus{' '}
        <span className="text-slate-700"> proyectos</span>
      </h1>

      {msg && <Alert alert={alert} />}

      <form
        className="my-10 bg-white shadow rounded-lg px-10 py-5"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email de registro"
            className="w-full mt-3 p-3 outline-none rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Enviar instrucciones"
          className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between ">
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          ¿Ya tienes una cuenta? Inicia Sesión{' '}
        </Link>
        <Link
          to="/register"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          ¿No tienes una cuenta? Regístrate{' '}
        </Link>
      </nav>
    </>
  );
};

export default ForgetPassword;
