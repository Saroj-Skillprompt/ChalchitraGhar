import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="-translate-y-10 flex h-screen fixed mt-10 border-r-2 border-gray-300 dark:border-[#242424] bg-white dark:bg-[#111827] transition-colors duration-300">
      <aside className="w-64 flex-shrink-0 pt-10">
        <ul className="py-4">
          <li className="text-lg font-medium rounded-full -translate-x-6 bg-gradient-to-b from-green-500 to-lime-400 text-white">
            <Link to="/admin/movies/dashboard" className="block p-2 ml-20 mb-10">
              Dashboard
            </Link>
          </li>
          <li className="text-lg font-medium -translate-x-6 hover:bg-gradient-to-b from-green-500 to-lime-400 hover:text-white rounded-full text-gray-900 dark:text-white">
            <Link to="/admin/movies/create" className="block p-2 ml-20 mb-10">
              Create Movie
            </Link>
          </li>
          <li className="text-lg font-medium -translate-x-6 hover:bg-gradient-to-b from-green-500 to-lime-400 hover:text-white rounded-full text-gray-900 dark:text-white">
            <Link to="/admin/movies/genre" className="block p-2 ml-20 mb-10">
              Create Genre
            </Link>
          </li>
          <li className="text-lg font-medium -translate-x-6 hover:bg-gradient-to-b from-green-500 to-lime-400 hover:text-white rounded-full text-gray-900 dark:text-white">
            <Link to="/admin/movies-list" className="block p-2 ml-20 mb-10">
              Update Movie
            </Link>
          </li>
          <li className="text-lg font-medium -translate-x-6 hover:bg-gradient-to-b from-green-500 to-lime-400 hover:text-white rounded-full text-gray-900 dark:text-white">
            <Link to="/admin/movies/comments" className="block p-2 ml-20 mb-10">
              Comments
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
