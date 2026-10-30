import "./App.css";
import { useState, useEffect } from "react";
function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const API_URL = "http://localhost:5000/todos";

  const fetchTodos = async () => {
    try {
      const resp = await fetch(API_URL);
      const data = await resp.json();
      setTodos(data);
    } catch (error) {
      console.error("May be backend server is off/ not connected:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!task.trim()) return;
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });
    setTask("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    fetchTodos();
  };

  return (
    <>
      <div className="outerTodo">
        <h1>Todo App (React + Flask)</h1>
        <input
          type="text"
          value={task}
          placeholder="Enter your task"
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="button" onClick={() => addTodo()}>
          Add
        </button>

        <hr />
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span>{todo.task}</span>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
