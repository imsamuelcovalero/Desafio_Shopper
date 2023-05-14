import SqlImportService from './SqlImportService';
import { readFileSync } from 'fs';
import { join } from 'path';

export class DatabaseImportService {
  private sqlImportService: SqlImportService;

  constructor() {
    this.sqlImportService = new SqlImportService();
  }

  async importDataFromSqlFile() {
    const sqlFilePath = join(__dirname, '../database.sql');
    let sqlContent = readFileSync(sqlFilePath).toString();

    // Remover instruções CREATE TABLE
    sqlContent = sqlContent.replace(/CREATE TABLE .*?;/gs, '');

    // Substituir caracteres especiais
    sqlContent = sqlContent.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    // Dividir o conteúdo em várias queries
    const queries = sqlContent.split(';').map(query => query.trim()).filter(query => query);

    // Executar cada query
    for (const query of queries) {
      await this.sqlImportService.executeRawQuery(query);
    }
  }
}