import React, { createContext, useContext } from "react";
import { useReducer } from "react";

const LanguageContext = createContext();

const languageReduser = (state, action) => {
  switch (action.type) {
    case "SWICH":
      return action.payload;

    default:
      return state;
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, dispatch] = useReducer(languageReduser, "en");

  const text = {
    en: {
      title: "Todo list",
      button: "ADD",
      editButton: "edit",
      cancelButton: "calcel",
    },
    ru: {
      title: "список дел",
      button: "добaвить",
      editButton: "изменить",
      cancelButton: "отмена",
    },
  };
  const currentLanguage = text[language];

  return (
    <LanguageContext.Provider value={{ language, currentLanguage, dispatch }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    // throw new Error("кичине окуп кел");
    throw new Error("some thing went wrong");
  }

  return context;
};
