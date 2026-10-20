# Controle de Estoque SAEP

Aplicação web para autenticação, cadastro de produtos e gestão de entradas e saídas de estoque, com registro de movimentações e alerta de estoque mínimo.

## Configuração

1. Instale Node.js compatível com Next.js 16 e MySQL Server 8.0 ou compatível.
2. Crie o banco executando `saep_db.sql` no MySQL Workbench.
3. Copie `.env.example` para `.env` e ajuste usuário e senha do `DATABASE_URL` para o seu MySQL.
4. No terminal, na pasta do projeto, execute:

```bash
npm install
npx prisma generate
npm run dev
```

5. Acesse `http://localhost:3000`.

## Acesso de demonstração

- `wellington@sistema.com` / `senha123`
- `admins@sistema.com` / `admin123`
- `operador@sistema.com` / `op123`

## Entregas da avaliação

A pasta `entregas` contém a lista de requisitos funcionais, o DER em PNG, casos de teste e requisitos de infraestrutura. O script de criação e população do banco está em `saep_db.sql`.
