# Sistema de Administração Acadêmica

Sistema web completo para administração de alunos, professores e cursos que desenvolvi com Quarkus (Java 21) no backend e Angular 15+ no frontend.

## 🏗️ Arquitetura

- **Backend**: Quarkus (Java 21) com JPA/Hibernate
- **Frontend**: Angular 15+ (standalone components)
- **Banco de Dados**: PostgreSQL
- **Autenticação**: Mock (Keycloak desabilitado - veja seção "Desafios com Keycloak")
- **Orquestração**: Docker Compose

## 📁 Estrutura do Projeto

```
/
│
├─ backend/                 # Aplicação Quarkus (Java 21)
│   ├─ src/main/java/com/academy/
│   │   ├─ controller/      # REST Controllers
│   │   ├─ service/         # Regras de negócio
│   │   ├─ repository/      # Repositórios JPA Panache
│   │   ├─ entity/          # Entidades JPA
│   │   ├─ dto/             # Data Transfer Objects
│   │   ├─ mapper/          # MapStruct Mappers
│   │   └─ enums/           # Enumerações
│   ├─ src/test/java/       # Testes unitários e integração
│   └─ resources/
│       ├─ application.properties
│       └─ import.sql       # Dados de seed
│
├─ frontend/                # Aplicação Angular 15+ (standalone)
│   ├─ src/app/
│   │   ├─ modules/
│   │   │   ├─ admin/       # CRUD de usuários
│   │   │   ├─ coordinator/ # CRUD cursos, semestres, disciplinas, matriz
│   │   │   ├─ curriculum/  # Visualização de matriz (student/professor)
│   │   │   ├─ dashboard/   # Dashboard por papel
│   │   │   └─ auth/        # Login
│   │   ├─ shared/          # Componentes, serviços, guards
│   │   │   ├─ components/  # Componentes reutilizáveis
│   │   │   ├─ services/    # Serviços HTTP
│   │   │   ├─ guards/      # Route Guards
│   │   │   ├─ models/      # Interfaces TypeScript
│   │   │   └─ interceptors/# HTTP Interceptors
│   │   └─ app.component.ts
│   └─ nginx.conf
│
├─ keycloak/
│   └─ realm-export.json    # Configuração Keycloak (não utilizado)
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
git clone https://github.com/thallescsilva/academy-system.git
cd academy-system
```

2. Execute a aplicação:
```bash
docker-compose up -d
```

3. Aguarde todos os serviços iniciarem (aproximadamente 1-2 minutos)

4. Acesse as aplicações:
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:8080/api
- **Swagger UI**: http://localhost:8080/q/swagger-ui
- **Banco de Dados**: localhost:5432

### Credenciais para Teste

O sistema utiliza autenticação mock baseada no email. Você pode fazer login com qualquer um dos seguintes emails:

#### Admin
- **Email**: admin@academico.com
- **Senha**: qualquer senha (mock)
- **Papel**: ADMIN

#### Coordenador
- **Email**: coordenador@academico.com
- **Senha**: qualquer senha (mock)
- **Papel**: COORDINATOR

#### Professor
- **Email**: professor@academico.com
- **Senha**: qualquer senha (mock)
- **Papel**: PROFESSOR

#### Aluno
- **Email**: aluno@academico.com
- **Senha**: qualquer senha (mock)
- **Papel**: STUDENT

> **Nota**: A autenticação está em modo mock. O papel do usuário é determinado automaticamente pelo prefixo do email (admin, coordenador, professor, ou student/aluno).

## 🔧 Tecnologias Utilizadas

### Backend
- **Java 21**
- **Quarkus Framework 3.6.0**
- **JPA/Hibernate com Panache**
- **MapStruct 1.5.5**
- **PostgreSQL 15**
- **Flyway**
- **Hibernate Validator**
- **OpenAPI/Swagger**
- **JUnit 5 + RestAssured**

### Frontend
- **Angular 15+**
- **Angular Material**
- **RxJS**
- **TypeScript 4.9**
- **Karma/Jasmine**

