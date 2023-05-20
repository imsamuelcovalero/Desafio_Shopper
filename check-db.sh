#!/bin/sh
# check-db.sh

set -e

# Carregando as variáveis de ambiente
source /app-backend/.env

host="$1"
shift
cmd="$@"

until mysql -h"$host" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" -e 'quit'; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "MySQL is up - executing command"
exec $cmd