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
</p>

---

## 📝 Sobre o Projeto

O **Daylist** é uma aplicação backend projetada para unificar e simplificar a **organização pessoal**. Com foco em produtividade e bem-estar, ele integra funcionalidades essenciais como **controle de rotina**, **gerenciamento financeiro**, **listas de tarefas** e **interesses pessoais**.

Construído com **TypeScript** e **Node.js** utilizando o framework **NestJS**, o Daylist oferece uma API RESTful. A persistência de dados é gerenciada pelo **Prisma ORM**, que interage com um banco de dados **PostgreSQL**. A segurança é primordial, por isso a autenticação é implementada com **JSON Web Tokens (JWT)**, protegendo as rotas e os dados do usuário.

No frontend (que interage com esta API), o usuário encontra uma interface intuitiva e responsiva para acompanhar e interagir com sua vida cotidiana de forma integrada e centralizada.

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

Esta seção detalha os passos para configurar e executar o projeto Daylist em seu ambiente local.

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- **Node.js** (versão 22.x ou superior)

- **pnpm** ou **npm** (gerenciador de pacotes)

- **PostgreSQL** (banco de dados)

- **Docker** (opcional, para ambiente de desenvolvimento)

### Configuração do Ambiente

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/daylist.git](https://github.com/seu-usuario/daylist.git)
    cd daylist
    ```
2.  **Instale as dependências:**
    ```bash
    pnpm install
    # ou
    npm install
    ```
3.  **Configure o Banco de Dados:**
    - Certifique-se de que sua instância do PostgreSQL esteja rodando.
    - Execute as migrações do Prisma para criar o schema do banco de dados:
      ```bash
      npx prisma migrate dev --name init
      ```
    - Gere o cliente Prisma:
      ```bash
      npx prisma generate
      ```

### Executando a Aplicação

Para iniciar o servidor de desenvolvimento:

```bash
pnpm dev
# ou
npm run dev
```
