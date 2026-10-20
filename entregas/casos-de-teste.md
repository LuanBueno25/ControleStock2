# Descritivo de casos de teste de software

## Ferramentas e ambiente
- Sistema: Controle de Estoque SAEP, aplicação web Next.js.
- Banco de dados: MySQL 8.0 ou compatível.
- ORM: Prisma 5.x.
- Linguagens: TypeScript e SQL.
- Navegador: versão atual do Google Chrome, Microsoft Edge ou Firefox.
- Execução local: Node.js compatível com Next.js 16, dependências instaladas via `npm install` e banco configurado por `DATABASE_URL`.

## Casos de teste

| ID | Cenário e procedimento | Resultado esperado |
|---|---|---|
| CT01 | Informar e-mail e senha válidos na tela de login. | Autenticação concluída e redirecionamento ao painel. |
| CT02 | Informar senha incorreta ou usuário inexistente. | Mensagem informando falha de autenticação; acesso negado. |
| CT03 | Entrar no painel com usuário autenticado. | Nome do usuário exibido e atalhos de produtos e estoque disponíveis. |
| CT04 | Acionar Sair no painel. | Sessão local encerrada e retorno ao login. |
| CT05 | Abrir cadastro de produtos. | Produtos cadastrados apresentados em tabela. |
| CT06 | Pesquisar por parte da descrição de um produto. | Tabela filtrada para os produtos correspondentes. |
| CT07 | Cadastrar produto com dados válidos. | Produto persistido e exibido na lista. |
| CT08 | Tentar cadastrar produto sem código ou descrição. | Validação impede envio ou API retorna erro compreensível. |
| CT09 | Editar descrição e preço de produto existente. | Alterações persistidas e refletidas na lista. |
| CT10 | Excluir produto sem movimentações associadas. | Produto removido da lista e do banco. |
| CT11 | Registrar entrada com quantidade positiva. | Estoque incrementado e movimentação registrada com usuário e data. |
| CT12 | Registrar saída menor ou igual ao estoque disponível. | Estoque decrementado e movimentação registrada. |
| CT13 | Tentar registrar saída superior ao estoque disponível. | Operação recusada e estoque permanece inalterado. |
| CT14 | Registrar quantidade zero ou negativa. | Operação recusada com mensagem de validação. |
| CT15 | Realizar movimentação que leve o estoque ao mínimo ou abaixo dele. | Sistema exibe alerta de estoque mínimo. |
| CT16 | Consultar histórico de movimentações. | Cada registro contém produto, usuário responsável, tipo, quantidade e data. |
