<h1 align="center">
  Food Explorer
</h1>

<p align="center">Explorer | Final Challenge - Food Explorer Backend</p>

<p align="center">
  <a href="https://github.com/wbruninhoo/food-explorer-backend/blob/main/LICENSE">
    <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000">
  </a>
</p>

<p align="center">
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#%EF%B8%8F-pré-requisitos">Pré requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-executar">Como Executar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">Licença</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-autor">Autor</a>
</p>

## 💻 Projeto

**Food Explorer** é um cardápio digital interativo, construído para um restaurante fictício.

Esta aplicação possui duas personas, o "admin" que pode gerenciar todos os pratos e o "cliente" que pode listar os pratos cadastrados e visualizar detalhes de algum prato.

<p align="center">
  <a href="https://food-explorer-backend-s33f.onrender.com">
    <span>https://food-explorer-backend-s33f.onrender.com</span>
  </a>
</p>

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com)
- [Knex](https://knexjs.org/)
- [Postgres](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [JWT](https://jwt.io/)
- [Vitest](https://vitest.dev/)

## 🛠️ Pré requisitos

**Variáveis de ambiente**

> [!IMPORTANT]
> Crie uma cópia do arquivo `.env.example` para `.env` e preencha todas as variáveis de ambiente.

**Banco de dados (Docker)**

Algumas queries do projeto precisam ser executadas em um banco PostgreSQL.
Deixei um arquivo do docker configurado para executar o banco localmente se necessário.

```bash
# Execute o banco de dados com docker
docker compose up -d
```

## 🎲 Como executar

```bash
# Clone este repositório
$ git clone https://github.com/wbruninhoo/food-explorer-backend

# Acesse o diretório do projeto no terminal/cmd
$ cd food-explorer-backend

# Instale as dependências
$ npm install

# Crie as tabelas no banco de dados
$ npm run knex:migrate

# Execute a aplicação em modo de desenvolvimento
$ npm run start:dev

# O servidor inciará na porta:3333 - acesse <http://localhost:3333>
```

## 📝 Licença

Esse projeto está sob a licença MIT - veja o arquivo [LICENSE](https://github.com/wbruninhoo/food-explorer-backend/blob/main/LICENSE) para mais detalhes.

## 👨🏻‍💻 Autor

<img
  src="https://avatars.githubusercontent.com/wbruninhoo"
  width="100px;"
  title="Foto de Bruno Mendes"
  alt="Foto de Bruno Mendes"
/>

Made with 🩶 by Bruno Mendes
