import React, { useState, useEffect } from 'react';
import logo from './logodreamsquad.png'; // Import do logo

export default function App() {
  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Carrega user/tarefas do localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUsername(storedUser);
      setLoggedIn(true);
      const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      setTasks(storedTasks);
    }
  }, []);

  // Função para login
  const login = () => {
    if (username.trim()) {
      localStorage.setItem('username', username);
      setLoggedIn(true);
    }
  };

  // Função para logout
  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('tasks');
    setUsername('');
    setLoggedIn(false);
    setTasks([]);
  };

  // Adicionar tarefa
  const addTask = () => {
    if (!newTask.trim()) return;
    const updated = [...tasks, { id: Date.now(), text: newTask, done: false }];
    setTasks(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
    setNewTask('');
  };

  // Marcar tarefa como concluída ou não
  const toggleTask = (id) => {
    const updated = tasks.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    setTasks(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
  };

  // Apagar tarefa
  const deleteTask = (id) => {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
  };

  // ===== TELA DE LOGIN =====
  if (!loggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        {/* Logo grande na tela de login */}
        <img
          src={logo}
          alt="DreamSquad Logo"
          className="h-60 w-auto mb-4 bg-gray-50 rounded"
          style={{ objectFit: 'contain' }}
        />
        <h1 className="text-3xl mb-6 font-bold text-gray-800">DreamSquad Login</h1>
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

  // ===== TELA DE TAREFAS =====
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header com logo e botão logout */}
      <header className="max-w-4xl mx-auto flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="DreamSquad Logo"
            className="h-60 w-auto bg-gray-50 rounded"
            style={{ objectFit: 'contain' }}
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
      <div className="max-w-4xl mx-auto bg-white shadow rounded p-4">
        {tasks.length === 0 ? (
          <p className="text-gray-500">Nenhuma tarefa por enquanto.</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map(task => (
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
                        ? 'line-through text-gray-400 flex-grow'
                        : 'flex-grow'
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
    </div>
  );
}
