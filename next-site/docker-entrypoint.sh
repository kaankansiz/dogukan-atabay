#!/bin/sh
set -e

# Veritabanı dizini (volume mount edilecek)
export DATABASE_URL="${DATABASE_URL:-file:./data/dev.db}"
mkdir -p /app/data

# Prisma şemasını SQLite'a uygula (migrations yoksa db push)
npx prisma db push --accept-data-loss 2>/dev/null || true

exec "$@"
