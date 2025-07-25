import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/Navigation";
import { ThemeProvider } from "@material-tailwind/react";

const App = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <ToastContainer />
        <Navigation />
        <main className="py-3">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
