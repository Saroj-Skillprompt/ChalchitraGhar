// import { createContext, useContext, useEffect, useState } from "react";
// import PropTypes from "prop-types";

// const ThemeContext = createContext();
// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

//   useEffect(() => {
//     document.documentElement.classList.remove("light", "dark");
//     document.documentElement.classList.add(theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// ThemeProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };


// export const useTheme = () => useContext(ThemeContext);
