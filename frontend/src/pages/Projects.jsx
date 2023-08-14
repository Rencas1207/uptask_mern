import { useEffect } from 'react';
import Alert from '../components/Alert';
import PreviewProject from '../components/PreviewProject';
import useProjects from '../hooks/useProjects';
import io from 'socket.io-client';

let socket;

const Projects = () => {
  const { projects, alert } = useProjects();
  const { msg } = alert;

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }, []);
  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>

      {msg && <Alert alert={alert} />}

      <div className="bg-white shadow mt-10 rounded-lg">
        {projects.length ? (
          projects.map((project) => (
            <PreviewProject key={project._id} project={project} />
          ))
        ) : (
          <p className="text-center text-gray-600 uppercase p-5">
            No hay proyectos aún
          </p>
        )}
      </div>
    </>
  );
};

export default Projects;
