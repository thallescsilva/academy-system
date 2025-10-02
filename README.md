# Sistema de Administração Acadêmica

Sistema web completo para administração de alunos, professores e cursos, desenvolvido com Quarkus (Java 21) no backend e Angular 15+ no frontend.

## 🏗️ Arquitetura

- **Backend**: Quarkus (Java 21) com JPA/Hibernate
- **Frontend**: Angular 15+ (standalone)
- **Banco de Dados**: PostgreSQL
- **Autenticação**: Keycloak
- **Orquestração**: Docker Compose

## 📁 Estrutura do Projeto

```
/projeto-academico
│
├─ backend/                 # Aplicação Quarkus (Java 21)
│   ├─ src/main/java/com/academico/
│   │   ├─ controller/      # REST Controllers
│   │   ├─ service/         # Regras de negócio
│   │   ├─ repository/      # Repositórios JPA
│   │   ├─ entity/          # Entidades JPA
│   │   ├─ dto/             # Data Transfer Objects
│   │   └─ mapper/          # MapStruct Mappers
│   └─ resources/
│       └─ application.properties
│
├─ frontend/                # Aplicação Angular 15+ (standalone)
│   ├─ src/app/
│   │   ├─ modules/
│   │   │   ├─ admin/       # CRUD de usuários
│   │   │   ├─ coordinator/ # CRUD cursos, semestres, disciplinas
│   │   │   └─ student/     # Visualização de matriz curricular
│   │   ├─ shared/          # Componentes reutilizáveis, serviços
│   │   └─ app.module.ts
│   └─ index.html
│
├─ docker-compose.yml
└─ README.md
```

## 🚀 Como Executar

### Pré-requisitos
- Docker e Docker Compose
- Git

### Execução via Docker

1. Clone o repositório:
```bash
git clone <repository-url>
cd projeto-academico
```

2. Execute a aplicação:
```bash
docker-compose up -d
```

3. Acesse as aplicações:
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:8080
- **Keycloak**: http://localhost:8081
- **Banco de Dados**: localhost:5432

### Usuários para Teste

#### Admin
- **Email**: admin@academico.com
- **Senha**: admin123
- **Papel**: ADMIN

#### Coordenador
- **Email**: coordenador@academico.com
- **Senha**: coord123
- **Papel**: COORDINATOR

#### Professor
- **Email**: professor@academico.com
- **Senha**: prof123
- **Papel**: PROFESSOR

#### Aluno
- **Email**: aluno@academico.com
- **Senha**: aluno123
- **Papel**: STUDENT

## 🔧 Tecnologias Utilizadas

### Backend
- **Java 21**
- **Quarkus Framework**
- **JPA/Hibernate**
- **MapStruct** (mapeamento DTO ↔ Entity)
- **Keycloak** (autenticação/autorização)
- **PostgreSQL**

### Frontend
- **Angular 15+ (standalone)**
- **Angular Material**
- **RxJS**
- **TypeScript**

### DevOps
- **Docker**
- **Docker Compose**
- **Nginx** (servir frontend)

## 📋 Funcionalidades

### Visão de Administrador
- ✅ CRUD completo de usuários
- ✅ Gerenciamento de papéis
- ✅ Dashboard administrativo

### Visão de Coordenador
- ✅ CRUD de cursos
- ✅ CRUD de semestres
- ✅ CRUD de disciplinas
- ✅ Montagem da matriz curricular
- ✅ Dashboard de coordenação

### Visão de Professor/Aluno
- ✅ Visualização da matriz curricular
- ✅ Dashboard personalizado
- ✅ Navegação por semestres

## 🔐 Segurança

- Autenticação via Keycloak
- Autorização baseada em papéis (RBAC)
- JWT tokens
- CORS configurado
- Validação de entrada

## 🧪 Testes

### Backend
```bash
# Executar todos os testes
cd backend
./mvnw test

# Executar testes específicos
./mvnw test -Dtest=UserServiceTest
./mvnw test -Dtest=CourseServiceTest

# Executar com cobertura
./mvnw test jacoco:report
```

### Frontend
```bash
# Executar testes unitários
cd frontend
npm test

# Executar testes com cobertura
npm run test:coverage

# Executar testes e2e
npm run e2e
```

### Testes via Docker
```bash
# Executar testes do backend
docker-compose exec backend ./mvnw test

# Executar testes do frontend
docker-compose exec frontend npm test
```

## 📊 Endpoints da API

### Autenticação
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout
- `GET /auth/user` - Dados do usuário

