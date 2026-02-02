# [Mini Login System](https://mini-login-system-zeta.vercel.app/login)

Sistema de login **fictício** em React, focado em **controle de estado, fluxo do usuário e tratamento de erros**. <br/>
Este projeto é um exemplo de como criar uma aplicação com mentalidade de produto, priorizando experiência do usuário sem depender de autenticação real.

---

## Funcionalidades

* Login fictício com validação de credenciais fixas (user@test.com / 123456)
* Logout funcional e controle sessão
* **Expiração de sessão** simulada com notificação ao usuário
* **Mensagens contextuais** de fluxo:
  * "Faça login para continuar"
  * "Você saiu da sua conta"
  * "Sua sessão expirou. Faça login novamente."
* **Toast** de "Sessão restaurada" ao recarregar a página com sessão ativa
* Proteção de rotas usando **ProtectedRoute**
* Tratamento de erros no login com animação de shake

---

## Tecnologias

* **React + TypeScript**
* **React Router** para navegação
* **TailwindCSS** para estilização
* Controle de estado usando React Hooks (useState, useEffect, useRef)

---

## Demonstração
Link do deploy: https://mini-login-system-zeta.vercel.app/login

---

## Como usar localmente

1. Clone o repositório:
```
git clone https://github.com/UelintonHJ/mini-login-system.git
cd mini-login-system
```

2. Instale as dependências:
```
npm install
```

3. Rode a aplicação
```
npm run dev
```

4. Acesse http://localhost:5173

---

## Credenciais de teste

* **Email**: user@test.com
* **Senha**: 123456

> Qualquer outro email/senha retorna erro de login, simulando falha de autenticação.

---

## Fluxo do usuário

1. Usuário acessa o site -> protegido por **ProtectedRoute**
2. Se não estiver autenticado -> redireciona ao login com mensagem contextual
3. Login bem-sucedido -> redireciona ao Dashboard
4. Sessão ativa -> toast "Sessão restaurada" aparece ao recarregar a página
5. Logout ou expiração -> usuário redirecionado ao login com mensagem apropriada

---

## Objetivo do projeto

* Demonstrar **mentalidade de produto** em um mini sistema
* Exercitar **controle de estado, fluxo do usuário e tratamento de erros**
* Criar um projeto pronto para **portfólio** e deploy online
