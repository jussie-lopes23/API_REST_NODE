## configuração e rodar o projeto
npm init -y cria o package.json

npm i -D typescript -> É um comando para instalar o TypeScript no seu projeto.  Ele instala o pacote como uma dependência de desenvolvimento, ou seja, algo que você só precisa durante o desenvolvimento, não em produção.

npx tsc --init -> gera o tsconfig.json.  serve para criar o arquivo de configuração tsconfig.json na raiz do seu projeto. Este arquivo é fundamental para qualquer projeto TypeScript, pois é nele que você define como o compilador deve se comportar e como o seu código deve ser transformado em JavaScript.

npx tsc src/index.ts - converte esse arquivo em javascript index.js

npm i fastify - instalar o fastify

npm install -D @types/node - instalar para o node  reconhecer o typescript 

npx tsc - compila o arquivo typescript e gere o arquivo java script 

npm install tsx -D instala o tsx para compilar o typescript sem precisar gerar o javascript

npx tsx src/server.ts -  compila o typescript sem precisar gerar o arquivo js

"scripts": {
    "dev": "tsx watch src/server.ts", // starta o servidor e permite rodar a aplicação com npm run dev
    "lint": "eslint src --ext .ts --fix", // analisa todos os códigos e o que não estiver dentro da formatação do eslint ele corrige. 
    "knex": "tsx ./node_modules/.bin/knex",
    "test": "vitest"
  },

  ## configuração do settings(json) para fazer o eslint funcionar
  caminho: >settings -> Preferences Open User (JSON)

  {
  "workbench.iconTheme": "material-icon-theme",
  "editor.formatOnSave": true,
  "files.autoSave": "afterDelay",
  "[typescript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "explorer.confirmDelete": false,
  
  // Adicionado a partir daqui:
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}

npm i eslint @rocketseat/eslint-config -D - configurações prontas da rockeatseat


## Banco de dados
3 formas de trabalhar com banco de dados: driver, query builder e orms

banco de query builder
npm install knex sqlite3 - instala o query builder e o sqlite

npm i dotenv - ler o arquivo dotenv no node 

npm i zod

npm i @fastify/cookie

npm i vitest -D
para criar o arquivo de teste pode usar exemplo.spec.ts ou exemplo.test.ts

npm i supertest -D

 npm i -D @types/supertest baixar os tipos para o superteste rodar com typescript 

 um teste não pode depender de outro teste para funcionar

 fazer daploy com serviços gerenciados, 
 npm i tsup -D - ferramenta para fazer o processp de build de ts para js. 

 usar o render, fly.io e railway para fazer deploy 

 npm i pg - instalar o postgresql para usar em produção. 