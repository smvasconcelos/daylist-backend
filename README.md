# Daylist

<p align="center">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
  <img alt="NestJS" src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img alt="JWT" src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white" />
  <img alt="Jest" src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img alt="Insomnia" src="https://img.shields.io/badge/Insomnia-4000BF?style=for-the-badge&logo=insomnia&logoColor=white" />
  <img alt="Docker" src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
</p>

## 📝 Sobre o Projeto

O **Daylist** é uma aplicação backend projetada para unificar e simplificar a **organização pessoal**. Com foco em produtividade e bem-estar, ele integra funcionalidades essenciais como **controle de rotina**, **gerenciamento financeiro**, **listas de tarefas** e **interesses pessoais**.

Construído com **TypeScript** e **Node.js** utilizando o framework **NestJS**, o Daylist oferece uma API RESTful. A persistência de dados é gerenciada pelo **Prisma ORM**, que interage com um banco de dados **PostgreSQL**. A segurança é primordial, por isso a autenticação é implementada com **JSON Web Tokens (JWT)**, protegendo as rotas e os dados do usuário.

## 🚀 Tecnologias Utilizadas

Este projeto utiliza um conjunto de tecnologias modernas e eficientes:

- **Node.js**: Plataforma de runtime para execução do JavaScript no lado do servidor.

- **TypeScript**: Superconjunto tipado de JavaScript que oferece maior segurança e manutenibilidade ao código.

- **NestJS**: Um framework progressivo de Node.js para construção de aplicações backend escaláveis e eficientes, que adota padrões de design como a Injeção de Dependência.

- **Prisma ORM**: Ferramenta de ORM de próxima geração que simplifica a interação com o banco de dados através de um schema intuitivo e Type-Safety.

- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional (SGBD) robusto, extensível e de código aberto, ideal para aplicações com alta demanda de dados.

- **JSON Web Tokens (JWT)**: Padrão aberto e seguro para criação de tokens de acesso que permitem a autenticação e autorização de usuários de forma eficiente e sem estado.

## 🏗️ Arquitetura do Projeto: Domain-Driven Design (DDD)

O **Daylist** foi desenvolvido seguindo os princípios da **Arquitetura Limpa (Clean Architecture)** e **Domain-Driven Design (DDD)**. Essa abordagem visa criar um sistema flexível, testável e manutenível, abstraindo as responsabilidades e isolando as preocupações.

### Estrutura Visual

<p align="center">
  <img alt="Estrutura de pastas do projeto" src=".github/Estrutura%20projeto%20node.png" />
</p>

O principal objetivo dessa arquitetura é **abstrair as responsabilidades** para permitir a **migração de banco de dados** ou qualquer tipo de **dependência externa** (como serviços de terceiros, cache, etc.) de forma natural, sem impactar as camadas de consumo do frontend (as rotas da API).

### Entendendo a Estrutura

O projeto é organizado em módulos principais, cada um com uma responsabilidade bem definida, alinhada com as camadas do DDD:

- **Global**: Esta camada armazena módulos, utilitários e configurações que são compartilhados e utilizados em um contexto global por toda a aplicação. Inclui validações globais, middlewares genéricos e componentes de infraestrutura compartilhados.

- **Modules** (Domínio/Aplicação): Esta é a camada central do **Domínio e Aplicação**. Aqui são implementados os **Casos de Uso (Use Cases)**, as **Entidades de Domínio**, **Agregados** e as **Regras de Negócio** centrais da aplicação. É a parte mais agnóstica a detalhes de infraestrutura e a lógica de negócio principal reside aqui. As interfaces para os repositórios também são definidas nesta camada.

- **Infra** (Infraestrutura): Camada de **Infraestrutura**. Responsável por:
  - Implementar as **rotas da API** através dos **Controllers**, que expõem os Casos de Uso para serem consumidos pelos clientes.

  - Efetivar as **consultas ao banco de dados** através da implementação concreta dos **Repositórios** (definidos como interfaces na camada de `Modules`), utilizando o **Prisma ORM**.

  - Lida com a **autenticação (JWT)**, a configuração do banco de dados e outras preocupações técnicas.

Com esta organização, conseguimos, por exemplo, alterar a implementação de um repositório na camada `Infra` (e, consequentemente, o banco de dados utilizado, de PostgreSQL para MySQL, por exemplo) sem a necessidade de modificar qualquer lógica de roteamento, casos de uso, ou regras de negócio definidas na camada `Modules`. Isso garante uma **alta flexibilidade, baixa acoplamento** e facilita a manutenção e evolução do sistema.

### Fluxo de Operação

Para uma visão mais detalhada do fluxo de dados e interações entre as camadas dentro da aplicação, observe o diagrama abaixo:

<p align="center">
  <img alt="Fluxo de dados do sistema Daylist" src=".github/Fluxo%20de%20dados%20do%20sistema.png" />
