## Sumário
- [Contexto](#contexto)
- [Tecnologias e Ferramentas Utilizadas](#tecnologias-e-ferramentas-utilizadas)
- [Instalação e Execução](#instalação-e-execução)
- [Executando com Docker](#executando-com-docker)
- [Executando sem Docker](#executando-sem-docker)

## Contexto
O __Backend__, é responsável por:
- Montar a estrutura inicial das tabelas e relações através do `Sequelize`. Uma funcionalidade __extra__ foi criada para oferecer alguams formas de pupular o `banco de dados`.
- Receber o conteúdo do arquivo CSV proveniente da interação com o botão`VALIDAR`, verificando a integridade inicial dos dados e em seguida consultar o `banco de dados` e aplicar as devidas as regras de negócio (acha pertinente adicionar abaixo uma seção mostrando as regras ou talvez criar uma seção a parte para isto?).
- Devolver para o `Frontend` as informações pertinentes, a serem exibidas para o usuário. 
- Ao receber o sinal proveninete da interação com o botão `ATUALIZAR`, gravar as novas informações no `banco de dados`.

## Tecnologias e Ferramentas Utilizadas
O `Backend` foi desenvolvido com o uso das seguintes tecnologias e ferramentas:

- [Node.js ](https://nodejs.org/en)| Plataforma de desenvolvimento em JavaScript para construção do backend.
- [TypeScript](https://www.typescriptlang.org/) | Linguagem de programação que adiciona tipagem estática ao JavaScript.
- [SQL](https://www.mysql.com/) | Linguagem de consulta estruturada utilizada para interagir com o banco de dados.
- [Joi](https://github.com/sideway/joi) | Biblioteca de validação de dados em JavaScript utilizada para validar o arquivo CSV importado.
- [Express](https://expressjs.com/) | Framework web para Node.js utilizado para criação de rotas e endpoints do backend.
- [Sequelize](https://sequelize.org/) | ORM (Object-Relational Mapping) em JavaScript utilizado para mapeamento objeto-relacional e interação com o banco de dados MySQL.

## Instalação e Execução
### Download do projeto
Primeiro, você precisa fazer o clone do repositório do projeto. Para isso, use o comando:
```
git clone git@github.com:imsamuelcovalero/Desafio_Shopper.git
```
### Instalar dependências
Em seguida, navegue até o diretório `backend` e instale as dependências necessárias com os seguintes comandos:
```
cd Desafio_Shopper

cd backend
npm install
```
Esses comandos instalam todas as dependências listadas no arquivo `package.json`, que são necessárias para a execução do projeto.

## Executando com Docker
Para executar o projeto utilizando Docker, assegure-se de ter o `Docker` e o `Docker Compose` instalados em sua máquina. Em seguida, no diretório raiz do projeto, execute o seguinte comando:
```
docker-compose up -d
```
O `serviço backend` será executado na porta 3001.

## Executando sem Docker
Caso prefira executar o projeto sem `Docker`, após a instalação das dependências, você pode iniciar a aplicação com o seguinte comando:
```
cd Desafio_Shopper

cd frontend
npm run dev
```
Este comando inicia o servidor de desenvolvimento e o site ficará disponível na porta 3001, geralmente acessível através do endereço `http://localhost:3001` no navegador.

É importante lembrar que, ao encontrar problemas durante a instalação ou execução, uma boa prática é verificar as mensagens de erro que aparecem no terminal. Elas geralmente fornecem pistas sobre o que pode estar errado. Também é recomendável manter todas as dependências atualizadas e garantir que seu ambiente de desenvolvimento esteja configurado corretamente. Além disso, é aconselhável consultar a documentação oficial das dependências usadas no projeto em caso de problemas.

Em caso de dúvidas, não hesite em abrir uma [issue](https://github.com/imsamuelcovalero/Desafio_Shopper/issues) no GitHub ou me contatar diretamente. Estou à disposição para ajudar.

Espero que essas sugestões tenham sido úteis. Se houver mais alguma coisa em que eu possa ajudar, por favor, me avise.