### DevOps
- **Docker & Docker Compose**
- **Nginx**
- **Multi-stage Docker builds**

## 📋 Funcionalidades Implementadas

### Visão de Administrador (ADMIN)
- ✅ CRUD completo de usuários
- ✅ Gerenciamento de papéis (ADMIN, COORDINATOR, PROFESSOR, STUDENT)
- ✅ Ativar/Desativar usuários
- ✅ Dashboard com estatísticas
- ✅ Dialogs para criar/editar usuários

### Visão de Coordenador (COORDINATOR)
- ✅ CRUD completo de cursos
- ✅ CRUD completo de semestres
- ✅ CRUD completo de disciplinas
- ✅ Visualização da matriz curricular
- ✅ Dashboard com informações dos cursos
- ✅ Dialogs para criar/editar entidades

### Visão de Professor/Aluno (PROFESSOR/STUDENT)
- ✅ Visualização da matriz curricular do seu curso
- ✅ Detalhes de disciplinas
- ✅ Dashboard personalizado
- ✅ Navegação por semestres

### Funcionalidades Gerais
- ✅ Autenticação com persistência (localStorage)
- ✅ Navegação baseada em papéis
- ✅ Interface responsiva (mobile-first)
- ✅ Loading states e feedback visual
- ✅ Tratamento de erros consistente
- ✅ Validação de formulários
- ✅ Confirmação de ações destrutivas

## 📊 Endpoints da API

### Usuários (ADMIN)
- `GET /api/users` - Listar todos os usuários
- `GET /api/users/{id}` - Buscar usuário por ID
- `GET /api/users/active` - Listar usuários ativos
- `GET /api/users/role/{role}` - Buscar por papel
- `GET /api/users/search?name={name}` - Buscar por nome
- `POST /api/users` - Criar usuário
- `PUT /api/users/{id}` - Atualizar usuário (password opcional)
- `DELETE /api/users/{id}` - Remover usuário permanentemente

### Cursos (COORDINATOR)
- `GET /api/courses` - Listar todos os cursos
- `GET /api/courses/{id}` - Buscar curso por ID
- `GET /api/courses/active` - Listar cursos ativos
- `POST /api/courses` - Criar curso
- `PUT /api/courses/{id}` - Atualizar curso
- `DELETE /api/courses/{id}` - Remover curso permanentemente

### Semestres (COORDINATOR)
- `GET /api/semesters` - Listar todos os semestres
- `GET /api/semesters/{id}` - Buscar semestre por ID
- `GET /api/semesters/course/{courseId}` - Listar por curso
- `POST /api/semesters` - Criar semestre
- `PUT /api/semesters/{id}` - Atualizar semestre
- `DELETE /api/semesters/{id}` - Remover semestre

### Disciplinas (COORDINATOR)
- `GET /api/disciplines` - Listar todas as disciplinas
- `GET /api/disciplines/{id}` - Buscar disciplina por ID
- `GET /api/disciplines/semester/{semesterId}` - Listar por semestre
- `POST /api/disciplines` - Criar disciplina
- `PUT /api/disciplines/{id}` - Atualizar disciplina
- `DELETE /api/disciplines/{id}` - Remover disciplina

### Matriz Curricular (COORDINATOR, PROFESSOR, STUDENT)
- `GET /api/curricula` - Listar toda a matriz
- `GET /api/curricula/{id}` - Buscar item por ID
- `GET /api/curricula/student/{studentId}` - Matriz do aluno
- `POST /api/curricula` - Adicionar disciplina à matriz
- `PUT /api/curricula/{id}` - Atualizar item da matriz
- `DELETE /api/curricula/{id}` - Remover item da matriz

## 🔐 Segurança

**Estado Atual:**
- ✅ Validação de entrada nos DTOs
- ✅ CORS que configurei
- ✅ SQL Injection prevenido (JPA/Panache)
- ✅ Autenticação mock com persistência (localStorage)
- ⚠️ **Keycloak desabilitado** (veja seção "Desafios com Keycloak")

