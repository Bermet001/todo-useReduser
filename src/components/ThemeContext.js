import { createContext, useContext, useReducer } from "react";

const ThemeContext = createContext();

const theneReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return state === "ak" ? "kara" : "ak";

    default:
      return state;
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, dispatch] = useReducer(theneReducer, "ak");
  return (
    <ThemeContext.Provider value={{ theme, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("some thing went wrong");
  }
  return context;
};
