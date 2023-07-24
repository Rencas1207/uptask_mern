function Login() {
  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl">
        Inicia sesión y administra tus{' '}
        <span className="text-slate-700"> proyectos</span>
      </h1>
      <form className="my-10 bg-white shadow rounded-lg px-10 py-5">
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
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 outline-none rounded-xl bg-gray-50"
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
          />
        </div>

        <input
          type="submit"
          value="Iniciar sesión"
          className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
    </>
  );
}

export default Login;
