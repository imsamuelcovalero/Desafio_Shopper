#!/bin/sh

# Este trecho é importante para o docker-compose poder executar uma opção padrão
option=$1

if [ -z "$option" ]
then
  echo "Escolha uma opção:"
  echo "1. Popular o banco de dados"
  echo "2. Criar o arquivo database.json"
  echo "3. Ambos"
  echo "4. Cancelar"
  read -p "Opção: " option
fi

# Garante que o banco de dados esteja pronto para receber conexões
# echo "Aguardando o banco de dados ficar pronto..."
# sleep 10  # Espera por 30 segundos
# echo "Iniciando a importação dos dados..."

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
  4) 
    echo "Cancelando..."
    ;;
  *) 
    echo "Opção inválida. Por favor, escolha 1, 2, 3 ou 4."
    ;;
esac