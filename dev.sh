#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

cleanup() {
  echo ""
  echo "サーバーを停止します..."
  kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
  docker compose stop
  echo "停止しました"
}
trap cleanup EXIT

# DB 起動
echo "==> PostgreSQL を起動中..."
docker compose up -d

echo "==> PostgreSQL の準備完了を待機中..."
until docker compose exec db pg_isready -U postgres > /dev/null 2>&1; do
  sleep 1
done
echo "==> PostgreSQL 起動完了"

# バックエンド起動
echo "==> バックエンドを起動中..."
cd backend
source venv/bin/activate
python3 manage.py runserver &
BACKEND_PID=$!
cd ..

# フロントエンド起動
echo "==> フロントエンドを起動中..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "========================================="
echo "  Backend:  http://localhost:8000"
echo "  Frontend: http://localhost:3000"
echo "  Ctrl+C で全て停止"
echo "========================================="

wait