</p>

## 🛠️ API e Coleção Insomnia

Para facilitar o teste e a interação com a API do Daylist, disponibilizamos uma coleção do Insomnia com todas as rotas e exemplos de requisições.

### Download da Coleção

Você pode baixar o arquivo da coleção diretamente do nosso repositório GitHub:

- **Coleção Insomnia**: [collection.yaml](.github/collection.yaml)

### Como Importar no Insomnia

1.  **Baixe o arquivo** `collection.yaml` para o seu computador clicando no link acima.
2.  Abra o **Insomnia**.
3.  Clique no ícone de "Import/Export" (ao lado da barra de filtro) .
4.  Selecione o arquivo `collection.yaml` que você baixou.
5.  A coleção será importada para o seu Insomnia, permitindo que você explore e teste todas as funcionalidades da API.

## ⚙️ Como Rodar o Projeto

Esta seção detalha os passos para configurar e executar o projeto Daylist em seu ambiente local. Ao final de ambas as configurações a aplicação vai estar disponível em `http://localhost:3000/`.

### 🐳 Via Docker Compose

Ideal para rodar a aplicação completa sem configurar nada localmente:

1.  **Configure o ambiente:**
    _Lembre-se de alterar os valores das variáveis de ambiente_

    ```bash
    cp .env.example .env
    ```

2.  **Inicie os containers:**
    ```bash
    docker-compose up --build
    ```
    _O serviço `app` aguardará o `postgres` estar saudável antes de rodar o `prisma db push` e iniciar o modo de desenvolvimento._

### 💻 Via VS Code Dev Containers (Quick Start)

Se você deseja desenvolver dentro do container com todas as extensões configuradas:

