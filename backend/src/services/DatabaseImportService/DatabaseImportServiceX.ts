// DatabaseImportService.ts
import * as mysql from 'mysql2/promise';
import * as dbConfig from '../../database/config/database'
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const config = dbConfig as {
  host: string;
  username: string;
  password: string;
  database: string;
  port: number;
};

export class DatabaseImportService {
  private connection: any;

  constructor() {
    this.connection = mysql.createConnection({
      host: config.host,
      port: config.port || 3306,
      user: config.username,
      password: config.password,
      database: config.database,
      multipleStatements: true,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  async importDataFromSqlFile(): Promise<void> {
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

    await this.importSqlFile(sqlFilePath);
  }

  private async importSqlFile(filePath: string): Promise<void> {
    let sqlContent = readFileSync(filePath).toString();

    // Remover instruções CREATE TABLE
    sqlContent = sqlContent.replace(/CREATE TABLE .*?;/gs, '');

    // Substituir caracteres especiais
    sqlContent = sqlContent.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    // Dividir o conteúdo em várias queries
    const queries = sqlContent.split(';').map(query => query.trim()).filter(query => query);
    console.log('queries', queries);

    // Executar cada query
    for (const query of queries) {
      await this.executeRawQuery(query);
    }
  }

  private async executeRawQuery(query: string): Promise<void> {
    console.log('Executando query: ', query);
    await this.connection.query(query);
  }
}