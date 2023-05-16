# Bem-vindo ao projeto 007 Foods

O Desafio Shopper é uma ferramenta que permite a atualização massiva de preços de produtos para lojas virtuais. Com React.js no frontend e Node.js no backend, a aplicação valida os dados de um arquivo CSV, exibe as informações dos produtos e, caso não haja violações de regras, possibilita a atualização dos preços no banco de dados MySQL. 
> - Veja o post sobre a aplicação [no LinkedIn aqui.](https://www.linkedin.com/posts/samuelcovalero_frontend-agile-trello-activity-6970746088400019456-ykXl?utm_source=share&utm_medium=member_desktop)
> - Acesse o [deploy da aplicação aqui.](https://project-recipes-app-jet.vercel.app/)
<details>
<summary>Informações para utilizar a aplicação no deploy</summary><br>
 
 - Para logar, o email deve estar no padrão `user@email.com`, e a senha ter mais do que `6 caracteres`.
 
</details>

## Sumário
- [Bem-vindo ao projeto  007 Foods](#bem-vindo-ao-projeto-007-foods)
- [Visualização](#visualização)
- [Contexto](#contexto)
- [Tecnologias e Ferramentas Utilizadas](#tecnologias-e-ferramentas-utilizadas)
- [Instalação e Execução](#instalação-e-execução)
- [Notas](#notas)
  - [Git, GitHub e Histórico de Commits](#git-github-e-histórico-de-commits)
  - [Lint](#lint)
 
## Visualização
### Visualização para dispositivos móveis
A aplicação foi desenvolvida com design responsivo e pensada para ser utilizada em dispositivos móveis. Sugerimos a vizualiação em resolução `360x640` pixels para a melhor experiência possível.

<!-- **Visualização:** -->

<div align="center">

![appReceitas](https://user-images.githubusercontent.com/98184355/221451995-4efe8014-ce9e-4e2f-92f8-87365750df13.gif)

</div>


## Contexto
A __aplicação 007 Foods__ é uma ferramenta que acessa as bases de dados de receitas de comidas e bebidas, permitindo ao usuário:
- Fazer login;
- Buscar por receitas por nome, ingrediente, primeira letra, tipo de drink ou refeição;
- Visualizar detalhes das receitas, com vídeo de execução, sugestões de acompanhamento e informações nutricionais;
- Favoritar ou compartilhar receitas;
- Acessar a seção de receitas prontas e favoritas após o login;
- Explorar as receitas por nacionalidade ou ingrediente, ou encontrar sugestões aleatórias de pratos e bebidas;
- Utilizar o Local Storage para manter informações das receitas favoritas, iniciadas e finalizadas.

## Tecnologias e Ferramentas Utilizadas

Este projeto utiliza as seguintes tecnologias e ferramentas:

- [React.js](https://reactjs.org/docs/getting-started.html) | Biblioteca para criar interfaces de usuário.
- [Styled Components](https://styled-components.com/) | Biblioteca para estilização do CSS.
- [API de comidas](https://www.themealdb.com/api.php) | API utilizada para obter informações sobre receitas de comidas.
- [API de bebidas](https://www.thecocktaildb.com/api.php) | API utilizada para obter informações sobre receitas de bebidas.
- [Context API](https://pt-br.reactjs.org/docs/context.html) | API utilizada para gerenciamento de estado.
- [Trello](https://trello.com/) | Ferramenta de gerenciamento de tarefas.

O React.js foi escolhido por ser uma das bibliotecas mais populares e amplamente utilizadas para criar interfaces de usuário. Além disso, o React.js é fácil de aprender e possui uma grande comunidade de desenvolvedores, o que torna mais fácil encontrar soluções para problemas comuns. O Styled Components foi escolhido porque permite que os desenvolvedores escrevam o CSS em formato de componente, o que torna o código mais legível e fácil de entender. As APIs de comidas e bebidas foram escolhidas por fornecerem informações detalhadas e variadas sobre receitas, o que enriquece a experiência do usuário na aplicação. A Context API foi utilizada para gerenciamento de estado, permitindo que informações importantes da aplicação sejam compartilhadas entre diferentes componentes, sem a necessidade de passá-las manualmente através de props. Isso torna o código mais limpo e fácil de entender. O Trello foi utilizado para gerenciamento de tarefas, seguindo metodologias ágeis durante o desenvolvimento.

## Instalação e Execução
### Download do projeto
```
git clone git@github.com:imsamuelcovalero/Project-Recipes-App.git
```
### Instalar dependências
```
cd Project-Recipes-App
npm install
```
### Rodar a aplicação
```
cd Project-Recipes-App
npm start
```

## Notas
A aplicação foi desenvolvida utilizando o conceito de __mobile first__, ou seja, a interface foi projetada primeiramente para dispositivos móveis.

### Git, GitHub e Histórico de Commits
Este projeto utilizou a [Especificação de Commits Convencionais](https://www.conventionalcommits.org/en/v1.0.0/), com alguns tipos da [convenção Angular](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines). Além disso, foi utilizado o pacote [conventional-commit-cli](https://www.npmjs.com/package/conventional-commit-cli) para ajudar a seguir a convenção de commits. É importante utilizar a convenção de commits em projetos para manter o histórico de commits organizado e facilitar a leitura e o entendimento do que foi desenvolvido.

No desenvolvimento da aplicação foi realizado utilizando o Git para controle de versão e o GitHub como repositório remoto. Foram criadas branches para cada funcionalidade implementada e, posteriormente, mergeadas à branch principal.

### Metodologias Ágeis
Durante o desenvolvimento deste projeto, foram utilizadas metodologias ágeis, que são práticas que valorizam a interação e colaboração entre os membros de uma equipe de desenvolvimento, visando uma entrega mais rápida e eficiente do projeto. A utilização dessas práticas é especialmente importante em projetos em grupo, pois ajuda a manter a equipe alinhada e a evitar atrasos e retrabalhos desnecessários. Para saber mais sobre as metodologias ágeis, confira o [Manifesto Ágil](https://agilemanifesto.org/).

### Lint
- O projeto foi desenvolvido seguindo os padrões de Clean Code especificados pelo [Lint da Trybe](https://github.com/betrybe/eslint-config-trybe).
