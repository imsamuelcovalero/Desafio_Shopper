#!/bin/sh
# check-db.sh

set -e

# Carregando as variáveis de ambiente
source /app-backend/.env

# no contexto de rodar a aplicação pelo docker-compose, essa foi a solução que encontrei para usar o host do serviço de banco de dados do compose.
# export MYSQL_HOST=db

host="$1"
shift
cmd="$@"

until mysql -h"$host" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" -e 'quit'; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "MySQL is up - executing command"
exec $cmd