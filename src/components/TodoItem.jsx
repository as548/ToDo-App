import React, { useState } from "react";
import { useTodo } from "../contexts/ToDoContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
function TodoItem({ todo }) {
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.title);

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, title: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <>
      <div
        className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
          todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
        }`}
      >
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={todo.completed}
          onChange={toggleCompleted}
        />
        <input
          type="text"
          className={`border outline-none w-full bg-transparent rounded-lg ${
            isTodoEditable ? "border-black/10 px-2" : "border-transparent"
          } ${todo.completed ? "line-through" : ""}`}
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          readOnly={!isTodoEditable}
        />
        {/* Edit, Save Button */}
        <button
          className=" btn btn-warning btn-sm"
          onClick={() => {
            if (todo.completed) return;

            if (isTodoEditable) {
              editTodo();
            } else setIsTodoEditable((prev) => !prev);
          }}
          disabled={todo.completed}
        >
          {isTodoEditable ? <BsCheckLg size={20} /> : <BiEdit size={20} />}
        </button>
        {/* Delete Todo Button */}
        <button
          className="btn btn-error btn-sm"
          onClick={() => deleteTodo(todo.id)}
        >
          <RiDeleteBin6Line size={20} />
        </button>
      </div>
    </>
  );
}

export default TodoItem;
