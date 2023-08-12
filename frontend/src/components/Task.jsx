import { formatDate } from '../helpers/formatDate';
import useProjects from '../hooks/useProjects';

const Task = ({ task }) => {
  const { handleModalEditTask, handleModalDeleteTask } = useProjects();
  const { name, description, priority, deliverDate, _id, status } = task;

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="text-xl mb-1">{name}</p>
        <p className="text-sm text-gray-500 uppercase mb-1">{description}</p>
        <p className="text-SM mb-1">{formatDate(deliverDate)}</p>
        <p className="text-gray-600 mb-1">Prioridad: {priority}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleModalEditTask(task)}
          className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg "
        >
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
        <button
          onClick={() => handleModalDeleteTask(task)}
          className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg "
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Task;
