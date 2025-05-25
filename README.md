<h1 style="text-align: center;">
  Daylist
</h1>

<p style="display: flex; gap: 10px; justify-content: center;">
  <img alt="Node" src="https://img.shields.io/badge/node-nest-maroon"  />
  <img alt="Prisma" src="https://img.shields.io/badge/node-prisma-blue"  />
  <img alt="Node" src="https://img.shields.io/badge/node-jest-blue"  />
</p>

Aplicação backend desenvolvida com foco na organização pessoal, unificando funcionalidades de controle de rotina, gerenciamento financeiro, tarefas e interesses pessoais. No backend, a API é construída com NestJS, TypeScript e Prisma, utilizando PostgreSQL como banco de dados. O frontend oferece uma interface intuitiva e responsiva para o usuário acompanhar e interagir com sua vida cotidiana de forma integrada e centralizada.

## Organização

O projeto utiliza a seguinte estrutura :

<center>
  <img src=".github/Estrutura%20projeto%20node.png" />
</center>

O principal objetivo dessa arquitetura é abstrair as responsabilidades para permitir a migração do banco de dados ou qualquer tipo de dependência de forma natural, sem impactar as camadas de consumo do frontend - rotas da API.

## Traduzindo a estrutura

Logo de inicio temos os 3 principais modulos

- Global - Responsável por armazenar módulos que podem ser utilizados por todos ou em um contexto global
- Modules - Implementa os useCases / testes e abstrai a regra de negocio
- Infra - Implementa as rotas para serem consumidas pelo client (Controller) e efetivamente as consultas ao backend. Implementa as repositories abstraídas na camada de modules.

Com este contexto conseguimos efetivamente alterar a repository implementada na camada de infra e teríamos migrado o app de banco de dados implementado, sem ter que ter alterado nenhuma lógica de roteamento, useCases, etc.

De forma mais visual, temos o seguinte fluxo de operação na aplicação:

![Estrutura projeto node](.github/Fluxo%20de%20dados%20do%20sistema.png)
