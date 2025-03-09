# MB Challenge

## Descrição

Este é um sistema de cadastro de usuários desenvolvido com **Vue 3** no frontend e **Node.js com Express** no backend. O projeto permite o registro de usuários, onde são coletadas informações como e-mail, telefone, CPF/CNPJ, entre outros dados. Após o sucesso no cadastro, o sistema exibe essas informações em uma nova aba do navegador em formato HTML. O sistema foi desenvolvido como parte de avaliação de conhecimentos técnicos para o MB.

### Tecnologias Utilizadas

- **Frontend:**
  - **Vue 3** (com Composition API)
  - **Vite** (para bundling e desenvolvimento rápido)
  - **JavaScript Vanilla**

- **Backend:**
  - **Node.js**
  - **Express** (para construção da API)
  - **JavaScript Vanilla**

## Funcionalidades

- **Cadastro de Usuário:**
  - O usuário pode se cadastrar fornecendo informações como e-mail, telefone, CPF/CNPJ, entre outros.
  - Caso o cadastro seja realizado com sucesso, uma nova aba do navegador é aberta mostrando os dados do usuário registrado.

- **Exibição de Dados:**
  - Após o cadastro, os dados do usuário são renderizados em uma página simples HTML.
  - O servidor fornece uma página que exibe os dados do usuário de forma formatada.

## Como Rodar o Projeto

### Pré-requisitos

- **Node.js** (v16 ou superior)
- **NPM**

### Passo 1: Clonando o repositório

```bash
git clone https://github.com/ericsporto/mb-challenge
cd mb-challenge
```

### Passo 2: Configurando o Frontend

### 1-Acesse a pasta do frontend:

```bash
cd mb-challenge
```

### 2-Instale as dependências:

```bash
npm install
```

### 3-Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## O frontend estará rodando em http://localhost:5173

### Passo 3: Configurando o Backend

### 1-Acesse a pasta do backend:

```bash
cd server
```

### 2-Instale as dependências:

```bash
npm install
```

### 3-Inicie o servidor:

```bash
node server.js
```

## O servidor estará rodando em http://localhost:3000


### Como Testar o Fluxo de Cadastro

- Abra o navegador e acesse http://localhost:5173 (frontend).
- Preencha o formulário de cadastro com os dados necessários seguindo os 4 passos. Você tem a opção de voltar e editar os dados o quanto quiser. A aplicação possui um sistema de persistência de dados entre os steps que só é limpo no final do fluxo ao ter sucesso no cadastro.
- Clique em "Cadastrar" e aguarde a resposta do backend e em caso de sucesso, a abertura da nova aba com os dados de registro. Para simular erros, o código de envio do formulário pode ser manipulado no arquivo ReviewInformationStep.vue a partir da linha 111.
- A resposta da tentativa de cadastro será exibida como um toast na tela sinalizando um erro ou um sucesso. Foram implementados retornos de exemplo para casos de falha na autenticação, erro no envio de dados obrigatórios e dados inconscientes.
- Em caso de sucesso, além do toast, uma nova aba do navegador será aberta com as informações do usuário registradas. Foi implementando um timeout simulando o tempo de resposta das requisições.

# Endpoints da API

- **POST /registration**

- **Descrição**: Envia os dados do usuário para registro.

**Requisição**
{
  "email": "user@example.com",
  "phone": "1234567890",
  "password": "senha123",
  "legal_name": "Razão Social",
  "social_name": "Nome Social",
  "cpf": "12345678901",
  "cnpj": "12345678000195",
  "birth_date": "1990-01-01",
  "birth_opened": "2000-05-15"
}

**Resposta em caso de sucesso**
{
  "message": "Cadastro realizado com sucesso!",
  "success": true
}

- **GET /registration**

- **Descrição**: Retorna os dados do usuário registrado (se disponível).


**Resposta**

<h1>Usuário Registrado</h1>
<p><strong>Email:</strong> user@example.com</p>
<p><strong>Telefone:</strong> 1234567890</p>
<p><strong>Senha:</strong> senha123</p>
<p><strong>Razão Social:</strong> Razão Social</p>
<p><strong>CNPJ:</strong> 12345678000195</p>
<p><strong>Data de Abertura:</strong> 2000-05-15</p>