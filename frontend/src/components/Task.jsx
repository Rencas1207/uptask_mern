import { formatDate } from '../helpers/formatDate';
import useAdmin from '../hooks/useAdmin';
import useProjects from '../hooks/useProjects';

const Task = ({ task }) => {
  const { handleModalEditTask, handleModalDeleteTask, completeTask } =
    useProjects();
  const admin = useAdmin();
  const { name, description, priority, deliverDate, _id, status } = task;

  return (
    <div className="border-b p-5 flex flex-col gap-5 md:flex-row justify-between items-center">
      <div>
        <p className="text-xl mb-1">{name}</p>
        <p className="text-sm text-gray-500 uppercase mb-1">{description}</p>
        <p className="text-SM mb-1">{formatDate(deliverDate)}</p>
        <p className="text-gray-600 mb-1">Prioridad: {priority}</p>
        {status && (
          <p className="text-xs bg-green-600 uppercase py-1 px-2 rounded-lg text-white inline-block">
            Completado por: {task.completed.nombre}
          </p>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        {admin && (
          <button
            onClick={() => handleModalEditTask(task)}
            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg "
          >
            Editar
          </button>
        )}

        <button
          onClick={() => completeTask(_id)}
          className={`${
            status ? 'bg-sky-600' : 'bg-gray-600'
          } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
        >
          {status ? 'Completa' : 'Incompleta'}
        </button>

        {admin && (
          <button
            onClick={() => handleModalDeleteTask(task)}
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg "
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default Task;