**Observação de Segurança:**
> Configurei a aplicação com autenticação mock para fins de demonstração. Em produção, recomendo habilitar o Keycloak ou outra solução de autenticação robusta.

## 🚧 Desafios com Keycloak

Durante o desenvolvimento, tentei integrar o Keycloak para autenticação e autorização. A configuração foi bem-sucedida no **backend**, com:

✅ **Backend Keycloak (Sucesso):**
- Realm `academico` que configurei
- Client `academico-backend` (confidencial)
- 4 papéis (ADMIN, COORDINATOR, PROFESSOR, STUDENT)
- 4 usuários de teste que pré-configurei
- Endpoints protegidos com `@RolesAllowed`
- Validação de JWT funcionando

❌ **Frontend Keycloak (Problemas Encontrados):**

### Problema 1: CORS e Redirecionamento
- **Descrição**: Ao tentar fazer login, o frontend redirecionava para o Keycloak, mas ocorriam erros de CORS
- **Tentativas**: Configuração de `webOrigins`, `redirectUris`, atributos CORS no realm
- **Resultado**: Parcialmente resolvido, mas com comportamento inconsistente

### Problema 2: Integração keycloak-js
- **Descrição**: Biblioteca `keycloak-js` não conseguia inicializar corretamente com o adapter do Quarkus
- **Erro**: `Failed to load user profile` e `ERR_NAME_NOT_RESOLVED` para `http://keycloak:8080`
- **Motivo**: Hostname `keycloak` válido apenas dentro da rede Docker, não acessível do browser

### Problema 3: Endpoints de Perfil
- **Descrição**: Chamadas para `/realms/academico/account` retornavam 401 Unauthorized
- **Tentativa**: Modificar para usar `tokenParsed` diretamente
- **Resultado**: Melhorou, mas nome do usuário não era extraído corretamente

### Problema 4: Direct Access Grants
- **Descrição**: Tentativa de login direto com credenciais (sem redirecionamento)
- **Configuração**: `directAccessGrantsEnabled: true`
- **Resultado**: Funcionalidade não implementada completamente

### Solução Adotada
Devido aos problemas de integração frontend-backend com Keycloak e limitações de tempo, optei por:

1. **Desabilitar Keycloak** no backend (comentado em `application.properties` e `pom.xml`)
2. **Implementar autenticação mock** no frontend (`KeycloakService` com localStorage)
3. **Manter configuração Keycloak** documentada para referência futura (`keycloak/realm-export.json`)

### Próximos Passos para Keycloak
Para reabilitar Keycloak em produção:

1. Descomentar dependências em `backend/pom.xml`:
```xml
<dependency>
  <groupId>io.quarkus</groupId>
  <artifactId>quarkus-oidc</artifactId>
</dependency>
<dependency>
  <groupId>io.quarkus</groupId>
  <artifactId>quarkus-keycloak-authorization</artifactId>
</dependency>
```

2. Descomentar configuração em `backend/src/main/resources/application.properties`:
```properties
quarkus.oidc.auth-server-url=http://localhost:8081/realms/academico
quarkus.oidc.client-id=academico-backend
quarkus.oidc.application-type=web-app
```

3. Reabilitar `@RolesAllowed` nos controllers
4. Configurar frontend para usar Keycloak público (não hostname Docker)
5. Implementar refresh token e tratamento de sessão expirada

## 🧪 Testes

### Backend
```bash
# Executar todos os testes
cd backend
./mvnw test

# Executar testes específicos
./mvnw test -Dtest=UserServiceTest
./mvnw test -Dtest=CourseServiceTest

# Com cobertura (se configurado)
./mvnw test jacoco:report
```

**Testes que Implementei:**
- ✅ Testes unitários de entidades
- ✅ Testes de serviços (UserService, CourseService, etc.)
- ✅ Testes de DTOs
- ✅ Testes de enums
- ✅ Testes de integração (BackendIntegrationTest)

### Frontend
```bash
# Executar testes unitários
cd frontend
npm test

# Com cobertura
npm run test:coverage
```

