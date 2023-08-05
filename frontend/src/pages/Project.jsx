import { useParams } from 'react-router-dom';
import useProjects from '../hooks/useProjects';
import { useEffect } from 'react';

const Project = () => {
  const { id } = useParams();
  const { getProject, project, loading } = useProjects();

  const { name, description, client } = project;

  useEffect(() => {
    getProject(id);
  }, []);
  return loading ? (
    'Cargando...'
  ) : (
    <div>
      <h1 className="font-black text-4xl">{name}</h1>
    </div>
  );
};

export default Project;
