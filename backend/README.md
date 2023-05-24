## Sumário
- [Contexto](#contexto)
- [Regras de Negócio](#regras-de-negócio)
- [API](#api)
- [Tecnologias e Ferramentas Utilizadas](#tecnologias-e-ferramentas-utilizadas)
- [Instalação e Execução](#instalação-e-execução)
- [Executando com Docker](#executando-com-docker)
- [Executando sem Docker](#executando-sem-docker)

## Contexto
O __Backend__ é responsável por:
- Montar a estrutura inicial das tabelas e relações através do `Sequelize`. Uma funcionalidade __extra__ foi criada para oferecer algumas formas de popular o `banco de dados`. Também foram criados diversos `scripts` no `package.json` para cuidar da organização e inicialização correta da aplicação.
- Receber o conteúdo do arquivo CSV proveniente da interação com o botão `VALIDAR`, verificar a integridade inicial dos dados e, em seguida, consultar o `banco de dados` e aplicar as devidas regras de negócio.
- Devolver para o `Frontend` as informações pertinentes, a serem exibidas para o usuário. 
- Ao receber o sinal proveniente da interação com o botão `ATUALIZAR`, gravar as novas informações no `banco de dados`.

## Regras de Negócio
Em qualquer empresa de e-commerce, é essencial que os usuários possam atualizar os preços de suas lojas para se manterem competitivos e manterem seus preços alinhados com os custos de operação. Essa tarefa parece simples, porém, quando falamos de lojas com milhares de produtos, se torna essencial a existência de uma ferramenta que permita atualizar os produtos de forma massiva e com recursos adicionais para evitar erros que possam prejudicar o negócio.

Após uma série de reuniões com as áreas envolvidas, os seguintes requisitos foram levantados:

1. **Time de Compras**: responsável por definir os preços, se comprometeu em gerar um arquivo CSV contendo código do produto e o novo preço que será carregado.
2. **Time Financeiro**: preocupado com o faturamento, solicitou que o sistema impeça que o preço de venda dos produtos fique abaixo do custo deles.
3. **Time de Marketing**: preocupado com o impacto de reajustes nos clientes, solicitou que o sistema impeça qualquer reajuste maior ou menor do que 10% do preço atual do produto.
4. **Produtos em pacotes**: Alguns produtos são vendidos em pacotes, ou seja, um produto que é composto por um ou mais produtos em quantidades diferentes. Estabeleceu-se a regra que, ao reajustar o preço de um pacote, o mesmo arquivo deve conter os reajustes dos preços dos componentes do pacote de modo que o preço final da soma dos componentes seja igual ao preço do pacote.

O sistema deve seguir estas regras para garantir que os preços sejam atualizados corretamente. Caso uma ou mais regras de validação tenham sido quebradas, o sistema também deve exibir ao lado de cada produto qual regra foi quebrada.

## API
### POST /products
Essa rota espera receber um corpo de requisição seguindo o formato abaixo:

```json
{
  "products": [
    {
      "code": 16,
      "newPrice": 20.00
    }
  ]
}
```
Se a validação dos dados for bem-sucedida, a rota retornará um corpo de resposta similar ao seguinte:
```json
[
  {
    "code": "16",
    "name": "AZEITE  PORTUGUES  EXTRA VIRGEM GALLO 500ML",
    "currentPrice": "20.49",
    "newPrice": 25.5,
    "status": [ "Reajuste inválido para o produto" ]
  }
]
```

### PATCH /products
Essa rota também espera receber um corpo de requisição no mesmo formato que o da rota POST descrita acima. Se a atualização dos preços for bem-sucedida, a rota retornará a seguinte mensagem:
```json
"Preços atualizados com sucesso. Novo arquivo pode ser enviado para verificação"
```

## Tecnologias e Ferramentas Utilizadas
O `Backend` foi desenvolvido com o uso das seguintes tecnologias e ferramentas:

- [Node.js ](https://nodejs.org/en): A plataforma de desenvolvimento em JavaScript foi escolhida para a construção do backend devido à sua alta performance, facilidade de aprendizado e ampla adoção na comunidade de desenvolvimento.
- [TypeScript](https://www.typescriptlang.org/): Utilizei o TypeScript para adicionar tipagem estática ao JavaScript, proporcionando um nível extra de segurança e previsibilidade ao código.
- [SQL](https://www.mysql.com/): A linguagem de consulta estruturada foi utilizada para interagir com o banco de dados, devido a sua ampla adoção e robustez comprovada.
- [Joi](https://github.com/sideway/joi): Esta biblioteca de validação de dados em JavaScript foi escolhida por sua facilidade de uso e versatilidade na validação de diversos tipos de dados, incluindo o arquivo CSV importado.
- [Express](https://expressjs.com/): Escolhi este framework web para Node.js devido à sua simplicidade e eficácia na criação de rotas e endpoints do backend.
- [Sequelize](https://sequelize.org/): O Sequelize, um ORM (Object-Relational Mapping) em JavaScript, foi utilizado para facilitar a interação com o banco de dados MySQL, tornando o código mais fácil de ler e manter.

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

cd backend
npm run dev
```
Este comando inicia o servidor de desenvolvimento e ficará disponível na porta 3001, geralmente acessível através do endereço `http://localhost:3001` no navegador.

É importante lembrar que, ao encontrar problemas durante a instalação ou execução, uma boa prática é verificar as mensagens de erro que aparecem no terminal. Elas geralmente fornecem pistas sobre o que pode estar errado. Também é recomendável manter todas as dependências atualizadas e garantir que seu ambiente de desenvolvimento esteja configurado corretamente. Além disso, é aconselhável consultar a documentação oficial das dependências usadas no projeto em caso de problemas.

Em caso de dúvidas, não hesite em abrir uma [issue](https://github.com/imsamuelcovalero/Desafio_Shopper/issues) no GitHub ou me contatar diretamente. Estou à disposição para ajudar.

Espero que essas sugestões tenham sido úteis. Se houver mais alguma coisa em que eu possa ajudar, por favor, me avise.
