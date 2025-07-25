import { useEffect, useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Sun, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";
import { useTranslation } from "react-i18next";

const Navigation = () => {
  const { t, i18n } = useTranslation();
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState(i18n.language || "en");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  // Load theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // Toggle dropdown
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Toggle language
  const toggleLanguage = () => {
    const newLang = language === "en" ? "np" : "en";
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  // Logout handler
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="w-full border-b border-gray-700 bg-white dark:bg-[#0f172a] text-black dark:text-white px-4 py-3 fixed top-0 z-50">
      <section className="w-full max-w-[1280px] mx-auto px-4 flex flex-wrap justify-between items-center">
        {/* Left Nav */}
        <div className="flex items-center space-x-6 text-[16px] font-medium mb-3 sm:mb-0">
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-cyan-400 transition"
          >
            <AiOutlineHome size={22} />
            <span className="hidden sm:inline">{t("Home")}</span>
          </Link>

          <Link
            to="/movies"
            className="flex items-center gap-2 hover:text-cyan-400 transition"
          >
            <MdOutlineLocalMovies size={22} />
            <span className="hidden sm:inline">{t("Movies")}</span>
          </Link>
        </div>

        {/* Right: Theme, Language, Auth */}
        <div className="relative flex items-center gap-4">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="text-sm px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {language === "en" ? "ने" : "EN"}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition transform hover:scale-105"
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-black" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-300" />
            )}
          </button>

          {/* Auth/Profile Dropdown */}
          {userInfo ? (
            <div>
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 font-semibold hover:text-cyan-400 transition"
              >
                {userInfo.username}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      dropdownOpen
                        ? "M5 15l7-7 7 7"
                        : "M19 9l-7 7-7-7"
                    }
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-md shadow-lg overflow-hidden z-50 animate-fadeIn">
                  {userInfo.isAdmin && (
                    <li>
                      <Link
                        to="/admin/movies/dashboard"
                        className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      >
                        {t("Dashboard")}
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      {t("Profile")}
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logoutHandler}
                      className="block w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      {t("Logout")}
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div className="flex gap-4 text-[15px]">
              <Link
                to="/login"
                className="flex items-center gap-2 hover:text-cyan-400 transition"
              >
                <AiOutlineLogin size={22} />
                <span className="hidden sm:inline">{t("Login")}</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-2 hover:text-cyan-400 transition"
              >
                <AiOutlineUserAdd size={22} />
                <span className="hidden sm:inline">{t("Register")}</span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </nav>
  );
};

export default Navigation;
