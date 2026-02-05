# 🎯 Development Team - OpenClaw

Seu time de desenvolvimento completo com 3 agentes especializados para criar, testar e manter aplicações Next.js + Node.js + MongoDB.

## 👥 Team Members

### 1. **Frontend Engineer** (Next.js)
**Skill:** `frontend-nextjs`  
**Responsabilidades:**
- Scaffolding de projetos Next.js
- Criação de componentes React (TypeScript)
- Implementação de routing e layouts
- Otimização de performance (images, bundle, SEO)
- Testes unitários (Jest + React Testing Library)
- Integração com APIs backend
- State management (Zustand)

**Quando usar:**
```
"Crie um componente de login responsivo"
"Adicione autenticação via JWT na aplicação"
"Otimize as imagens da landing page"
"Implemente infinite scroll na lista de produtos"
"Configure dark mode com Tailwind"
```

---

### 2. **Backend Engineer** (Node.js + MongoDB)
**Skill:** `backend-nodejs-mongo`  
**Responsabilidades:**
- Criação de APIs REST
- Design de schemas MongoDB
- Autenticação (JWT, bcrypt)
- Validação e middleware
- Queries otimizadas com indexes
- Rate limiting e segurança
- Testes de integração com Jest

**Quando usar:**
```
"Crie um endpoint POST /api/products com validação"
"Implemente autenticação via JWT"
"Otimize a query de produtos com indexes"
"Configure pagination na lista de usuários"
"Adicione rate limiting na API"
```

---

### 3. **QA Engineer** (Web Testing)
**Skill:** `qa-web-testing`  
**Responsabilidades:**
- Testes E2E com Playwright
- Testes unitários de componentes
- Testes de integração de APIs
- Testes de acessibilidade (a11y)
- Testes de performance
- Regression visual testing
- CI/CD pipelines (GitHub Actions)

**Quando usar:**
```
"Crie testes E2E para o fluxo de checkout"
"Valide se o login funciona em mobile"
"Teste acessibilidade da homepage"
"Implemente testes de performance"
"Configure GitHub Actions para CI/CD"
```

---

## 🚀 Como Usar o Time

### Comando Básico - Spawn Agent

```bash
# Frontend
openclaw spawn task="Crie um componente de Card responsivo com TypeScript" --agentId=frontend --label="Feature: Card Component"

# Backend
openclaw spawn task="Implemente endpoint GET /api/products com paginação" --agentId=backend --label="API: Products List"

# QA
openclaw spawn task="Crie testes E2E para o fluxo de login" --agentId=qa --label="Tests: Authentication"
```

### Via Sessions (em outra aba/sessão)

```bash
# Enviar mensagem a um agente específico
openclaw sessions send --label="frontend" --message="Crie um formulário de cadastro com validação"
```

---

## 📋 Fluxo Típico de Desenvolvimento

### 1️⃣ **Planejamento**
```
Você → Frontend, Backend, QA
"Vamos criar um sistema de carrinho de compras"
```

### 2️⃣ **Backend Prepara API**
```
Você → Backend
"Crie os endpoints POST/GET/DELETE para cart items com MongoDB"
```

### 3️⃣ **Frontend Consome API**
```
Você → Frontend
"Implemente a UI do carrinho consumindo os endpoints que o Backend criou"
```

### 4️⃣ **QA Valida Tudo**
```
Você → QA
"Crie testes E2E para adicionar item ao carrinho, modificar quantidade e remover"
```

---

## 💡 Exemplos de Tarefas Reais

### Exemplo 1: Nova Feature (Blog)

```
👤 Você:
"Vamos criar um blog. Backend: crie schema de Post com title, content, author, timestamps.
Frontend: crie página de listagem e detalhe. QA: teste CRUD completo."

🎨 Frontend:
- Componentes: PostCard, PostDetail, PostList
- Página: /blog, /blog/[id]
- Integração com API

⚙️ Backend:
- Model: Post (MongoDB)
- Routes: GET/POST/PUT/DELETE /api/posts
- Validação com Zod

✅ QA:
- E2E: criar, editar, deletar post
- Mobile responsiveness
- Performance dos endpoints
```

