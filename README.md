# Bem-vindo ao Desafio Shopper

O Desafio Shopper é uma ferramenta que permite a atualização massiva de preços de produtos para lojas virtuais. Com React.js no frontend e Node.js no backend, a aplicação valida os dados de um arquivo CSV, exibe as informações dos produtos e, caso não haja violações de regras, possibilita a atualização dos preços no banco de dados MySQL. 

## Sumário
- [Bem-vindo ao Desafio_Shopper](#bem-vindo-ao-desafio-shopper)
- [Contexto](#contexto)
- [Tecnologias e Ferramentas Utilizadas](#tecnologias-e-ferramentas-utilizadas)
- [Instalação e Execução](#instalação-e-execução)
- [Notas](#notas)
  - [Git, GitHub e Histórico de Commits](#git-github-e-histórico-de-commits)
  - [Lint](#lint)


## Contexto
O __Desafio Shopper__ é uma ferramenta desenvolvida para atender às necessidades das lojas virtuais na atualização massiva de preços de produtos. Com a ferramenta, os usuários podem importar um arquivo CSV contendo os códigos dos produtos e os novos preços a serem atualizados. Além disso, o sistema realiza validações e aplica regras definidas pelas áreas envolvidas, garantindo que os preços estejam alinhados com as restrições estabelecidas. Com uma interface intuitiva, o Desafio Shopper permite que os usuários:
- Realizem a validação dos dados
- Visualizem as informações dos produtos
- Caso todos os produtos estiverem validados, atualizem os preços no banco de dados.

## Tecnologias e Ferramentas Utilizadas

Este projeto utiliza as seguintes tecnologias e ferramentas:

- [React.js](https://reactjs.org/docs/getting-started.html) | Biblioteca para criar interfaces de usuário.
- [Styled Components](https://styled-components.com/) | Biblioteca para estilização do CSS.
- [Node.js ](https://nodejs.org/en)| Plataforma de desenvolvimento em JavaScript para construção do backend.
- [TypeScript](https://www.typescriptlang.org/) | Linguagem de programação que adiciona tipagem estática ao JavaScript.
- [SQL](https://www.mysql.com/) | Linguagem de consulta estruturada utilizada para interagir com o banco de dados.
- [Joi](https://github.com/sideway/joi) | Biblioteca de validação de dados em JavaScript utilizada para validar o arquivo CSV importado.
- [Express](https://expressjs.com/) | Framework web para Node.js utilizado para criação de rotas e endpoints do backend.
- [Sequelize](https://sequelize.org/) | ORM (Object-Relational Mapping) em JavaScript utilizado para mapeamento objeto-relacional e interação com o banco de dados MySQL.

O React.js foi escolhido por ser uma das bibliotecas mais populares e amplamente utilizadas para criar interfaces de usuário. Além disso, o React.js é fácil de aprender e possui uma grande comunidade de desenvolvedores, o que torna mais fácil encontrar soluções para problemas comuns. O Styled Components foi escolhido porque permite que os desenvolvedores escrevam o CSS em formato de componente, o que torna o código mais legível e fácil de entender. As APIs de comidas e bebidas foram escolhidas por fornecerem informações detalhadas e variadas sobre receitas, o que enriquece a experiência do usuário na aplicação. A Context API foi utilizada para gerenciamento de estado, permitindo que informações importantes da aplicação sejam compartilhadas entre diferentes componentes, sem a necessidade de passá-las manualmente através de props. Isso torna o código mais limpo e fácil de entender. O Trello foi utilizado para gerenciamento de tarefas, seguindo metodologias ágeis durante o desenvolvimento.
Node.js: O Node.js foi selecionado como a plataforma de desenvolvimento backend. Ele é amplamente utilizado devido à sua capacidade de criar servidores web escaláveis e de alto desempenho. O Node.js utiliza o JavaScript como linguagem de programação, permitindo que os desenvolvedores utilizem a mesma linguagem tanto no frontend quanto no backend, o que simplifica a troca de informações entre as camadas do aplicativo.
TypeScript: O TypeScript foi escolhido como linguagem de programação para adicionar tipagem estática ao JavaScript. Essa adição de tipagem estática traz benefícios, como a detecção de erros em tempo de compilação e a melhoria na produtividade do desenvolvimento. O TypeScript ajuda a evitar erros comuns e permite que os desenvolvedores escrevam um código mais seguro, confiável e escalável.
SQL: A linguagem SQL é utilizada para interagir com o banco de dados. Com o SQL, é possível realizar consultas, inserções, atualizações e exclusões de dados no banco de dados de forma eficiente. Ela fornece uma sintaxe padronizada e poderosa para manipular informações estruturadas, o que é essencial para a persistência de dados em aplicações.
Joi: O Joi é uma biblioteca de validação de dados em JavaScript que foi utilizada para validar o arquivo CSV importado. Essa biblioteca oferece recursos avançados para validar e verificar a integridade dos dados, garantindo que o arquivo CSV esteja em conformidade com as regras estabelecidas. Com o Joi, é possível definir regras personalizadas e realizar a validação de forma simples e eficiente.
Express: O Express é um framework web para Node.js amplamente utilizado para a criação de rotas e endpoints no backend. Ele oferece uma estrutura simples e flexível para construir APIs, permitindo o desenvolvimento rápido e eficiente de aplicativos web. Com o Express, é possível lidar com solicitações HTTP, definir rotas, processar dados de formulários e muito mais.
Sequelize: O Sequelize é um ORM (Object-Relational Mapping) em JavaScript que foi utilizado para mapeamento objeto-relacional e interação com o banco de dados MySQL. Ele simplifica o acesso e a manipulação de dados no banco de dados, fornecendo uma camada de abstração entre o código JavaScript e o banco de dados. Com o Sequelize, é possível definir modelos de dados, realizar consultas complexas, criar associações entre tabelas e executar operações de CRUD de maneira intuitiva. Ele simplifica o processo de interação com o banco de dados, oferecendo recursos como validações de dados, migrações e transações.

## Instalação e Execução
### Download do projeto
```
git clone git@github.com:imsamuelcovalero/Desafio_Shopper.git
```
### Instalar dependências
```
cd Desafio_Shopper

cd backend
npm install

cd frontend
npm install
```
### Rodar a aplicação
```
cd Desafio_Shopper

cd backend
npm run dev

cd frontend
npm start
```

## Notas

### Git, GitHub e Histórico de Commits
Este projeto utilizou a [Especificação de Commits Convencionais](https://www.conventionalcommits.org/en/v1.0.0/), com alguns tipos da [convenção Angular](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines). Além disso, foi utilizado o pacote [conventional-commit-cli](https://www.npmjs.com/package/conventional-commit-cli) para ajudar a seguir a convenção de commits. É importante utilizar a convenção de commits em projetos para manter o histórico de commits organizado e facilitar a leitura e o entendimento do que foi desenvolvido.

No desenvolvimento da aplicação foi realizado utilizando o Git para controle de versão e o GitHub como repositório remoto. Foram criadas branches para cada funcionalidade implementada e, posteriormente, mergeadas à branch principal.

### Lint
- O projeto foi desenvolvido seguindo os padrões de Clean Code especificados pelo [Lint do Airbnb](https://github.com/airbnb/javascript).
