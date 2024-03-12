import React, { useEffect, useState } from "react";
import { useTodo } from "../contexts/ToDoContext";
import { IoAddOutline } from "react-icons/io5";
import AlertMessage from "./alertMessage";
import "../style/styles.css";
const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorType, setErrorType] = useState("");
  const [key, setKey] = useState(0); 

  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();

    if (!todo) {
      setErrorMessage("⚠ Please enter a Task");
      setErrorType("error");
      setKey((prevKey) => prevKey + 1); 
    } else {
      addTodo({ title: todo, completed: false });
      setTodo("");
    }
  };
  return (
    <form onSubmit={add} className="flex">
      <AlertMessage key={key} message={errorMessage} type={errorType}   />
      <div className="input-section">
        <input
          type="text"
          placeholder="Add a todo . . ."
          className="input input-bordered input-secondary w-full max-w-xs"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />

        <button type="submit" className="btn btn-secondary add-task-button">
          <div>
            <IoAddOutline color="black" size={30} />
          </div>
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
