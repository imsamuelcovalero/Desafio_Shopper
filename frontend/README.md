## Sumário
- [Contexto](#contexto)
- [Tecnologias e Ferramentas Utilizadas](#tecnologias-e-ferramentas-utilizadas)
- [Instalação e Execução](#instalação-e-execução)
- [Executando com Docker](#executando-com-docker)
- [Executando sem Docker](#executando-sem-docker)

## Contexto
No lado do __Frontend__, o usuário é capaz de:
- Selecionar um arquivo CSV contendo os novos preços
- Acionar a opção `VALIDAR`, enviando o arquivo ao backend e recebendo as informações pertinentes que são apresentadas em uma tabela
- Acionar a opção `ATUALIZAR`, que fica disponível quando todas as regras de negócio são respeitadas, enviando, assim, o comando para gravar as novas informações no `banco de dados`.
- __Extra__: Personalizar a cor do tema pelo botão `Mode`, localizado no cabeçalho.

## Tecnologias e Ferramentas Utilizadas
O `Frontend` foi desenvolvido com o uso das seguintes tecnologias e ferramentas:

- [React.js](https://reactjs.org/docs/getting-started.html): Uma biblioteca JavaScript robusta e amplamente utilizada para a criação de interfaces de usuário.
- [Styled Components](https://styled-components.com/): Utilizado para a estilização do CSS em formato de componente, o que facilita a leitura do código e viabiliza a implementação de temas, como o dark mode presente na aplicação.
- [Context API](https://pt-br.reactjs.org/docs/context.html): Uma API de gerenciamento de estado, que permite compartilhar informações importantes da aplicação entre diferentes componentes, sem a necessidade de passá-las manualmente através de props.

## Instalação e Execução
### Download do projeto
Primeiro, você precisa fazer o clone do repositório do projeto. Para isso, use o comando:
```
git clone git@github.com:imsamuelcovalero/Desafio_Shopper.git
```
### Instalar dependências
Em seguida, navegue até o diretório `frontend` e instale as dependências necessárias com os seguintes comandos:
```
cd Desafio_Shopper

cd frontend
npm install
```
Esses comandos instalam todas as dependências listadas no arquivo `package.json`, que são necessárias para a execução do projeto.

## Executando com Docker
Para executar o projeto utilizando Docker, assegure-se de ter o Docker e o Docker Compose instalados em sua máquina. Em seguida, no diretório raiz do projeto, execute o seguinte comando:
```
docker-compose up -d
```
O serviço frontend será executado na porta 3000.

## Executando sem Docker
Caso prefira executar o projeto sem Docker, após a instalação das dependências, você pode iniciar a aplicação com o seguinte comando:
```
cd Desafio_Shopper

cd frontend
npm start
```
Este comando inicia o servidor de desenvolvimento e o site ficará disponível na porta 3000, geralmente acessível através do endereço `http://localhost:3000` no navegador.

É importante lembrar que, ao encontrar problemas durante a instalação ou execução, uma boa prática é verificar as mensagens de erro que aparecem no terminal. Elas geralmente fornecem pistas sobre o que pode estar errado. Também é recomendável manter todas as dependências atualizadas e garantir que seu ambiente de desenvolvimento esteja configurado corretamente. Além disso, é aconselhável consultar a documentação oficial das dependências usadas no projeto em caso de problemas.

Em caso de dúvidas, não hesite em abrir uma [issue](https://github.com/imsamuelcovalero/Desafio_Shopper/issues) no GitHub ou me contatar diretamente. Estou à disposição para ajudar.

Espero que essas sugestões tenham sido úteis. Se houver mais alguma coisa em que eu possa ajudar, por favor, me avise.

