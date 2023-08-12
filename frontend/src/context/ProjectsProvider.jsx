import { useState, useEffect, createContext } from 'react';
import clientAxios from '../config/clientAxios';
import { useNavigate } from 'react-router-dom';

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState({});
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalFormTask, setModalFormTask] = useState(false);
  const [task, setTask] = useState({});
  const [modalDeleteTask, setModalDeleteTask] = useState(false);

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

  const handleModalTask = () => {
    setModalFormTask(!modalFormTask);
    setTask({});
  };

  const submitTask = async (task) => {
    if (task?.id) {
      await editTask(task);
    } else {
      await createTask(task);
    }
  };

  const createTask = async (task) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post('/tareas', task, config);

      // Add the task to the state
      const projectUpdated = { ...project };
      projectUpdated.tasks = [...project.tasks, data];

      setProject(projectUpdated);
      setAlert({});
      setModalFormTask(false);
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async (task) => {
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
        `/tareas/${task.id}`,
        task,
        config
      );

      // TODO: Update DOM
      const projectUpdated = { ...project };
      projectUpdated.tasks = projectUpdated.tasks.map((taskState) =>
        taskState._id === data._id ? data : taskState
      );
      setProject(projectUpdated);
      setAlert({});
      setModalFormTask(false);
    } catch (error) {}
  };

  const handleModalEditTask = (task) => {
    setTask(task);
    setModalFormTask(true);
  };

  const handleModalDeleteTask = (task) => {
    setTask(task);
    setModalDeleteTask(!modalDeleteTask);
  };

  const deleteTask = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.delete(`/tareas/${task._id}`, config);
      // console.log(data?.msg);
      setAlert({
        msg: data?.msg,
        error: false,
      });
      const projectUpdated = { ...project };
      projectUpdated.tasks = projectUpdated.tasks.filter(
        (taskState) => taskState._id !== task._id
      );

      setTimeout(() => {
        setAlert({});
      }, 2000);
      setProject(projectUpdated);
      setModalDeleteTask(false);
      setTask({});
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
        modalFormTask,
        handleModalTask,
        submitTask,
        handleModalEditTask,
        task,
        modalDeleteTask,
        handleModalDeleteTask,
        deleteTask,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };

export default ProjectsContext;
