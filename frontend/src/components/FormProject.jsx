import { useState, useEffect } from 'react';
import useProjects from '../hooks/useProjects';
import { useParams } from 'react-router-dom';
import Alert from './Alert';

const FormProject = () => {
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deliverDate, setDeliverDate] = useState('');
  const [client, setClient] = useState('');

  const params = useParams();
  const { showAlert, alert, submitProject, project } = useProjects();

  useEffect(() => {
    if (params.id) {
      setId(project._id);
      setName(project.name);
      setDescription(project.description);
      setDeliverDate(project.deliverDate?.split('T')[0]);
      setClient(project.client);
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([name, description, deliverDate, client].includes('')) {
      showAlert({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }

    // Pass the data to the provider
    await submitProject({ id, name, description, deliverDate, client });

    setId(null);
    setName('');
    setDescription('');
    setDeliverDate('');
    setClient('');
  };

  const { msg } = alert;

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alert alert={alert} />}
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
          htmlFor="deliver-date"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Fecha Entrega
        </label>
        <input
          type="date"
          id="deliver-date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none"
          value={deliverDate}
          onChange={(e) => setDeliverDate(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="client"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Cliente Proyecto
        </label>
        <input
          type="text"
          id="client"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-none"
          placeholder="Nombre del proyecto"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value={id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default FormProject;
