import { createContext, useState, useContext } from 'react';
import { contrastTheme, lightTheme } from "../constants/Themes"

const ContrastThemeContext = createContext();

export const ContrastProvider = ({children}) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === lightTheme ? contrastTheme : lightTheme));
  };

  return (
    <ContrastThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ContrastThemeContext.Provider>
  );
};

export const useContrastTheme = () => useContext(ContrastThemeContext)