**Testes que Implementei:**
- ✅ Testes de modelos
- ✅ Testes de serviços
- ✅ Testes de componentes
- ✅ Testes de integração

## 🎨 Design e UX

### Princípios de Design
- **Mobile-First**: Interface responsiva que se adapta a diferentes tamanhos de tela
- **Material Design**: Componentes do Angular Material para consistência visual
- **Feedback Visual**: Loading spinners, mensagens de sucesso/erro, confirmações
- **Acessibilidade**: Labels, ARIA attributes, navegação por teclado

### Melhorias de UX Implementadas
- ✅ Persistência de sessão (localStorage)
- ✅ Navegação contextual baseada no papel do usuário
- ✅ Dialogs modais para criar/editar
- ✅ Confirmação de exclusão
- ✅ Estados de loading
- ✅ Tratamento de erros com mensagens amigáveis
- ✅ Menu lateral com bordas suaves

## 📝 Decisões Técnicas

### Backend
- **Quarkus**: Framework moderno com startup rápido, ideal para cloud-native applications
- **JPA Panache**: Simplifica repositórios com pattern Active Record
- **MapStruct**: Mapeamento DTO ↔ Entity com geração de código em compile-time (performance)
- **DTOs separados**: `UserDTO` (create) e `UserUpdateDTO` (update sem password obrigatório)
- **Validação**: Bean Validation (JSR-380) para validação declarativa
- **OpenAPI**: Documentação automática da API com Swagger UI

### Frontend
- **Standalone Components**: Arquitetura mais simples, melhor tree-shaking, futuro do Angular
- **Angular Material**: Componentes prontos, acessíveis, tema personalizável
- **RxJS**: Programação reativa para melhor UX (loading states, cancelamento de requests)
- **Services**: Separação de lógica de negócio dos componentes
- **Guards**: Proteção de rotas baseada em autenticação e papel
- **Interceptors**: Tratamento centralizado de erros HTTP

### DevOps
- **Docker Compose**: Orquestração simples para desenvolvimento
- **Multi-stage builds**: Otimização do tamanho das imagens
- **PostgreSQL**: Banco robusto, ACID compliant, suporte a JSON
- **Nginx**: Servidor web leve e eficiente para servir o frontend

### Arquitetura de Código
- **Package by Feature**: Organização por funcionalidade (não por tipo de classe)
- **DTO Pattern**: Separação entre camada de apresentação e domínio
- **Service Layer**: Lógica de negócio centralizada
- **Repository Pattern**: Abstração de acesso a dados

## 🚀 Possíveis Melhorias Futuras

### Segurança e Autenticação
- [ ] Reabilitar e corrigir integração com Keycloak
- [ ] Implementar refresh token automático
- [ ] Adicionar 2FA (autenticação de dois fatores)
- [ ] Implementar rate limiting para prevenir brute force
- [ ] Adicionar logs de auditoria (quem fez o quê e quando)

### Funcionalidades
- [ ] Sistema de notificações (email, push)
- [ ] Upload de arquivos (foto de perfil, documentos)
- [ ] Exportação de dados (PDF, Excel)
- [ ] Filtros avançados e busca full-text
- [ ] Paginação server-side
- [ ] Ordenação customizável de tabelas
- [ ] Dashboards com gráficos (Chart.js, D3.js)
- [ ] Calendário acadêmico
- [ ] Sistema de matrículas
- [ ] Controle de presenças
- [ ] Sistema de notas e avaliações

### Performance
- [ ] Cache Redis para dados frequentes
- [ ] Lazy loading de módulos no frontend
- [ ] Virtual scrolling para listas grandes
- [ ] Compressão gzip/brotli
- [ ] CDN para assets estáticos
- [ ] Database indexing otimizado
- [ ] Query optimization (N+1 problem)

### Testes e Qualidade
- [ ] Aumentar cobertura de testes (meta: 80%+)
- [ ] Testes E2E com Cypress/Playwright
- [ ] Testes de carga (JMeter, k6)
- [ ] Testes de segurança (OWASP ZAP)
- [ ] Code quality gates (SonarQube)
- [ ] Pre-commit hooks (linting, formatting)

