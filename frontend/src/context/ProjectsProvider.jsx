import { useState, useEffect, createContext } from 'react';
import clientAxios from '../config/clientAxios';
import { useNavigate } from 'react-router-dom';

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState({});
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clientAxios('/proyectos', config);
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, []);

  const showAlert = (alert) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert({});
    }, 5000);
  };

  const submitProject = async (projectJSON) => {
    if (projectJSON.id) {
      await editProject(projectJSON);
    } else {
      await newProject(projectJSON);
    }
  };

  const editProject = async (projectJSON) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.put(
        `/proyectos/${projectJSON.id}`,
        projectJSON,
        config
      );

      // Synchronize the state
      const updatedProjects = projects.map((projectState) =>
        projectState._id === data._id ? data : projectState
      );
      setProjects(updatedProjects);

      // Show alert
      setAlert({
        msg: 'Proyecto editado correctamente',
        error: false,
      });

      // Redirect
      setTimeout(() => {
        setAlert({});
        navigate('/projects');
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const newProject = async (projectJSON) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post(
        '/proyectos',
        projectJSON,
        config
      );

      setProjects([...projects, data]);

      setAlert({
        msg: 'Proyecto creado correctamente',
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate('/projects');
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const getProject = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios(`/proyectos/${id}`, config);
      setProject(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.delete(`/proyectos/${id}`, config);

      const updatedProjects = projects.filter(
        (projectState) => projectState._id !== id
      );
      setProjects(updatedProjects);

      setAlert({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate('/projects');
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        setProjects,
        showAlert,
        alert,
        submitProject,
        getProject,
        project,
        loading,
        deleteProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };

export default ProjectsContext;
