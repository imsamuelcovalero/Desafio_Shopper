#!/bin/sh
echo "Escolha uma opção:"
echo "1. Popular o banco de dados"
echo "2. Criar o arquivo database.json"
echo "3. Ambos"
read -p "Opção: " option

case $option in
  1) 
    echo "Populando o banco de dados..."
    ts-node ./src/services/DatabaseImportService/start.ts db
    ;;
  2) 
    echo "Criando o arquivo database.json..."
    ts-node ./src/services/DatabaseImportService/start.ts json
    ;;
  3) 
    echo "Populando o banco de dados e criando o arquivo database.json..."
    ts-node ./src/services/DatabaseImportService/start.ts both
    ;;
  *) 
    echo "Opção inválida. Por favor, escolha 1, 2 ou 3."
    ;;
esac