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
