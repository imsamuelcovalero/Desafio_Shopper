// database_install.ts
import { exec } from 'child_process';
import inquirer from 'inquirer';
import path from 'path';

async function runCommand(command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.warn(`Erro: ${error}`);
        reject(error);
        return;
      }
      console.log(stdout);
      resolve();
    });
  });
}

// Essa linha é necessária para o script receber uma opção pela linha de comando do package.json e executar a opção de forma automatizada
let option = process.argv[2];

if (!option) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'option',
        message: 'Escolha uma opção:',
        choices: [
          { name: '1) Popular o banco de dados', value: '1' },
          { name: '2) Criar o arquivo database.json', value: '2' },
          { name: '3) Ambos', value: '3' },
          { name: '4) Cancelar', value: '4' },
        ],
      },
    ])
    .then((answers) => {
      option = answers.option;
      executeOption();
    });
} else {
  executeOption();
}

function executeOption() {
  console.log('Aguardando o banco de dados ficar pronto...');
  // Simula um sleep de 10 segundos
  setTimeout(() => {
    console.log('Iniciando a importação dos dados...');

    const startPath = path.resolve(__dirname, '../services/DatabaseImportService/start.ts');

    switch (option) {
      case '1':
        console.log('Populando o banco de dados...');
        runCommand(`ts-node ${startPath} db`);
        break;
      case '2':
        console.log('Criando o arquivo database.json...');
        runCommand(`ts-node ${startPath} json`);
        break;
      case '3':
        console.log('Populando o banco de dados e criando o arquivo database.json...');
        runCommand(`ts-node ${startPath} both`);
        break;
      case '4':
        console.log('Cancelando...');
        break;
      default:
        console.log('Opção inválida. Por favor, escolha 1, 2, 3 ou 4.');
        break;
    }
  }, 10000);
}