1.  Certifique-se de ter a extensão [**Dev Containers**](https://code.visualstudio.com/docs/devcontainers/containers) instalada no VS Code.
2.  Abra a pasta do projeto.
3.  Quando solicitado, clique em **"Reopen in Container"** (ou use o comando via `Ctrl+Shift+P`).
4.  O VS Code configurará automaticamente o terminal, o banco de dados e as extensões de linting e formatação.

### 🗄️ Fluxo de Banco de Dados

- **Startup**: Ao iniciar, o container executa `npx prisma migrate deploy` (produção) ou `npx prisma db push` (dev).
- **Seeding**: O processo de seed é definido em `prisma.config.ts` e executado automaticamente no startup do container runner.

## 📌 Relatório: Use Cases vs Propósito do App

Este relatório analisa os casos de uso em `src/modules/` comparando com o propósito declarado:

- **App de gerenciamento de tarefas** (rotinas, tarefas pontuais, descrição, tags e cores)
- **Usuário tem muitas notas**, notas possuem tarefas
- **Notas e/ou tarefas podem ter tags**
- **Tarefas podem repetir indefinidamente** ou por um período

### ✅ O que está contemplado (alto nível)

- **Usuários e autenticação**
  - `auth/useCases/signIn`, `auth/useCases/validateUser`
  - `user/useCases/createUser`, `user/useCases/getManyUsers`
- **Notas**
  - `note/useCases`: criar, editar, deletar, obter uma, listar
  - Entidade `Note` suporta `tags?: Tag[]` e `tasks?: Task[]` (mapeado no Prisma via `NoteTag` e relação `Note -> Task`)
- **Tags com cor**
  - `tag/useCases`: criar, editar, deletar, obter uma, listar
  - Validação de cor hex em `CreateTagUseCase` (ex: `#AABBCC`)
  - Tags associadas a notas via tabela de junção `NoteTag` no Prisma (`prisma/schema.prisma`)
- **Tarefas**
  - `task/useCases`: criar, editar, deletar, obter uma, listar
  - Ligação opcional com nota (`noteId`)
- **Repetição / ocorrências**
  - Modelo Prisma `Task` tem `recurrenceType`, `daysOfWeek[]`, `timesOfDay[]`, `startDate?`, `endDate?`
  - Modelo Prisma `TaskOccurrence` registra “checklist” (quando a tarefa foi marcada/realizada) e metadados (dia da semana, horário, etc.)
  - `task/useCases/createTaskOcurrenceUseCase` e `deleteTaskOcurrenceUseCase`
  - `task/useCases/getTaskCalendar` delega para o repositório retornar uma “visão de calendário” (DAILY/WEEKLY/MONTHLY)

### ⚠️ Principais gaps / pontos onde não atende o propósito

#### 1) Tags **não existem para Task** (somente para Note)

Seu requisito diz: “as **notas ou tarefas** podem ter tags”.

- No banco (Prisma), **Tag só se relaciona com Note** via `NoteTag`.
- Não existe `TaskTag` (ou campo `tags` em `Task`) no schema.
- Os use cases de `tag` só suportam associação com **noteId**.

**Impacto:** não dá para filtrar/organizar tarefas por tags diretamente, somente via tags da nota (se a tarefa estiver vinculada a uma nota com tags).

#### 2) “Repetir indefinidamente ou por período” está parcial (modelo sim, comportamento não)

O modelo suporta `endDate` opcional (indefinido -> “indefinidamente”), porém:

- Não há um use case que **materialize a recorrência** (ex.: gerar instâncias futuras ou calcular se a tarefa “cai” em um dia específico usando `recurrenceType/daysOfWeek/timesOfDay`).
- O calendário em `PrismaTaskRepository.getCalendarView(...)` filtra por faixa `startDate/endDate`, mas **não aplica regras de recorrência** (ex.: `WEEKLY`/`CUSTOM` com `daysOfWeek`) para decidir se uma tarefa deve aparecer em um dia.

**Impacto:** na prática, você tem “tarefas com metadados de recorrência”, mas não a experiência de “rotina/repetição” funcionando de ponta a ponta.

#### 3) `CreateTaskOcurrenceUseCase` ignora parâmetros e pode quebrar quando `Task.startDate` é nulo

Em `CreateTaskOcurrenceUseCase`:

- O input aceita `startDate/endDate/recurrenceType`, mas o use case usa `task.startDate as Date` e `task.recurrenceType ?? 'NONE'`.
- Se a `Task` foi criada com `startDate` nulo, a coerção `as Date` vira um “null mascarado” e o repositório Prisma exige `startDate` em `TaskOccurrence`.

**Impacto:** marcar ocorrência pode falhar dependendo da configuração da tarefa, e o use case não permite sobrescrever datas/tipo mesmo recebendo esses campos.

#### 4) Repositórios “InMemory” estão incompletos e têm bug em `removeFromNote`

Os unit tests em `src/modules/**/**/*.spec.ts` usam frequentemente `*RepositoryInMemory`.

Problemas observados:

- `TaskRepositoryInMemory.getCalendarView` sempre retorna `{ daily:null, weekly:null, monthly:null }`
- `TaskRepositoryInMemory.createTaskOcurrence/deleteTaskOcurrence` são vazios
- `removeFromNote` em `TaskRepositoryInMemory` e `TagRepositoryInMemory` tem um filtro incorreto:
  - ele compara `item.noteId !== item.noteId` (sempre falso), então o comportamento não corresponde ao esperado

**Impacto:** os testes atuais não validam o comportamento real (Prisma) e alguns cenários importantes não são exercitados.

### 🧪 Configuração recomendada para testes

O projeto hoje tem dois níveis naturais de teste:

#### A) Unit tests (rápidos, sem banco)

Eles executam com `jest` e repositórios InMemory.

```bash
pnpm install
pnpm test
```

**Observação:** como os InMemory estão incompletos, esses testes checam mais “fluxo feliz” do que regras de recorrência/calendário/associação.

#### B) Integração (com Postgres + Prisma) — recomendado para validar o “propósito”

Este caminho valida de verdade:

- persistência de Note/Task/Tag
- associação Note <-> Tag via `NoteTag`
- calendário via `PrismaTaskRepository.getCalendarView`
- ocorrências via `TaskOccurrence`

**Opção 1: Docker Compose (mais simples)**

1. Criar `.env`:

```bash
cp .env.example .env
```

2. Subir serviços:

```bash
docker-compose up --build
```

O compose já roda `prisma generate` + `prisma db push` e inicia o app.

**Opção 2: Local (Postgres local)**

1. Ajustar `DATABASE_URL` no `.env` para apontar ao seu Postgres local.
2. Gerar client e sincronizar schema:

```bash
pnpm install
npx prisma generate
npx prisma db push
pnpm dev
```

#### Teste manual recomendado (checklist)

- **Notas**
  - criar nota, listar, obter por id, editar e deletar
- **Tags**
  - criar tag com cor válida (`#RRGGBB`)
  - associar tag a uma nota (via `noteId` no create/save)
  - listar tags por nota (via `noteId`)
- **Tarefas**
  - criar tarefa ligada a nota (confirmar `noteId`)
  - criar tarefa com `endDate` vazio (indefinida) e com `endDate` definido (período)
- **Rotina/recorrência**
  - criar tarefa com `recurrenceType=CUSTOM` e `daysOfWeek`
  - consultar calendário DAILY/WEEKLY/MONTHLY e observar que hoje **não há cálculo completo de recorrência** (apenas filtros por faixa)

### 📎 Conclusão (resumo)

- **Notas + tarefas**: suportado (tarefas podem pertencer a uma nota).
- **Tags com cores + tags em notas**: suportado (many-to-many via `NoteTag`).
- **Tags em tarefas**: **não suportado** no modelo atual.
- **Repetição/rotinas**: há estrutura (campos + ocorrências), mas falta a lógica principal de “recorrência” para cumprir o propósito do app.
