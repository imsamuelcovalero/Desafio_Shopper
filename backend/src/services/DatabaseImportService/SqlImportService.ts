// SqlImportService.ts
import * as mysql from 'mysql2/promise';
import * as dbConfig from '../../database/config/database'
import { readFileSync } from 'fs';

const config = dbConfig as {
  host: string;
  username: string;
  password: string;
  database: string;
  port: number;
};

class SqlImportService {
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

  async importSqlFile(filePath: string): Promise<void> {
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

  async executeRawQuery(query: string): Promise<void> {
    console.log('Executando query: ', query);
    await this.connection.query(query);
  }
}

export default SqlImportService;