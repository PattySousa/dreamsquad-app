import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:8080"; // ajuste aqui se acessar por IP

export default function Chat({ username }) {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  // Carregar mensagens ao abrir
  useEffect(() => {
    fetch(`${API_URL}/messages`)
      .then((res) => res.json())
      .then((data) => {
        setMessages(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Erro ao buscar mensagens:", err);
        setMessages([]);
      });
  }, []);

  // Enviar nova mensagem
  const sendMessage = () => {
    if (!newMsg.trim()) return;

    fetch(`${API_URL}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: username,
        content: newMsg,
      }),
    })
      .then((res) => res.json())
      .then((msgCriada) => {
        if (msgCriada && msgCriada.id) {
          setMessages((prev) => [...prev, msgCriada]);
        }
        setNewMsg("");
      })
      .catch((err) => console.error("Erro ao enviar mensagem:", err));
  };

  // Função para deletar mensagem
  const deleteMessage = (id) => {
    console.log("🗑 Tentando apagar mensagem ID:", id);

    fetch(`${API_URL}/messages?id=${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setMessages((prev) => prev.filter((msg) => msg.id !== id));
          console.log("✅ Mensagem apagada com sucesso");
        } else {
          console.error("❌ Erro ao apagar mensagem. Status:", res.status);
        }
      })
      .catch((err) => console.error("Erro na requisição de apagar:", err));
  };

  return (
    <div className="bg-white shadow p-4 rounded max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-3">💬 Chat</h2>

      <div className="h-64 overflow-y-auto border p-2 mb-3">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((m) => (
            <div
              key={m.id}
              className="mb-2 flex justify-between items-center"
            >
              <span>
                <strong>{m.user}:</strong> {m.content}
              </span>
              <button
                onClick={() => deleteMessage(m.id)}
                className="text-pink-500 hover:underline text-sm"
              >
                Apagar
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nenhuma mensagem ainda.</p>
        )}
      </div>

      <div className="flex">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          className="border p-2 flex-grow rounded-l"
          placeholder="Digite sua mensagem..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
