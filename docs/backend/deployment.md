# Backend deployment

The HUZA backend runs on Heroku and deploys from the main branch. This page lists the settings it needs, the steps to go live and what to check when something breaks.

## 1. Where it runs

| Part | Where | How it updates |
| --- | --- | --- |
| API | Heroku | Deploys from the `main` branch |
| Database | Heroku PostgreSQL | Changed only through migrations |

The hosted API is at [huza-2fb08e00b606.herokuapp.com](https://huza-2fb08e00b606.herokuapp.com/docs).

## 2. How a deploy happens

| Step | What happens |
| --- | --- |
| Pull request | Checks the pull request details, then runs lint, format and the tests |
| Merge into `main` | The CI workflow runs the tests again |
| Deploy | The deploy workflow sends the code to Heroku and checks that the API answers |

The deploy workflow needs these GitHub settings:

| Name | Kind |
| --- | --- |
| `HEROKU_API_KEY` | Secret |
| `HEROKU_EMAIL` | Secret |
| `HEROKU_APP_NAME` | Variable |
| `HEROKU_APP_URL` | Variable |

Heroku starts the API with the command in the `Procfile`: `uvicorn main:app --host 0.0.0.0 --port $PORT`.

## 3. Settings on Heroku

| Setting | Notes |
| --- | --- |
| `DATABASE_URL` | Set by the Heroku database |
| `JWT_SECRET` | A long random secret of at least 32 characters |
| `ADMIN_INVITE_CODE` | At least 16 characters. Use a new code, never the one from your computer |
| `ENVIRONMENT` | Set to `production` |
| `BREVO_API_KEY` and `EMAIL_FROM` | Send the verification and reset emails |
| `MPESA_` settings | The payment values. See [Backend payments](payments.md) |

## 4. Migrations

Run the migrations after every deploy that changes tables, so the tables match the code:

```bash
heroku run alembic upgrade head --app <app-name>
```

## 5. Going live checklist

1. The pull request is merged into `develop`, then into `main`.
2. The deploy workflow has finished.
3. Migrations have run.
4. `ADMIN_INVITE_CODE` and `ENVIRONMENT` are set.
5. `/health` and `/health/db` both answer.
6. The `/docs` page lists staff sign-up, the admin pages and the metrics endpoints.

## 6. If something breaks after a deploy

| Problem | First check |
| --- | --- |
| Admin pages show errors | Is the backend on the latest `main`? Did migrations run? |
| Sign-up says it is not open | Is `ADMIN_INVITE_CODE` set? |
| Verification emails do not arrive | Is `BREVO_API_KEY` set? |
| `/health/db` fails | Is `DATABASE_URL` set and is the database running? |
