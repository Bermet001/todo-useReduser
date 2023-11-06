import React, { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const todoReduser = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter((todo) => todo.id !== action.payload);
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case "EDIT":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );

    default:
      return state;
  }
};

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const saveTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const [state, dispatch] = useReducer(todoReduser, saveTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state));
  }, [state]);
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