### Usuários (Admin)
- `GET /api/users` - Listar usuários
- `POST /api/users` - Criar usuário
- `PUT /api/users/{id}` - Atualizar usuário
- `DELETE /api/users/{id}` - Remover usuário

### Cursos (Coordenador)
- `GET /api/courses` - Listar cursos
- `POST /api/courses` - Criar curso
- `PUT /api/courses/{id}` - Atualizar curso
- `DELETE /api/courses/{id}` - Remover curso

### Semestres (Coordenador)
- `GET /api/semesters` - Listar semestres
- `POST /api/semesters` - Criar semestre
- `PUT /api/semesters/{id}` - Atualizar semestre
- `DELETE /api/semesters/{id}` - Remover semestre

### Disciplinas (Coordenador)
- `GET /api/disciplines` - Listar disciplinas
- `POST /api/disciplines` - Criar disciplina
- `PUT /api/disciplines/{id}` - Atualizar disciplina
- `DELETE /api/disciplines/{id}` - Remover disciplina

### Matriz Curricular
- `GET /api/curriculum` - Visualizar matriz curricular
- `POST /api/curriculum` - Montar matriz curricular
- `PUT /api/curriculum/{id}` - Atualizar matriz curricular

## 🎨 Design e UX

- Interface responsiva (mobile-first)
- Material Design
- Navegação intuitiva
- Feedback visual consistente
- Loading states
- Tratamento de erros

## 📝 Decisões Técnicas

### Backend
- **Quarkus**: Framework moderno, startup rápido, ideal para microserviços
- **MapStruct**: Geração de código para mapeamento, performance superior
- **JPA**: Padrão ORM, facilita manutenção
- **Keycloak**: Solução robusta para autenticação/autorização

### Frontend
- **Angular Standalone**: Arquitetura mais simples, tree-shaking melhor
- **Angular Material**: Componentes consistentes, acessibilidade
- **RxJS**: Programação reativa, melhor UX

### DevOps
- **Docker**: Isolamento, portabilidade, facilita deploy
- **PostgreSQL**: Banco robusto, ACID, JSON support

## 🔧 Troubleshooting

### Problemas Comuns

#### 1. Erro de conexão com Keycloak
```bash
# Verificar se o Keycloak está rodando
docker-compose ps keycloak

# Verificar logs
docker-compose logs keycloak

# Reiniciar Keycloak
docker-compose restart keycloak
```

#### 2. Erro de build do frontend
```bash
# Limpar cache do npm
cd frontend
rm -rf node_modules package-lock.json
npm install

# Rebuild do container
docker-compose build frontend
```

#### 3. Erro de conexão com PostgreSQL
```bash
# Verificar se o banco está rodando
docker-compose ps postgres

# Verificar logs
docker-compose logs postgres

# Reiniciar banco
docker-compose restart postgres
```

#### 4. Problemas com WSL2 no Windows
```bash
# Verificar se o WSL2 está ativo
wsl --list --verbose

# Reiniciar Docker Desktop
# Desabilitar e reabilitar WSL2 no Docker Desktop
```

#### 5. Fallback para Keycloak (se quay.io estiver bloqueado)
```yaml
# No docker-compose.yml, substitua:
# image: quay.io/keycloak/keycloak:22.0
# por:
image: bitnami/keycloak:22
```

### Provisioning Automático

O sistema inclui provisioning automático via `realm-export.json`:

- **Realm**: `academico`
- **Client**: `academico-backend` (confidencial)
- **Roles**: ADMIN, COORDINATOR, PROFESSOR, STUDENT
- **Usuários**: 4 usuários de teste pré-configurados

### Logs e Monitoramento

```bash
# Ver logs de todos os serviços
docker-compose logs

# Ver logs de um serviço específico
docker-compose logs backend
docker-compose logs frontend
docker-compose logs keycloak
docker-compose logs postgres

# Seguir logs em tempo real
docker-compose logs -f backend
```

### Backup e Restore

```bash
# Backup do banco
docker-compose exec postgres pg_dump -U academico academico > backup.sql

# Restore do banco
docker-compose exec -T postgres psql -U academico academico < backup.sql
```

## 🔄 Versionamento

- Commits semânticos
- Branches por feature
- Code review obrigatório
- CI/CD pipeline

### Padrão de Commits
```
feat: adicionar funcionalidade de CRUD de usuários
fix: corrigir erro de validação no formulário
docs: atualizar documentação da API
test: adicionar testes unitários para UserService
refactor: reorganizar estrutura de pastas
```

### Branches
- `main`: branch principal
- `develop`: branch de desenvolvimento
- `feature/*`: novas funcionalidades
- `bugfix/*`: correções de bugs
- `hotfix/*`: correções urgentes
