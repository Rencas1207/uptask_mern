import { Link } from 'react-router-dom';
import useProjects from '../hooks/useProjects';
import useAuth from '../hooks/useAuth';
import Search from './Search';

const Header = () => {
  const { handleSearchEngine, signOutProjects } = useProjects();
  const { signOutAuth } = useAuth();

  const handleSignOut = () => {
    signOutAuth();
    signOutProjects();
    localStorage.removeItem('token');
  };

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
          UpTask
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <button
            onClick={handleSearchEngine}
            type="button"
            className="font-bold uppercase"
          >
            Buscar Proyecto
          </button>
          <Link to="/projects" className="font-bold uppercase">
            Proyectos
          </Link>
          <button
            type="button"
            className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
            onClick={handleSignOut}
          >
            Cerrar sesión
          </button>

          <Search />
        </div>
      </div>
    </header>
  );
};

export default Header;
