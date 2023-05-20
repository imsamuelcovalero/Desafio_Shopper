import { writeFileSync } from 'fs';
import path = require('path');

export default function writeJSONFile(data: string[], tableStructure: string[]): void {
  const filteredData = data.filter(line => line.startsWith('INSERT INTO'));

  let tableData: any = {};
  let tableNames: string[] = [];

  /* Para cada linha de estrutura, extrair o nome da tabela e as colunas */
  tableStructure.forEach((tableStr: string) => {
    const tableNameMatch = tableStr.match(/(?<=CREATE TABLE ).+?(?=\s)/g);
    if (!tableNameMatch) {
      console.error(`Erro ao extrair o nome da tabela de: ${tableStr}`);
      return; // pula para a próxima iteração do forEach
    }
    const tableName = tableNameMatch[0];

    const columnPartMatch = tableStr.match(/(?<=\().+(?=\))/gs);
    if (!columnPartMatch) {
      console.error(`Erro ao extrair as partes da coluna de: ${tableStr}`);
      return; // pula para a próxima iteração do forEach
    }

    const columnPart = columnPartMatch[0];
    const columnLines = columnPart.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('CONSTRAINT') && !line.includes('AUTO_INCREMENT'));

    const columnNames = columnLines.map(line => line.split(' ')[0]); // A primeira palavra de cada linha deve ser o nome da coluna

    if (tableName) {
      tableData[tableName] = columnNames;
      tableNames.push(tableName);
    }
  });

  /* Para cada linha de dados, extrair o nome da tabela, os valores e criar um objeto com os valores */
  filteredData.forEach((line: string) => {
    const tableNameMatch = line.match(/(?<=INSERT INTO ).+?(?=\s)/g);
    if (!tableNameMatch) {
      console.error(`Erro ao extrair o nome da tabela de: ${line}`);
      return; // pula para a próxima iteração do forEach
    }
    const tableName = tableNameMatch[0];

    const valuesMatch = line.match(/(?<=VALUES \().+?(?=\))/g);
    if (!valuesMatch) {
      console.error(`Erro ao extrair os valores de: ${line}`);
      return; // pula para a próxima iteração do forEach
    }

    const tableValues = valuesMatch[0].split(',').map(value => value.trim().replace(/^'(.*)'$/, '$1'));
    // console.log('tableValues', tableValues);

    const newObj = {} as any;

    const columnNames = tableData[tableName];
    if (columnNames && columnNames.length) {
      columnNames.forEach((column: string | number, index: string | number) => {
        newObj[column] = tableValues[+index];
      });
    }

    if (!tableData[tableName]) {
      tableData[tableName] = [];
    }
    tableData[tableName].push(newObj);
  });

  // Escreve o objeto tableData para um arquivo .json
  const outputPath = path.join(__dirname, '../../database/database.json');
  writeFileSync(outputPath, JSON.stringify(tableData, null, 2));
  console.log('Os dados foram escritos com sucesso no arquivo database.json');
}
