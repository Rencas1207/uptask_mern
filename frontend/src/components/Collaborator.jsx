import useProjects from '../hooks/useProjects';

const Collaborator = ({ collaborator }) => {
  const { nombre, email } = collaborator;
  const { handleModalDeleteCollaborator } = useProjects();
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p>{nombre}</p>
        <p className="text-sm text-gray-700">{email}</p>
      </div>
      <div>
        <button
          type="button"
          className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => handleModalDeleteCollaborator(collaborator)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Collaborator;
