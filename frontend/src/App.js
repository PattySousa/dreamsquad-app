import React, { useState, useEffect } from "react";
import logo from "./logodreamsquad.png";
import Chat from "./Chat"; // Novo componente de chat

const API_URL = "http://localhost:8080";

export default function App() {
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([]); // sempre array vazio no início
  const [newTask, setNewTask] = useState("");

  // ========= LOGIN LOCAL =========
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
      setLoggedIn(true);
      carregarTarefas();
    }
  }, []);

  const login = () => {
    if (username.trim()) {
      localStorage.setItem("username", username);
      setLoggedIn(true);
      carregarTarefas();
    }
  };

  const logout = () => {
    localStorage.removeItem("username");
    setUsername("");
    setLoggedIn(false);
    setTasks([]);
  };

  // ========= TAREFAS =========
  const carregarTarefas = () => {
    fetch(`${API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        // garante que sempre será um array
        setTasks(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Erro ao carregar tarefas:", err);
        setTasks([]);
      });
  };

  const addTask = () => {
    if (!newTask.trim()) return;

    fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTask, done: false }),
    })
      .then((res) => res.json())
      .then((nova) => {
        if (nova && nova.id) {
          setTasks((prev) => [...prev, nova]);
        }
        setNewTask("");
      })
      .catch((err) => console.error("Erro ao criar tarefa:", err));
  };

  // Marcar tarefa como concluída (ainda local)
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // ===== TELA DE LOGIN =====
  if (!loggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <img
          src={logo}
          alt="DreamSquad Logo"
          className="h-60 w-auto mb-4 bg-gray-50 rounded"
          style={{ objectFit: "contain" }}
        />
        <h1 className="text-3xl mb-6 font-bold text-gray-800">
          DreamSquad Login
        </h1>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-64 mb-4 shadow"
        />
        <button
          onClick={login}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
      </div>
    );
  }

  // ===== TAREFAS + CHAT =====
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="max-w-4xl mx-auto flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="DreamSquad Logo"
            className="h-32 w-auto bg-gray-50 rounded"
            style={{ objectFit: "contain" }}
          />
          <h1 className="text-2xl font-bold text-gray-800">Painel de Tarefas</h1>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Olá, {username}</span>
          <button
            onClick={logout}
            className="bg-pink-400 text-white px-3 py-1 rounded hover:bg-pink-500"
          >
            Sair
          </button>
        </div>
      </header>

      {/* Nova tarefa */}
      <div className="max-w-4xl mx-auto flex mb-6">
        <input
          type="text"
          placeholder="Digite uma nova tarefa..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border p-2 flex-grow rounded-l"
        />
        <button
          onClick={addTask}
          className="bg-blue-800 px-4 text-white rounded-r hover:bg-blue-900"
        >
          Adicionar
        </button>
      </div>

      {/* Lista de tarefas */}
      <div className="max-w-4xl mx-auto bg-white shadow rounded p-4 mb-8">
        {Array.isArray(tasks) && tasks.length === 0 ? (
          <p className="text-gray-500">Nenhuma tarefa por enquanto.</p>
        ) : (
          <ul className="space-y-3">
            {Array.isArray(tasks) &&
              tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between p-2 border-b last:border-none"
                >
                  <label className="flex items-center space-x-3 flex-grow">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleTask(task.id)}
                    />
                    <span
                      className={
                        task.done
                          ? "line-through text-gray-400 flex-grow"
                          : "flex-grow"
                      }
                    >
                      {task.text}
                    </span>
                  </label>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-pink-500 hover:underline text-sm"
                  >
                    Apagar
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* Chat */}
      <Chat username={username} />
    </div>
  );
}
