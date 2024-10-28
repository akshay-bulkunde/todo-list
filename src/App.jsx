import React from "react";
import { useState } from "react";
import './index.css';

const App = () => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const getTodoValue = (e) => {
    setValue(e.target.value);
  };

  const toggleSubmit = () => {
    if (value) {
      if (isEditing) {
        todos[editIndex] = value;
        setIsEditing(false);
        setEditIndex(null);
      } else {
        setTodos((prev) => {
          const newTodos = [...prev, value];
          return newTodos;
        });
      }
    }

    setValue("");
  };

  const toggleCancel = () => {
    setIsEditing(false);
    setValue("");
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setValue(todos[index]);
    setIsEditing(true);
  };

  const handleDelete = (index) => {
    setTodos((prev) => {
      const newTodos = [...prev];
      newTodos.splice(index, 1);
      return newTodos;
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <header>
        <h1 className="text-3xl font-bold mb-10 mt-10">To Do List</h1>
      </header>
      <section>
        <div>
          <input
            className="border-2 border-black rounded-md px-2 w-[100%] py-1"
            type="text"
            name="value"
            placeholder="Enter your todo"
            value={value}
            onChange={getTodoValue}
          />
        </div>
        <div className="mt-2 mb-2">
          <button
            onClick={toggleSubmit}
            className="bg-gray-500 py-1 px-2 rounded-md text-white"
          >
            {isEditing ? "Update" : "Submit"}
          </button>
          <button
            onClick={toggleCancel}
            value="cancel"
            className="bg-gray-500 py-1 px-2 rounded-md text-white ml-3"
          >
            Cancel
          </button>
        </div>
        <i>Double click on todo to toggle completion status</i>
        <div className="mt-2">
          {todos.map((todo, index) => (
            <div id={index} className="flex mt-2">
              <div className="w-24">{todo}</div>
              <button
                className="bg-green-500 mr-1 py-1 px-2 rounded-md text-white ml-20" 
                value="edit"
                onClick={() => handleEdit(index)}
              >
                Edit
              </button>
              <button
                className=" ml-2 bg-red-600 rounded-md py-1 px-2 text-white"
                value="delete"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;