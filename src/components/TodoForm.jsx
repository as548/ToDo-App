import React, { useState } from "react";
import { useTodo } from "../contexts/ToDoContext";
import { IoAddOutline } from "react-icons/io5";

import "../style/styles.css";
const TodoForm = () => {
  const [todo, setTodo] = useState("");

  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();

    if (!todo) return;

    addTodo({ title: todo, completed: false });
    setTodo("");
  };
  return (
    <form onSubmit={add} className="flex">
      <div className="input-section">
        <input
          type="text"
          placeholder="Add a todo . . ."
          className="w-full borde border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-3"
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
