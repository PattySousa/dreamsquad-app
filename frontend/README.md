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

