DreamSquad App — Painel de Tarefas + Chat Interno

Aplicação web fullstack com Frontend em React e Backend em Go, projetada para ser hospedada em infraestrutura de nuvem de baixo custo usando AWS S3, Lambda, API Gateway e Terraform.

O objetivo é fornecer um painel de tarefas interno integrado a um chat de equipe, priorizando baixo custo operacional, separação de ambientes (teste/produção) e infraestrutura automatizada.

🎯 Objetivos do Projeto
Criar uma aplicação responsiva e ágil para gerenciamento interno de tarefas e comunicação.

Utilizar React no frontend e Go no backend para maximizar performance e escalabilidade.

Garantir custo próximo de zero usando o Free Tier da AWS.

Utilizar Terraform para provisionar infraestrutura como código, com deploy automatizado.

Hospedar frontend e backend em S3 e serviços AWS de baixo custo.

Separar ambientes de teste e produção para segurança e flexibilidade.

Documentar todo o processo para permitir replicação e manutenção futura.


🛠️ Stack Tecnológica

Frontend

React (Create React App)
TailwindCSS (estilização utilitária)
PostCSS + Autoprefixer


Backend

Go (API para gerenciamento de tarefas e chat)
Comunicação REST/JSON para integração com o frontend
Infraestrutura e Deploy
AWS S3 (Frontend estático)
AWS Lambda + API Gateway (Backend serverless)
AWS DynamoDB (armazenamento)
Terraform (infraestrutura como código)
Git (controle de versão e integração contínua futura)


Infraestrutura e Deploy

AWS S3 (hospedagem estática e backend serverless)
AWS Lambda + API Gateway (execução do backend sob demanda)
Terraform (Infraestrutura como código)
GitHub/GitLab (controle de versão e CI/CD futuro)



🎨 Estilização e Organização do Frontend
A camada visual utiliza TailwindCSS, garantindo velocidade no desenvolvimento e consistência no design.

Configuração

Tailwind integrado ao Create React App via PostCSS e Autoprefixer.
Diretivas @tailwind base;, @tailwind components; e @tailwind utilities; aplicadas no src/index.css.
tailwind.config.js configurado para purge automático, reduzindo tamanho final do CSS.

Organização

Classes utilitárias diretamente no JSX para prototipagem rápida.
Componentes reutilizáveis para botões, formulários e layouts recorrentes.
Paleta de cores e tipografia definidas no tailwind.config.js para manter padrão visual.
Logo da empresa inserida no cabeçalho do painel, reforçando identidade visual.
Essa abordagem reduz sobrecarga de manutenção, facilita evolução do design e mantém o projeto leve e performático.


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
Status: Concluído.

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

=> A aplicação estará disponível em: http://localhost:3000


📅 Próximos Passos

Finalizar layout do painel de tarefas. (conclúdo)
Criar backend em Go e endpoints REST.
Testar integração localmente.
Configurar Terraform para AWS S3 (frontend) e Lambda/API Gateway (backend).
Garantir ambientes separados (teste/produção).
Documentar custos e otimizações.


💡 Diferenciais do Projeto

Baixo custo: uso de do provider AWS Cloud e suas ferramentas S3, Lambda que elimina custos fixos de servidores.
Escalabilidade: Go e React permitem lidar com alto volumes de usuários.
Cultura DevOps: ciclo completo (código → infraestrutura → deploy) documentado e automatizado.
Separação de ambientes: evita impacto em produção durante testes.


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

Backend em Go para Painel de Tarefas + Chat

1️⃣ Estrutura inicial do backend
Criei a pasta do backend no projeto
No terminal, dentro da raiz do projeto (onde está o frontend também):

  mkdir backend
  cd backend


Iniciei um módulo Go novo

1. Verifiquei se o Go está instalado
Abra um novo terminal (PowerShell ou Prompt de Comando) e digitei:

go version

2. Instale o Go (se ainda não tiver instalado)
Baixe o instalador oficial do Go para Windows nesta página:
https://go.dev/dl/

Escolha a versão estável para Windows (geralmente .msi)

Execute o instalador e siga as instruções.

3. Verifique se o PATH está configurado
O instalador normalmente adiciona o Go ao PATH automaticamente.

Para conferir:

Abra o Painel de Controle → Sistema → Configurações avançadas do sistema → aba Avançado → clique em Variáveis de Ambiente .

