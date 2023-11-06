import React, { useContext, useState } from "react";
import { TodoContext } from "./TodoContext";
import { useLanguage } from "./LanguageContext";
import { RiTodoFill, RiDeleteBin2Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import styled from "styled-components";

const Todo = ({ todo }) => {
  const { dispatch } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const { currentLanguage, dispatch: languageDispatch } = useLanguage();

  const handlerToggle = () => {
    dispatch({ type: "TOGGLE", payload: todo.id });
  };

  const handlerDelete = () => {
    dispatch({ type: "DELETE", payload: todo.id });
  };

  const handlerEdit = () => {
    setIsEditing(true);
  };

  const handlerSave = () => {
    dispatch({ type: "EDIT", payload: { id: todo.id, text: editedText } });
    setIsEditing(false);
    languageDispatch({ type: "SWICH", payload: "en" });
  };

  const handlerCancel = () => {
    setIsEditing(false);
    setEditedText(todo.text);
    languageDispatch({ type: "SWICH", payload: "en" });
  };

  const handlerChange = (e) => {
    setEditedText(e.target.value);
  };

  return (
    <TodoContainer className={todo?.completed ? "completedTodo" : ""}>
      {isEditing ? (
        <ModalContainer>
          <Input type="text" value={editedText} onChange={handlerChange} />
          <ModalButtonsContainer>
            <button onClick={handlerSave}>{currentLanguage.editButton}</button>
            <button onClick={handlerCancel}>
              {currentLanguage.cancelButton}
            </button>
          </ModalButtonsContainer>
        </ModalContainer>
      ) : (
        <>
          <TodoIcon />
          <CheckIcon onClick={handlerToggle} />
          <TodoText>{todo.text}</TodoText>
          <FiEdit onClick={handlerEdit} />
          <DeleteIcon onClick={handlerDelete} />
        </>
      )}
    </TodoContainer>
  );
};

export default Todo;

const DeleteIcon = styled(RiDeleteBin2Line)`
  cursor: pointer;
  color: lightgrey;
  padding: 0 7px;
  font-size: 40px;
  transition: transform 0.3s;
  &:hover {
    cursor: pointer;
    transform: scale(1.3);
    color: red;
  }
`;
const Input = styled.input`
  width: 80%;
  height: 15px;
  font-size: 1.3rem;
  padding: 15px 10px;
  border-radius: 5px;
  outline: none;
  display: inline-block;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TodoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  margin: 15px 0;
  font-size: 1.5rem;
  border-radius: 5px;
  border: 2px solid #555;
  color: #112d49;
  background-color: #fbfef9;
  &.completedTodo {
    background-color: unset;
    border-color: gray;
    color: gray;
  }
  &.completedTodo .todoIcon,
  &.completedTodo .checkIcon,
  &.completedTodo .deleteIcon {
    color: gray;
  }
`;
const TodoText = styled.div`
  width: 100%;
  text-align: left;
`;
const TodoIcon = styled(RiTodoFill)`
  font-size: 1.8rem;
  margin-right: 10px;
  color: teal;
`;

const CheckIcon = styled(FaCheck)`
  cursor: pointer;
  color: lightgrey;
  padding: 0 7px;
  font-size: 40px;
  transition: transform 0.3s;
  &:hover {
    cursor: pointer;
    transform: scale(1.3);
    color: green;
  }
`;

const ModalButtonsContainer = styled.div`
  display: flex;
  margin-top: 15px;
  gap: 10px;
  button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    &:hover {
      background-color: #dddada;
    }
  }
`;
