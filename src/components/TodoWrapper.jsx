import React from "react";
import TodoProvider from "./TodoContext";
import AppTodo from "./AppTodo";
import { LanguageProvider } from "./LanguageContext";
import { ThemeProvider } from "./ThemeContext";

const TodoWrapper = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <TodoProvider>
          <AppTodo />
        </TodoProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default TodoWrapper;
