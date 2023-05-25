# Bem-vindo ao Desafio Shopper

O __Desafio Shopper__ é uma solução que permite a atualização massiva de preços de produtos para lojas virtuais. Desenvolvida com `React.js` no `frontend` e `Node.js` e `Typescript` no `backend`, a aplicação processa e valida os dados de um arquivo `CSV`, exibe as informações dos produtos e, caso não haja violações de regras, efetua a atualização dos preços no banco de dados `MySQL`.

## Sumário

- [Bem-vindo ao Desafio Shopper](#bem-vindo-ao-desafio-shopper)
  - [Sumário](#sumário)
  - [Visualização](#visualização)
  - [Contexto](#contexto)
    - [Visão Geral de Funcionalidades](#visão-geral-de-funcionalidades)
  - [Como rodar a aplicação e detalhes do funcionamento](#como-rodar-a-aplicação-e-detalhes-do-funcionamento)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Notas](#notas)
    - [Git, GitHub e Histórico de Commits](#git-github-e-histórico-de-commits)
    - [Lint](#lint)

## Visualização

<!-- **Visualização:** -->

<div align="center">

![shopper](https://github.com/imsamuelcovalero/Desafio_Shopper/assets/98184355/d5c1da78-cdeb-40ee-9be5-23663b7afd1d)

</div>

## Contexto

O __Desafio Shopper__ é uma solução desenvolvida para atender às necessidades das lojas virtuais na atualização massiva de preços de produtos. Através da ferramenta, os usuários podem importar um arquivo `CSV` contendo os códigos dos produtos e os novos preços a serem atualizados. Além disso, o sistema realiza validações e aplica regras definidas pelas áreas envolvidas, garantindo que os preços estejam alinhados com as restrições estabelecidas.

### Visão Geral de Funcionalidades

O __Desafio Shopper__ conta com uma interface intuitiva, inclusive com opção de `temas` claro e escuro, que permite aos usuários:

- Realizar a validação dos dados.
- Visualizar as informações dos produtos.
- Atualizar os preços no banco de dados, caso todos os produtos estejam validados.

Além disso, desenvolvemos uma [ferramenta de importação de banco de dados](backend/src/services/DatabaseImportService/README_ImportSQL.md), que automatiza a criação do banco de dados e a inserção dos dados iniciais.

## Como rodar a aplicação e detalhes do funcionamento

A aplicação é melhor detalhada nos `README` de cada parte do projeto, que podem ser acessados nos links abaixo. Lá você encontrará informações sobre como rodar a aplicação, detalhes de funcionamento e mais.

### Frontend

O `README` referente ao __Frontend__ pode ser acessado [aqui](frontend/README.md).

### Backend

O `README` referente ao __Backend__ pode ser acessado [aqui](backend/README.md).

## Notas

### Git, GitHub e Histórico de Commits

Este projeto utilizou a [Especificação de Commits Convencionais](https://www.conventionalcommits.org/en/v1.0.0/), com alguns tipos da [convenção Angular](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines). Além disso, foi utilizado o pacote [conventional-commit-cli](https://www.npmjs.com/package/conventional-commit-cli) para ajudar a seguir a convenção de commits. É importante utilizar a convenção de commits em projetos para manter o histórico de commits organizado e facilitar a leitura e o entendimento do que foi desenvolvido.

No desenvolvimento da aplicação foi realizado utilizando o Git para controle de versão e o GitHub como repositório remoto. Foram criadas branches para cada funcionalidade implementada e, posteriormente, mergeadas à branch principal.

### Lint

- O projeto foi desenvolvido seguindo os padrões de Clean Code especificados pelo [Lint do Airbnb](https://github.com/airbnb/javascript).
