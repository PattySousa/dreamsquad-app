package main

import (
    "encoding/json"
    "log"
    "net/http"
    "sync"
)

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

func listTasks(w http.ResponseWriter, r *http.Request) {
    mu.Lock()
    defer mu.Unlock()
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(tasks)
}

func createTask(w http.ResponseWriter, r *http.Request) {
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
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(t)
}

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

    log.Println("Servidor rodando em http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
