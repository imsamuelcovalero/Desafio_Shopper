/* O arquivo .sql deve estar na pasta backend/src/database e só deve haver UM arquivo .sql neste local*/
import SqlImportService from './SqlImportService.js';
import { join } from 'path';
import { readdirSync } from 'fs';

export class DatabaseImportService {
  private sqlImportService: SqlImportService;

  constructor() {
    this.sqlImportService = new SqlImportService();
  }

  async importDataFromSqlFile() {
    const sqlDirectory = join(__dirname, '..', 'database');
    const filesInDirectory = readdirSync(sqlDirectory);

    // filtrar os arquivos .sql
    const sqlFiles = filesInDirectory.filter(file => file.endsWith('.sql'));

    // se não houver arquivos .sql ou houver mais de um, lançar um erro
    if (sqlFiles.length !== 1) {
      throw new Error('Deve existir exatamente 1 arquivo .sql na pasta src/database');
    }

    const sqlFileName = sqlFiles[0]; // pegar o nome do arquivo .sql
    const sqlFilePath = join(sqlDirectory, sqlFileName);
    console.log('Importando arquivo SQL: ', sqlFilePath);

    await this.sqlImportService.importSqlFile(sqlFilePath);
  }
}