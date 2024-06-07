#!/bin/bash
set -e

host="$1"
shift
cmd="$@"

until nc -z -v -w30 $host 5432
do
  echo "Waiting for database connection..."
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd
