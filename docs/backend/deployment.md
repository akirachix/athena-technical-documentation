# Backend deployment

The HUZA backend runs on Heroku and deploys from the main branch. This page lists the settings it needs, the steps to go live and what to check when something breaks.

## 1. Where it runs

| Part | Where | How it updates |
| --- | --- | --- |
| API | Heroku | Deploys from the `main` branch |
| Database | Heroku PostgreSQL | Changed only through migrations |

The hosted API is at [huza-2fb08e00b606.herokuapp.com](https://huza-2fb08e00b606.herokuapp.com/docs).

## 2. Settings on Heroku

| Setting | Notes |
| --- | --- |
| `DATABASE_URL` | Set by the Heroku database |
| `JWT_SECRET` | A long random secret |
| `ADMIN_INVITE_CODE` | At least 16 characters. Use a new code, never the one from your computer |
| `CORS_ORIGINS` | The web addresses that are allowed to call the API |
| Payment settings | The MTN MoMo values |

After every deploy, make sure the migrations ran. The tables must match the code.

## 3. Going live checklist

1. The pull request is merged into `develop`, then into `main`.
2. Heroku has finished the deploy.
3. Migrations have run.
4. `ADMIN_INVITE_CODE` and `CORS_ORIGINS` are set.
5. `/health` and `/health/db` both answer.
6. The `/docs` page lists staff sign-up, the admin pages and the metrics endpoints.

## 4. If something breaks after a deploy

| Problem | First check |
| --- | --- |
| Admin pages show errors | Is the backend on the latest `main`? Did migrations run? |
| Sign-up says it is not open | Is `ADMIN_INVITE_CODE` set? |
| A browser shows a network error | Is the caller's address in `CORS_ORIGINS`? |
| `/health/db` fails | Is `DATABASE_URL` set, and is the database running? |
