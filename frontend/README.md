DreamSquad App — Painel de Tarefas + Chat Interno
Aplicação web fullstack com Frontend em React e Backend em Go, projetada para ser hospedada em infraestrutura de nuvem de baixo custo usando AWS S3, Lambda, API Gateway e Terraform.

O objetivo é fornecer um painel de tarefas interno integrado a um chat de equipe, priorizando baixo custo operacional, separação de ambientes (teste/produção) e infraestrutura automatizada.

🎯 Objetivos do Projeto
Criar uma aplicação responsiva e ágil para gerenciamento interno de tarefas e comunicação.

Garantir custo próximo de zero usando o Free Tier da AWS.

Utilizar Terraform para provisionar infraestrutura como código, com deploy automatizado.

Separar ambientes de teste e produção para segurança e flexibilidade.

Documentar todo o processo para permitir replicação e manutenção futura.

🛠️ Stack Tecnológica
Frontend

React (Create React App)

TailwindCSS (estilização utilitária)

PostCSS + Autoprefixer

Backend

Go (API REST para tarefas e chat)

Comunicação via JSON

Infraestrutura e Deploy

AWS S3 (Frontend estático)

AWS Lambda + API Gateway (Backend serverless)

AWS DynamoDB (armazenamento)

Terraform (infraestrutura como código)

Git (controle de versão e integração contínua futura)

📌 Etapas do Desenvolvimento
1. Configuração Inicial do Frontend ✅
Criação do projeto React.

Instalação e configuração do TailwindCSS e PostCSS.

Correção de conflitos de dependências.

Validação do ambiente (npm start) com renderização de estilos.

Status: Concluído.

2. Painel de Tarefas (Frontend) 🚧
Componentes para listagem, criação e edição de tarefas.

Layout responsivo com Tailwind.

Estados prontos para integração com API.

Status: Em andamento.

3. Backend em Go 🔜
API para:

CRUD de tarefas.

Envio e recebimento de mensagens no chat.

Testes locais (go run).

Status: Planejado.

4. Integração Frontend ↔ Backend 🔜
Configuração de chamadas HTTP.

Teste do fluxo completo (tarefas + chat).

Status: Planejado.

5. Deploy AWS com Terraform 🔜
Scripts para:

Bucket S3 (frontend).

Lambda + API Gateway (backend).

DynamoDB (armazenamento).

Configuração de variáveis para ambientes separados.

Deploy automatizado (terraform apply).

Status: Planejado.


🚀 Como Executar (Frontend)

# Clonar repositório
git clone https://github.com/usuario/dreamsquad-app.git

# Acessar o frontend
cd dreamsquad-app/frontend

# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm start

=> Acesse em: http://localhost:3000


📅 Próximos Passos
Finalizar layout do painel de tarefas.

Criar backend em Go e endpoints REST.

Testar integração localmente.

Provisionar AWS com Terraform.

Documentar custos e otimizações.

💡 Diferenciais
Baixo custo: uso de S3, Lambda e DynamoDB no Free Tier.

Escalabilidade: tecnologias modernas e performáticas.

Cultura DevOps: código, infraestrutura e deploy integrados.

Separação de ambientes: evita impacto em produção.


Segue Arquiterura do Projeto 
![alt text](image.png)


=> Organizando o Visual do app

🛠 Passo 1 — Criar estrutura visual com Tailwind
Vamos usar componentes claros e bem separados :

Header com título do sistema e saudação

Seção de Tarefas com lista, checkbox, botão excluir

Formulário de Nova Tarefa com input + botão

Scroll adaptável para quando houver muitas tarefas

Cores e bordas para dar contraste

📄 src/App.js ⇒ atualizando pelo layout final mockado:



import React, { useState, useEffect } from 'react';

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

  const login = () => {
    if (username.trim()) {
      localStorage.setItem('username', username);
      setLoggedIn(true);
    }
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const updated = [...tasks, { id: Date.now(), text: newTask, done: false }];
    setTasks(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
    setNewTask('');
  };

  const toggleTask = (id) => {
    const updated = tasks.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    setTasks(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
  };

  const deleteTask = (id) => {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
  };

  if (!loggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
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

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <header className="max-w-4xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Painel de Tarefas</h1>
        <span className="text-gray-600">Olá, {username}</span>
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
          className="bg-green-600 px-4 text-white rounded-r hover:bg-green-700"
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
                  className="text-red-500 hover:underline text-sm"
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


🛠 Passo 2 — Testar localmente
Salvar o arquivoApp.js

No terminal, digitar:
cd frontend
npm start

Testar:

Conecte-se

Adicionar tarefas

Marcar como concluído

Remover tarefas

Fechar e reabrir navegador (tarefas devem persistir via localStorage)

=> Testes concluídos com sucesso, para essa etapa  :)

