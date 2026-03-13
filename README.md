# Portfolio

Next.js portfolio with live GitHub-backed stats, activity, repositories, and contribution data.

## Requirements

- Node.js 20+
- npm 11+
- A GitHub personal access token for contribution data

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your local env file:

   ```bash
   cp .env.example .env
   ```

3. Set `GITHUB_TOKEN` in `.env`.

   The token should be able to read your public profile data. If you want contribution data to include private contributions, enable that in GitHub and use a token that can access it.

4. Start the app:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000`.

## GitHub Data Refresh

- The portfolio fetches GitHub data with `cache: 'no-store'`.
- The client refreshes GitHub-backed sections every 60 seconds.
- New commits, stars, forks, followers, repo updates, and public activity appear without a redeploy.

## Build

```bash
npm run build
npm run start
```

## Notes

- SQLite and Prisma are present, but the current portfolio UI does not depend on them.
- If `GITHUB_TOKEN` is missing, contribution-backed sections will show an honest error instead of synthetic data.
