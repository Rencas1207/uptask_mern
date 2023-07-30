import { useState } from 'react';

const FormProject = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deliverDate, setDeliverDate] = useState('');
  const [client, setClient] = useState('');

  return (
    <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
      <div className="mb-5">
        <label
          htmlFor="name"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nombre Proyecto
        </label>
        <input
          type="text"
          id="name"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none"
          placeholder="Nombre del proyecto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="description"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Descripción Proyecto
        </label>
        <textarea
          id="description"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none"
          placeholder="Descripción del proyecto"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="client"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nombre Cliente
        </label>
        <input
          type="date"
          id="client"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="name"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nombre Proyecto
        </label>
        <input
          type="text"
          id="name"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none"
          placeholder="Nombre del proyecto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value="Crear Proyecto"
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default FormProject;
