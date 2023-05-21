import { Parser } from 'node-sql-parser';
import { writeFileSync } from 'fs';
import path = require('path');

const parser = new Parser();

interface IRegistro {
  [key: string]: string | number;
}

interface ITabela {
  [key: string]: IRegistro[];
}

// Interface para o comando insert
interface IInsert {
  type: string;
  table: string;
  columns: string[];
  values: (string | number)[][];
}

export default function sqlParaJSON(conteudoSQL: string): void {
  // Analisa o conteúdo do SQL
  const parsed = parser.astify(conteudoSQL);
  // console.log('parsed', parsed);

  if (!Array.isArray(parsed)) {
    throw new Error("O conteúdo do SQL não pode ser analisado corretamente.");
  }

  // Itera sobre as instruções INSERT
  const inserts = parsed.filter(({ type }) => type === 'insert') as unknown as IInsert[];
  console.log('inserts', inserts);

  const tabelas: ITabela = {};
  for (const insert of inserts) {
    const tableObj = insert.table[0];
    const tableKey = (tableObj?.db ? tableObj.db + "." : "") + tableObj?.table;
    if (tableKey === undefined) {
      continue;
    }

    if (!(tableKey in tabelas)) {
      tabelas[tableKey] = [];
    }

    const columns = insert.columns;
    for (const values of insert.values) {
      const registro: { [key: string]: any } = {};
      const row = values.value;

      for (let i = 0; i < columns.length; i++) {
        registro[columns[i]] = row[i]?.value;
      }

      tabelas[tableKey].push(registro);
    }
  }

  // Escreve o objeto tableData para um arquivo .json
  const outputPath = path.join(__dirname, '../../database/database.json');
  writeFileSync(outputPath, JSON.stringify(tabelas, null, 2));
  console.log('Os dados foram escritos com sucesso no arquivo database.json');
};
