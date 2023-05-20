// start.ts
import { DatabaseImportService } from './DatabaseImportService';

const mode = process.argv[2] as 'json' | 'db' | 'both' | undefined; // get the command line argument

const databaseImportService = new DatabaseImportService();
databaseImportService.importDataFromSqlFile(mode).catch(err => {
  console.error('Erro ao importar o arquivo SQL: ', err);
  process.exit(1);
});