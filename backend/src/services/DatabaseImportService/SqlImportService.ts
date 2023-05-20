// SqlImportService.ts
import * as mysql from 'mysql2/promise';
import * as dbConfig from '../../database/config/database'
import { readFileSync, writeFileSync } from 'fs';
// import path = require('path');
import writeJSONFile from './WriteJSONFileService';


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

    /* Para uso posterior na função de criação do arquivo json, é preciso jogar numa variável a estrutura das tabelas, que está associado ao comando CREATE TABLE. */
    const tableStructure = sqlContent.match(/CREATE TABLE .*?\n\)/gs);
    console.log('tableStructureOnSqlImport', tableStructure);

    /* Remover instruções "CREATE TABLE". Neste caso não queremos criar as tabelas, pois elas já existem. caso queria executar todo o arquivo, basta remover esta linha. E caso o arquivo possua "DROP TABLE IF EXISTS", também é necessário removê-lo ou deixar ambos, para que após dropar as tabelas possa recriá-las. */
    sqlContent = sqlContent.replace(/CREATE TABLE .*?;/gs, '');

    // Substituir caracteres especiais
    sqlContent = sqlContent.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    // Dividir o conteúdo em várias queries
    const queries = sqlContent.split(';').map(query => query.trim()).filter(query => query);
    // console.log('queries', queries);


    // Executar cada query
    // for (const query of queries) {
    //   await this.executeRawQuery(query);
    // }

    // Chama a função auxiliar para criar o arquivo json
    if (tableStructure !== null) {
      writeJSONFile(queries, tableStructure);
    } else {
      console.log('Nenhuma estrutura de tabela encontrada');
    }
  }

  async executeRawQuery(query: string): Promise<void> {
    console.log('Executando query: ', query);
    const connection = await this.pool.getConnection();
    await connection.query(query);
    connection.release();
  }
}

export default SqlImportService;