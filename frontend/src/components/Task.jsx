import { formatDate } from '../helpers/formatDate';

const Task = ({ task }) => {
  const { name, description, priority, deliverDate, _id, status } = task;
  // console.log(task);

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="text-xl mb-1">{name}</p>
        <p className="text-sm text-gray-500 uppercase mb-1">{description}</p>
        <p className="text-xl mb-1">{formatDate(deliverDate)}</p>
        <p className="text-gray-600 mb-1">Prioridad: {priority}</p>
      </div>
      <div className="flex gap-2">
        <button className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg ">
          Editar
        </button>
        {status ? (
          <button className="bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg ">
            Completa
          </button>
        ) : (
          <button className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg ">
            Incompleta
          </button>
        )}
        <button className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg ">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Task;
