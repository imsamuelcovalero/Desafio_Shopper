const Importer = require('mysql-import');
import { resolve } from 'path';
import * as dbConfig from '../database/config/database';
import * as mysql from 'mysql2/promise';

const config = dbConfig as {
  host: string;
  username: string;
  password: string;
  database: string;
  port: number;
};

class SqlImportService {
  private importer: any;
  private connection: any;

  constructor() {
    this.importer = new Importer({
      host: config.host,
      user: config.username,
      password: config.password,
      database: config.database,
      port: config.port || 3306, // inclua a porta aqui
      onerror: (err: Error) => console.log(err.message)
    });

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
    console.log('Importando SQLFile');
    const path = resolve(__dirname, filePath);
    await this.importer.import(path);
    this.importer.disconnect();
  }

  async executeRawQuery(query: string): Promise<void> {
    console.log('Arquivo connection.js carregado!');
    await this.connection.query(query);
  }
}

export default SqlImportService;