import { useTranslation } from "react-i18next";
import SliderUtil from "../../component/SliderUtil";
import { useGetNewMoviesQuery } from "../../redux/api/movies";
import { Link } from "react-router-dom";

const Header = () => {
  const { data } = useGetNewMoviesQuery();

  const { t } = useTranslation();

  return (
    <div className="flex flex-col mt-8 ml-4 md:flex-row justify-between items-center md:items-start">
      <nav className="w-full md:w-40 ml-0 md:ml-2 mb-6 md:mb-0 pt-10 font-semibold text-gray-900 dark:text-gray-100">
        <Link
          to="/"
          className="block p-3 rounded-md mb-3 text-lg transition-colors duration-300 hover:bg-teal-500 hover:text-white"
        >
          {t("Home")}
        </Link>
        <Link
          to="/movies"
          className="block p-3 rounded-md mb-3 text-lg transition-colors duration-300 hover:bg-teal-500 hover:text-white"
        >
          {t("BrowseMovies")}
        </Link>
      </nav>

      <div className="w-full md:w-4/5 mr-0 md:mr-2">
        <SliderUtil data={data} />
      </div>
    </div>
  );
};

export default Header;
