import { useParams } from 'react-router-dom';
import useProjects from '../hooks/useProjects';
import { useEffect } from 'react';
import FormProject from '../components/FormProject';

const EditProject = () => {
  const { id } = useParams();
  const { getProject, project, loading } = useProjects();
  const { name, description, client } = project;

  useEffect(() => {
    getProject(id);
  }, []);

  if (loading) return 'Cargando...';

  return (
    <>
      <h1 className="font-black text-4xl">Editar Proyecto: {name}</h1>
      <div className="mt-10 flex justify-center">
        <FormProject />
      </div>
    </>
  );
};

export default EditProject;