### Exemplo 2: Bug Fix

```
👤 Você:
"Usuários estão vendo erro 500 ao fazer login. Debugar!"

⚙️ Backend:
- Verifica logs, testa endpoint /api/auth/login
- Encontra bug na validação de email
- Corrige e testa com curl

🎨 Frontend:
- Verifica se erro está sendo tratado no formulário
- Melhora mensagens de erro

✅ QA:
- Testa login com vários cenários
- Valida mensagens de erro são claras
```

---

## 🔧 Configuração do Team

### Variáveis de Ambiente Compartilhadas

Todos os agentes usam:
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dev
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NODE_ENV=development
```

### Tech Stack Padrão

**Frontend:**
- Next.js 14+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS
- React Hook Form + Zod
- Zustand
- Axios

**Backend:**
- Node.js 18+
- Express 4+
- MongoDB + Mongoose
- TypeScript
- JWT + bcryptjs
- Express Validator

**Testing:**
- Playwright (E2E)
- Jest (Unit)
- React Testing Library
- Supertest (API Integration)
- Axe (Accessibility)

---

## 📊 Métricas e Qualidade

O QA Engineer deveria manter:
- ✅ **Coverage de testes:** >80%
- ✅ **E2E coverage:** Fluxos críticos (auth, checkout, etc)
- ✅ **Performance:** LCP <2.5s, FCP <1.8s
- ✅ **Accessibility:** WCAG 2.1 AA
- ✅ **Bugs em produção:** <1% defect escape rate

---

## 🎓 Learning Resources (Built-in)

Cada skill tem documentação completa com:
- Exemplos de código prontos para copiar
- Configurações recomendadas
- Troubleshooting
- Best practices

---

## 🔄 Continuous Improvement

**Semanalmente:**
1. QA gera relatório de testes (coverage, failures)
2. Backend otimiza queries mais lentas
3. Frontend mede performance com Lighthouse
4. Time discute melhorias de arquitetura

**Mensalmente:**
1. Upgrade de dependências
2. Code review de padrões
3. Treinamento em novas features das stacks

---

## 📞 Exemplos de Comandos Práticos

### Criar um projeto do zero
```bash
# 1. Backend setup
openclaw spawn task="Crie um projeto Node.js com Express, MongoDB e autenticação JWT" --agentId=backend --label="Project: Init Backend"

# 2. Frontend setup
openclaw spawn task="Crie projeto Next.js com Tailwind, autenticação e integração API" --agentId=frontend --label="Project: Init Frontend"

# 3. Test setup
openclaw spawn task="Configure Playwright, Jest e CI/CD no projeto" --agentId=qa --label="Project: Init Tests"
```

### Feature Development
```bash
# Feature: Product Listing
openclaw spawn task="[Backend] Crie endpoints de listagem de produtos com filtros e paginação" --agentId=backend
openclaw spawn task="[Frontend] Crie página de produtos com filtros, busca e paginação" --agentId=frontend
openclaw spawn task="[QA] Teste E2E de busca, filtros e paginação de produtos" --agentId=qa
```

### Pre-deployment
```bash
# Ensure everything is ready
openclaw spawn task="Execute testes E2E completos, coverage >80%, sem console errors" --agentId=qa
openclaw spawn task="Run build, type-check, otimizar bundle" --agentId=frontend
openclaw spawn task="Run tests, valide índices de DB, valide rate limiting" --agentId=backend
```

---

## 🎉 Next Steps

1. **Defina seu projeto:** Qual é a aplicação que quer criar?
2. **Spawn cada agente:** Comece com backend (data model), depois frontend (UI), depois QA (tests)
3. **Acompanhe:** Use `openclaw sessions list` para ver progresso
4. **Integre:** Combine outputs dos agentes

**Bora codar! 🚀**
