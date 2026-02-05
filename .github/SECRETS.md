# GitHub Secrets 設定ガイド

GitHub リポジトリの Settings → Secrets and variables → Actions で以下のシークレットを設定してください。

## フロントエンド（Vercel）

| シークレット名 | 説明 | 取得方法 |
|---------------|------|---------|
| `VERCEL_TOKEN` | Vercel API トークン | Vercel Dashboard → Settings → Tokens → Create |
| `VERCEL_PROJECT_ID` | Vercel プロジェクトID | `vercel link` 実行後、`.vercel/project.json` に記載 |

### Vercel セットアップ手順

```bash
cd frontend
npm install -g vercel
vercel login
vercel link
# .vercel/project.json から orgId と projectId を取得
```

## バックエンド（Render）

| シークレット名 | 説明 | 取得方法 |
|---------------|------|---------|
| `RENDER_DEPLOY_HOOK_URL` | Render デプロイフック URL | Render Dashboard → Web Service → Settings → Deploy Hook → Create Deploy Hook |

### Render セットアップ手順

1. Render でアカウント作成
2. New → Web Service でバックエンドをデプロイ
3. Settings → Deploy Hook → Create Deploy Hook
4. 生成されたURLをシークレットに設定

