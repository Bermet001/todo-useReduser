import React, { useContext, useState } from "react";
import { TodoContext } from "./TodoContext";
import Todo from "./Todo";
import { useLanguage } from "./LanguageContext";
import { useTheme } from "./ThemeContext";
import styled from "styled-components";
import { TbSunMoon } from "react-icons/tb";

const AppTodo = () => {
  const { state, dispatch } = useContext(TodoContext);
  const [text, setText] = useState("");
  const { currentLanguage, dispatch: languageDispatch } = useLanguage();
  const { theme, dispatch: themeDispatch } = useTheme();
  console.log(currentLanguage);
  const addTodoHandler = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      const newTodo = {
        id: new Date(),
        text,
        completed: false,
      };
      dispatch({ type: "ADD", payload: newTodo });
      setText("");
    }
  };
  const changeText = (e) => {
    setText(e.target.value);
  };
  return (
    <>
      <TodoWrapperStyle onSubmit={addTodoHandler} className={`App ${theme}`}>
        <Title>{currentLanguage.title}</Title>
        <ButtonsContainer>
          <ThemeIcon onClick={() => themeDispatch({ type: "TOGGLE_THEME" })} />
          <ButtonSt
            onClick={() => languageDispatch({ type: "SWICH", payload: "en" })}
          >
            en
          </ButtonSt>
          <ButtonSt
            onClick={() => languageDispatch({ type: "SWICH", payload: "ru" })}
          >
            ru
          </ButtonSt>
        </ButtonsContainer>
        <div>
          <Input type="text" value={text} onChange={changeText} />
          <SubmitButton
            type="submit
          "
            onSubmit={addTodoHandler}
          >
            {currentLanguage.button}
          </SubmitButton>
        </div>
        <ItemsContainer>
          {state.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </ItemsContainer>
      </TodoWrapperStyle>
    </>
  );
};

export default AppTodo;

const TodoWrapperStyle = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  margin: 0 auto;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3.2rem;
  margin-bottom: 40px;
  margin-top: 24px;
`;

const Input = styled.input`
  width: 70%;
  height: 30px;
  font-size: 1.3rem;
  padding: 20px 10px;
  border: none;
  border-radius: 5px;
  outline: none;
  display: inline-block;
`;

const SubmitButton = styled.button`
  margin-left: 20px;
  height: 50px;
  cursor: pointer;
  background-color: beige;
  font-size: 1.1rem;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: rgb(226, 226, 220);
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const ButtonSt = styled.button`
  margin-left: 20px;
  background: beige;
  font-size: 1.5rem;
  padding: 5px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: rgb(226, 226, 220);
  }
`;

const ThemeIcon = styled(TbSunMoon)`
  color: lightgrey;
  font-size: 35px;
  transition: transform 0.3s;
  &:hover {
    cursor: pointer;
    transform: scale(1.2);
    color: yellow;
  }
`;

const ItemsContainer = styled.div`
  padding: 10px;
`;
