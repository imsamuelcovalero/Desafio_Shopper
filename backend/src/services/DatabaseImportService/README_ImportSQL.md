# Importação de Arquivos SQL com geração de arquivo .json e população do banco de dados

## Sumário

- [Importação de Arquivos SQL com geração de arquivo .json e população do banco de dados](#importação-de-arquivos-sql-com-geração-de-arquivo-json-e-população-do-banco-de-dados)
  - [Sumário](#sumário)
  - [Contexto](#contexto)
  - [Visualização](#visualização)
  - [Como utilizar](#como-utilizar)
    - [Sem Docker](#sem-docker)
    - [Com Docker](#com-docker)
  - [Detalhes Técnicos](#detalhes-técnicos)
    - [Estrutura do diretório](#estrutura-do-diretório)
    - [Arquivos](#arquivos)
    - [Docker-compose](#docker-compose)
    - [Tecnologias e Ferramentas Utilizadas](#tecnologias-e-ferramentas-utilizadas)

## Contexto

Esta funcionalidade permite a importação de arquivos .sql para o banco de dados e/ou a geração de um arquivo .json com as informações transcritas. Isso é feito através de um `script` node que foi desenvolvido para esta finalidade. Além disso, a estrutura do `Docker-compose` foi adaptada para garantir que o `script` e a inicialização da aplicação funcionem corretamente.

## Visualização

<!-- **Visualização:** -->

<div align="center">

![script_database](https://github.com/imsamuelcovalero/Desafio_Shopper/assets/98184355/825d677d-6ff8-4013-9a86-9671e57479e9)

</div>

## Como utilizar

Para utilizar esta funcionalidade, é necessário primeiro colocar o arquivo .sql no diretório `backend/src/database`. Certifique-se de que haja apenas um arquivo .sql neste local.

### Sem Docker

Em seguida, você deve executar o seguinte comando para iniciar o processo de importação dos dados:

```bash
npm run import:sql
```

A seguir, temos quatro opções para executar esta funcionalidade, você pode escolher uma delas dependendo do que deseja fazer:

1. Popular o banco de dados com os dados do arquivo .sql:

2. Gerar um arquivo .json com os dados do arquivo .sql:

3. Popular o banco de dados e criar o arquivo .json:

4. Sair:

Lembre-se que para qualquer uma das opções acima, o banco de dados precisa estar funcionando. O comando irá aguardar por 10 segundos para que o banco de dados esteja pronto antes de iniciar a importação dos dados.

Caso ocorra algum erro durante a execução, a mensagem de erro será exibida e o processo será encerrado com um código de saída 1.

### Com Docker

Para utilizar esta funcionalidade com o `Docker-compose`, você deve primeiro colocar o arquivo .sql no diretório `backend/src/database`. Certifique-se de que haja apenas um arquivo .sql neste local.

O `docker-compose`se encarregará de rodar o script `npm run import:sql` automaticamente selecionando a opção 2, ou seja, gerar um arquivo .json com os dados do arquivo .sql e após isso ele executa o comando para rodar a seed, que recebe o arquivo .json gerado como parâmetro e popula o banco de dados com os dados do arquivo .json.

## Detalhes Técnicos

### Estrutura do diretório

```
.
├── backend
│   ├── src
│   │   ├── database
│   │   │   └── arquivo.sql
│   │   ├── services
│   │   │   ├── DatabaseImportService
│   │   │   │   ├── DatabaseImportService.ts
│   │   │   │   ├── README_ImportSQL.md
│   │   │   │   ├── SqlImportService.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── writeJSONFileService.ts
│   │   │   └── ...
│   │   ├── scripts
│   │   │   ├── database_install.ts
│   │   │   └── ...
│   │   └── ...
│   ├── package.json
│   └── ...
├── check-db.sh
├── docker-compose.yaml
└── ...
```

### Arquivos

- `DatabaseImportService.ts`: Este arquivo define a classe `DatabaseImportService`, que é responsável por gerenciar as operações de importação e exportação de dados SQL.
- `index.ts`: Arquivo principal do serviço, contém a lógica para a execução do `script` node.
- `SqlImportService.ts`: Este arquivo contém a lógica para a importação dos dados do arquivo .sql para o banco de dados e/ou para a geração do arquivo .json.
- `writeJSONFileService.ts`: Este arquivo contém a lógica para a escrita dos dados importados em um arquivo .json.
- `database_install.ts`: Este arquivo, localizado na pasta `backend/src/scripts`, é responsável por instalar e configurar o banco de dados da aplicação.
- `package.json`: Este é o arquivo de configuração do projeto Node.js. Ele lista todas as dependências do projeto e define scripts que podem ser executados para várias tarefas, como iniciar a aplicação e rodar os testes.
- `check-db.sh`: Este é um script shell que verifica se o banco de dados está funcionando antes de iniciar o serviço backend. Este script é utilizado como parte da configuração do Docker Compose para a aplicação.
- `docker-compose.yaml`: Este arquivo define a configuração do Docker Compose para a aplicação, incluindo a criação de volumes para o script de verificação do banco de dados e as variáveis de ambiente, além da configuração do serviço do banco de dados e do serviço backend.
- `arquivo.sql`: Este é o arquivo .sql que será importado para o banco de dados. Ele deve ser colocado no diretório `backend/src/database`.

### Docker-compose

Na configuração do `Docker-compose`, tivemos que superar alguns desafios para garantir o funcionamento adequado do nosso `script` node. A razão para esses desafios foi a descontinuação do comando `condition: service_healthy` em versões mais recentes do Docker Compose, que era usado para garantir que o banco de dados estivesse operacional antes de iniciar o serviço backend. Para contornar essa situação, fizemos várias modificações e implementações, que detalho a seguir:

- **Dockerfile**: No nosso `Dockerfile`, adicionamos permissões e instalamos ferramentas específicas necessárias para o funcionamento da nossa aplicação.

- **Volumes no Docker-compose**: Criamos dois volumes que servem propósitos específicos para o funcionamento do nosso script e aplicação:

  1. `./check-db.sh:/app/check-db.sh`: Este volume mapeia o nosso script personalizado `check-db.sh`, presente no diretório raiz do nosso projeto, para a pasta `/app` dentro do container Docker. O script `check-db.sh` é utilizado para verificar se o banco de dados está operacional antes de iniciar o serviço backend, uma função que era realizada pelo comando `condition: service_healthy` em versões anteriores do Docker Compose.

  2. `./backend/.docker.env:/app-backend/.env`: Este volume mapeia o arquivo `.docker.env` presente no diretório `backend` do nosso projeto para a pasta `/app-backend` dentro do container Docker. O arquivo `.env` contém variáveis de ambiente necessárias para a execução do nosso script e da aplicação em geral.

  ```yaml
  volumes:
  - ./check-db.sh:/app/check-db.sh
  - ./backend/.docker.env:/app-backend/.env
  ```4

- **Usuário e Comando no Docker-compose**:
  Definimos um usuário específico (`id 1000`, que é o padrão em sistemas Linux) para executar os scripts do package.json e definimos um comando personalizado que utiliza o nosso script personalizado:

  ```yaml
  user: "1000:1000"
  command:
    [
      "/app/check-db.sh",
      "db",
      "npm",
      "run",
      "dev:complete"
    ]
  ```

- **Script Personalizado**: Para substituir o comportamento da condição `service_health`, adicionamos um comando personalizado no `package.json`: `"dev:complete": "concurrently \"npm:dev\" \"npm run import:sql 2 && npx sequelize-cli db:seed:all\""`. Esta implementação nos permitiu iniciar múltiplos processos simultaneamente, o que é crucial para o funcionamento da nossa aplicação no ambiente do Docker, pois passa a segunda opção para o script de importação de dados.

### Tecnologias e Ferramentas Utilizadas

- [mysql2/promise](https://www.npmjs.com/package/mysql2): Este pacote é uma versão "promisificada" da biblioteca mysql2, que permite a utilização de Promises para tratar consultas ao banco de dados de maneira mais eficiente e menos propensa a erros.
- [fs](https://nodejs.org/api/fs.html): A biblioteca "fs" é um módulo nativo do Node.js que fornece uma API para interagir com o sistema de arquivos de maneira semelhante à que é oferecida pelos comandos shell padrão. Utilizamos este módulo para ler e escrever arquivos durante o processo de importação de dados.
- [inquirer](https://www.npmjs.com/package/inquirer): Ferramenta para criar interface de linha de comando interativa.
- [mysql-import](https://www.npmjs.com/package/mysql-import): Biblioteca para importar arquivos SQL no MySQL.
- [mysql2](https://www.npmjs.com/package/mysql2): Um driver MySQL promisificado para Node.js.
- [readline-sync](https://www.npmjs.com/package/readline-sync): Biblioteca para fazer perguntas ao usuário via linha de comando de forma síncrona.
- [concurrently](https://www.npmjs.com/package/concurrently): Ferramenta para rodar múltiplos comandos npm simultaneamente.

[⬆ Voltar ao topo](#importação-de-arquivos-sql)<br>
[⬅ Voltar para a página anterior](../../../README.md)
