// SqlImportService.ts
import * as mysql from 'mysql2/promise';
import * as dbConfig from '../../database/config/database'
import { readFileSync, writeFileSync } from 'fs';
import path = require('path');


const config = dbConfig as {
  host: string;
  username: string;
  password: string;
  database: string;
  port: number;
};

class SqlImportService {
  // Parece ser melhor prática chama de pool ao invés de connection
  private pool: any;

  constructor() {
    this.pool = mysql.createPool({
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

    /* Remover instruções "CREATE TABLE". Neste caso não queremos criar as tabelas, pois elas já existem. caso queria executar todo o arquivo, basta remover esta linha. E caso o arquivo possua "DROP TABLE IF EXISTS", também é necessário removê-lo ou deixar ambos, para que após dropar as tabelas possa recriá-las. */
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

    // Após a importação do arquivo SQL e execução das consultas, escreva os dados em um arquivo JSON
    this.writeToJSONFile(queries);
  }

  async executeRawQuery(query: string): Promise<void> {
    console.log('Executando query: ', query);
    const connection = await this.pool.getConnection();
    await connection.query(query);
    connection.release();
  }

  writeToJSONFile(data: any): void {
    const outputPath = path.join(__dirname, '../../database/database.json');
    writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log('Os dados foram escritos com sucesso no arquivo database.json');
  }
}

export default SqlImportService;