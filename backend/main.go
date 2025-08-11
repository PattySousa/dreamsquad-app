package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"sync"
)

// ==== Função para habilitar CORS ====
func enableCors(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

// ====== MODELO E LÓGICA DAS TAREFAS ======
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

func listTasks(w http.ResponseWriter, _ *http.Request) {
	enableCors(w)
	mu.Lock()
	defer mu.Unlock()

	if tasks == nil {
		tasks = []Task{}
	}

	log.Println("📋 Listando tarefas...")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tasks)
}

func createTask(w http.ResponseWriter, r *http.Request) {
	enableCors(w)
	var t Task
	if err := json.NewDecoder(r.Body).Decode(&t); err != nil {
		http.Error(w, "Request body inválido", http.StatusBadRequest)
		return
	}
	mu.Lock()
	t.ID = nextID
	nextID++
	tasks = append(tasks, t)
	mu.Unlock()

	log.Printf("✅ Nova tarefa criada (ID %d): %s\n", t.ID, t.Text)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(t)
}

// ====== MODELO E LÓGICA DO CHAT ======
type Message struct {
	ID      int    `json:"id"`
	User    string `json:"user"`
	Content string `json:"content"`
}

var (
	messages  []Message
	nextMsgID = 1
)

func listMessages(w http.ResponseWriter, _ *http.Request) {
	enableCors(w)
	mu.Lock()
	defer mu.Unlock()

	if messages == nil {
		messages = []Message{}
	}

	log.Println("💬 Listando mensagens...")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(messages)
}

func createMessage(w http.ResponseWriter, r *http.Request) {
	enableCors(w)
	var m Message
	if err := json.NewDecoder(r.Body).Decode(&m); err != nil {
		http.Error(w, "Request body inválido", http.StatusBadRequest)
		return
	}
	mu.Lock()
	m.ID = nextMsgID
	nextMsgID++
	messages = append(messages, m)
	mu.Unlock()

	log.Printf("✉ Nova mensagem criada (ID %d): %s - %s\n", m.ID, m.User, m.Content)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(m)
}

func deleteMessage(w http.ResponseWriter, r *http.Request) {
	enableCors(w)
	mu.Lock()
	defer mu.Unlock()

	idStr := r.URL.Query().Get("id")
	if idStr == "" {
		http.Error(w, "ID não informado", http.StatusBadRequest)
		return
	}

	id, err := strconv.Atoi(idStr) // conversão segura para número
	if err != nil {
		http.Error(w, "ID inválido", http.StatusBadRequest)
		return
	}

	found := false
	newMessages := []Message{}
	for _, msg := range messages {
		if msg.ID != id {
			newMessages = append(newMessages, msg)
		} else {
			found = true
		}
	}

	if !found {
		http.Error(w, "Mensagem não encontrada", http.StatusNotFound)
		return
	}

	messages = newMessages
	log.Printf("🗑 Mensagem ID %d deletada com sucesso\n", id)
	w.WriteHeader(http.StatusOK)
}

// ====== FUNÇÃO PRINCIPAL ======
func main() {
	// Rotas de tarefas
	http.HandleFunc("/tasks", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "OPTIONS" {
			enableCors(w)
			w.WriteHeader(http.StatusOK)
			return
		}
		switch r.Method {
		case "GET":
			listTasks(w, r)
		case "POST":
			createTask(w, r)
		default:
			http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		}
	})

	// Rotas de chat
	http.HandleFunc("/messages", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "OPTIONS" {
			enableCors(w)
			w.WriteHeader(http.StatusOK)
			return
		}
		switch r.Method {
		case "GET":
			listMessages(w, r)
		case "POST":
			createMessage(w, r)
		case "DELETE":
			deleteMessage(w, r)
		default:
			http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		}
	})

	log.Println("🚀 Servidor rodando em http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
