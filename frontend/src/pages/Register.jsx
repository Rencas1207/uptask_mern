import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import axios from 'axios';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }

    if (password !== repetirPassword) {
      setAlert({
        msg: 'Los password no son iguales',
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlert({
        msg: 'El password es muy corto, agrega mínimo 6 caracteres',
        error: true,
      });
      return;
    }

    setAlert({});

    // Crear el usuario en la API
    try {
      const { data } = await axios.post('http://localhost:4000/api/usuarios', {
        nombre,
        email,
        password,
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
        Crea tu cuenta y administra tus{' '}
        <span className="text-slate-700"> proyectos</span>
      </h1>
      {msg && <Alert alert={alert} />}
      <form
        onSubmit={handleSubmit}
        className="my-10 bg-white shadow rounded-lg px-10 py-5"
      >
        <div className="my-5">
          <label
            htmlFor="nombre"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            placeholder="Tu nombre"
            className="w-full mt-3 p-3 outline-none rounded-xl bg-gray-50"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
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
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password de Registro"
            className="w-full mt-3 p-3 outline-none rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password2"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Repetir Password
          </label>
          <input
            type="password"
            id="password2"
            placeholder="Repetir tu Password"
            className="w-full mt-3 p-3 outline-none rounded-xl bg-gray-50"
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Crear Cuenta"
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
          to="/forget-password"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Olvide Mi Password
        </Link>
      </nav>
    </>
  );
};

export default Register;
