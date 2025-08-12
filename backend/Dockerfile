# Usa uma imagem oficial do Go para buildar o binário
FROM golang:1.24 AS builder

WORKDIR /app
COPY go.mod ./
# Comentado para evitar erro, já que não tem go.sum
# COPY go.sum ./
RUN go mod download

COPY . .
RUN go build -o server main.go

# Usa uma imagem enxuta só para rodar o binário (o resultado)
FROM debian:bookworm-slim

WORKDIR /app
COPY --from=builder /app/server .

EXPOSE 8080

CMD ["./server"]