Na seção "Variáveis do sistema", encontre uma variável Pathe edite para garantir que o caminho para a pasta bin do Go esteja lá, algo como:

texto
C:\Go\bin
Depois de ajustar, feche e abra o terminal novamente para que o PATH seja recarregado.

4. Teste novamente no terminal
Abra PowerShell ou Prompt de Comando novo e rode:

texto
go version
Se mostrar a versão do Go, você está pronto para usar comandos gocomo go mod init.

Precisei instalar o Go também nas dependências do VSCode para finalizar a utilização do mesmo.

Próximos passos depois de concordar o Go
Vá para a massa backend:

texto
cd C:\DreamSquad\dreamsquad-app\backend
Rode o comando para inicializar o módulo Go:

texto
go mod init github.com/PattySousa/dreamsquad-backend

Em seguida, criei uma pasta main.go dentro da pasta backend.

Colei o seguinte script no main.go 

package main

import (
    "encoding/json"
    "log"
    "net/http"
    "sync"
)

// Estrutura de uma tarefa
type Task struct {
    ID   int    `json:"id"`
    Text string `json:"text"`
    Done bool   `json:"done"`
}

var (
    tasks  []Task
    nextID = 1
    mu     sync.Mutex
)

// Listar tarefas
func listTasks(w http.ResponseWriter, r *http.Request) {
    mu.Lock()
    defer mu.Unlock()
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(tasks)
}

// Criar nova tarefa
func createTask(w http.ResponseWriter, r *http.Request) {
    var t Task
    if err := json.NewDecoder(r.Body).Decode(&t); err != nil {
        http.Error(w, "Requisição inválida", http.StatusBadRequest)
        return
    }
    mu.Lock()
    t.ID = nextID
    nextID++
    tasks = append(tasks, t)
    mu.Unlock()
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(t)
}

// Função principal - inicia servidor
func main() {
    http.HandleFunc("/tasks", func(w http.ResponseWriter, r *http.Request) {
        switch r.Method {
        case "GET":
            listTasks(w, r)
        case "POST":
            createTask(w, r)
        default:
            http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
        }
    })

    log.Println("🚀 Servidor backend rodando em http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

Salvei o arquivo e no terminal do PowerShell, entrei na pasta do backend

   CD Backend


Em seguida, já dentro da pasta do Backend, rodei: 

  go run main.go

Aceitar a permissão de sistema e em seguida, aparecerá no terminal:

2025/08/11 10:02:56 Servidor rodando em http://localhost:8080
(data e hora e a confirmação que está rodando no localhost)

✅ O que isso significa
O backend está ativo, pronto para responder aos endpoints que foram criados.

Podemos testar as rotas no navegador, Postman ou Insomnia.

Caso opte por Postman, esse é link 
https://www.postman.com/ e o Insomnia, esse e o link https://insomnia.rest/download 

Baixei ambos, mas achei o Insomnia mais intuitivo.

Após o download, abri o terminal do Insomnia, na parte de URL, colei http://127.0.0.1:8080/tasks e selecionei o método POST, na opção Body, selecionei a opção de script JSON, colei o seguinte script 
   {
     "text": "Minha primeira tarefa",
     "done": false
   }

Após envio no botão Send, recebi o retorno, o Preview: 

    {
    	"id": 1,
	    "text": "Minha primeira tarefa",
	    "done": false
    }

O que comprova que o backend Go está funcionando.
O endpoint POST /tasks aceita e processa tarefas novas;
As tarefas são armazenadas em memória.

Para fazer uma requisição GET usando o Insomnia para o backend Go, segui estes passos:

Abra o Insomnia.

Criei uma nova requisição clicando no botão de "+" e escolhei "HTTP Request".

Dei uma nome para a requisição, por exemplo, "Listar Tarefas".

No campo de URL, digitar seu endpoint de GET, que no meu caso é:

text
http://127.0.0.1:8080/tasks

Certifique-se de que o método da requisição está selecionado como GET (tem um dropdown próximo ao campo de URL para escolher).

Clique no botão Send para enviar a requisição.

Você verá a resposta da sua API na parte direita da tela, que deve ser um array JSON de tarefas, como:

json
[
  {
    "id": 1,
    "text": "Minha primeira tarefa",
    "done": false
  },
  ...
]

Esse processo faz a requisição GET ao seu backend para buscar a lista de tarefas.

![alt text](<Captura de Tela (1646)-1.png>)


