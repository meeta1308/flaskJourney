import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const API_URL = "https://onrender.com";

  const fetchTodos = async () => {
    try {
      const resp = await fetch(API_URL);
      if (!resp.ok) throw new Error("Failed to fetch");
      const data = await resp.json();
      setTodos(data);
    } catch (error) {
      console.error("Backend server error:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!task.trim()) return;
    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: task.trim() }),
      });
      if (resp.ok) {
        setTask("");
        fetchTodos();
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const resp = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (resp.ok) {
        fetchTodos();
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="outerTodo">
      <h1>Todo App (React + Flask)</h1>
      <input
        type="text"
        value={task}
        placeholder="Enter your task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={addTodo}>
        {" "}
        Add{" "}
      </button>
      <hr />
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>
            <span>{todo.task}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