### DevOps e Infraestrutura
- [ ] CI/CD pipeline (GitHub Actions, Jenkins)
- [ ] Deploy automatizado (Kubernetes, AWS ECS)
- [ ] Monitoramento (Prometheus, Grafana)
- [ ] Logs centralizados (ELK Stack)
- [ ] Health checks e auto-healing
- [ ] Blue-green deployment
- [ ] Database migrations automatizadas

### UX/UI
- [ ] Tema dark mode
- [ ] Internacionalização (i18n) - suporte a múltiplos idiomas
- [ ] PWA (Progressive Web App) - funcionalidade offline
- [ ] Skeleton loaders
- [ ] Animações de transição
- [ ] Acessibilidade WCAG 2.1 AA
- [ ] Undo/Redo para operações críticas

### Documentação
- [ ] API documentation completa (Postman collections)
- [ ] Diagramas de arquitetura (C4 Model)
- [ ] Guia de contribuição
- [ ] Changelog automático
- [ ] Storybook para componentes

## 🔧 Troubleshooting

### Problemas Comuns

#### 1. Backend não inicia
```bash
# Verificar logs
docker-compose logs backend

# Verificar se o PostgreSQL está pronto
docker-compose ps postgres

# Rebuild sem cache
docker-compose build --no-cache backend
docker-compose up -d backend
```

#### 2. Frontend não carrega
```bash
# Verificar logs
docker-compose logs frontend

# Rebuild
docker-compose build --no-cache frontend
docker-compose up -d frontend

# Limpar cache do navegador (Ctrl+Shift+Del)
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

#### 4. Sessão perdida após reload
- Verifique se o localStorage do navegador está habilitado
- Verifique se não está em modo anônimo/privado
- Limpe o cache e faça login novamente

#### 5. CORS errors
- Verifique se o backend está rodando na porta 8080
- Verifique se o frontend está acessando `http://localhost:8080/api`
- Verifique a configuração de CORS no backend

### Logs e Monitoramento

```bash
# Ver logs de todos os serviços
docker-compose logs

# Ver logs de um serviço específico
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres

# Seguir logs em tempo real
docker-compose logs -f backend

# Ver logs das últimas 100 linhas
docker-compose logs --tail=100 backend
```

### Backup e Restore

```bash
# Backup do banco de dados
docker-compose exec postgres pg_dump -U academy academy > backup.sql

# Restore do banco de dados
docker-compose exec -T postgres psql -U academy academy < backup.sql

# Backup de volume Docker
docker run --rm -v unifor_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres-backup.tar.gz /data
```

## 📌 Sobre os Commits

**Observação Importante:**

Os commits deste repositório **não seguem a linha de tempo real** do desenvolvimento. Devido à perda de acesso ao repositório original, reorganizei os commits para demonstrar a evolução incremental do projeto.

Estruturei os commits de forma a:
- Mostrar uma progressão lógica de desenvolvimento
- Separar mudanças por contexto funcional
- Manter mensagens em inglês (padrão da indústria)
- Demonstrar boas práticas de versionamento

**Estrutura dos Commits:**
1. Configuração inicial (setup, Docker, estrutura de pastas)
2. Backend (entities, DTOs, repositories, services, controllers)
3. Frontend (components, services, routing, guards)
4. Integrações e ajustes finais
5. Documentação e melhorias

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/some-feature`)
3. Commit suas mudanças (`git commit -m 'feat: add some some-feature'`)
4. Push para a branch (`git push origin feature/some-feature`)
5. Abra um Pull Request

### Convenção de Commits
```
feat: nova funcionalidade
fix: correção de bug
docs: documentação
test: testes
refactor: refatoração de código
style: formatação
chore: tarefas de build, configs
```

---

**Notas Finais:**
- Este README reflete o estado atual do projeto
- Para dúvidas ou problemas, abra uma issue no GitHub
- Contribuições são bem-vindas!
