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

- [React.js](https://reactjs.org/docs/getting-started.html): Utilizei o React.js, uma biblioteca JavaScript robusta e amplamente adotada para a criação de interfaces de usuário. Sua escolha se deu pelo fato de que, além de ser uma das bibliotecas mais populares e utilizadas para esse fim, o React.js é fácil de aprender, possui uma grande comunidade de desenvolvedores, o que facilita encontrar soluções para problemas comuns, e permite a criação de interfaces de usuário altamente interativas e eficientes.
- [Styled Components](https://styled-components.com/): O Styled Components foi selecionado como a ferramenta para a estilização do CSS em formato de componente. Esse formato facilita a leitura do código, pois permite que o CSS seja escrito da mesma maneira que o JavaScript, além de viabilizar a implementação de temas, como o dark mode presente na aplicação. Essa biblioteca auxilia na manutenção do código ao longo do tempo e oferece uma experiência de desenvolvimento aprimorada.
- [Context API](https://pt-br.reactjs.org/docs/context.html): Para o gerenciamento de estado, optei pela Context API, uma funcionalidade incorporada ao React.js. A Context API permite compartilhar informações importantes da aplicação entre diferentes componentes, sem a necessidade de passá-las manualmente através de props. Isso contribui para um código mais limpo, fácil de entender e manter, pois elimina a necessidade de prop drilling, onde as propriedades precisam ser passadas manualmente para cada nível de componentes aninhados.

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

