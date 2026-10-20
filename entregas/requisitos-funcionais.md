# Lista de requisitos funcionais

RF01 — O sistema deve autenticar usuários por e-mail e senha e informar quando as credenciais forem inválidas.

RF02 — O sistema deve exibir o nome do usuário autenticado na interface principal.

RF03 — O sistema deve permitir encerrar a sessão e retornar à tela de login.

RF04 — A interface principal deve disponibilizar acesso ao cadastro de produtos e à gestão de estoque.

RF05 — O sistema deve listar os produtos cadastrados em tabela, em ordem alfabética por descrição.

RF06 — O sistema deve permitir pesquisar produtos por código ou descrição.

RF07 — O sistema deve permitir cadastrar produtos com código, descrição, quantidade, valor unitário e estoque mínimo.

RF08 — O sistema deve permitir editar os dados de produtos existentes.

RF09 — O sistema deve permitir excluir produtos, informando quando a exclusão não for possível devido a movimentações relacionadas.

RF10 — O sistema deve validar campos obrigatórios, quantidades não negativas, valor unitário não negativo e estoque mínimo não negativo.

RF11 — O sistema deve permitir registrar movimentações de entrada e saída para um produto selecionado.

RF12 — Cada movimentação deve registrar produto, usuário responsável, tipo, quantidade e data da operação.

RF13 — O sistema deve atualizar automaticamente a quantidade em estoque após cada movimentação.

RF14 — O sistema deve impedir saída com quantidade superior ao estoque disponível e impedir quantidade movimentada menor ou igual a zero.

RF15 — O sistema deve alertar quando o estoque de um produto ficar abaixo ou atingir o estoque mínimo configurado.

RF16 — O sistema deve manter histórico consultável das movimentações, com identificação do produto, responsável, tipo, quantidade e data.
