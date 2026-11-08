# Backend local setup

How to run the HUZA backend on your computer, create the first staff account and check your work before you push.

## 1. Before you start

| You need | Notes |
| --- | --- |
| Git | And access to the akirachix repositories |
| Python and uv | To run the backend |
| PostgreSQL | Running on your computer |

## 2. Run the backend

1. Clone `athena-backend` and open it.
2. Install the packages:

    ```bash
    uv sync
    ```

3. Create a `.env` file in the project root with these settings:

    | Setting | What it is |
    | --- | --- |
    | `DATABASE_URL` | The address of your PostgreSQL database |
    | `JWT_SECRET` | A long random secret for tokens |
    | `ADMIN_INVITE_CODE` | At least 16 characters, for staff sign-up |
    | `CORS_ORIGINS` | The web addresses that may call the API, for example `http://localhost:3001` |

4. Build the tables:

    ```bash
    alembic upgrade head
    ```

5. Start the server:

    ```bash
    uvicorn main:app --reload
    ```

6. Open `http://127.0.0.1:8000/docs` to try the API.

## 3. Create your first staff account

1. Make sure `ADMIN_INVITE_CODE` is set and the backend is running.
2. Open `http://127.0.0.1:8000/docs` and find the staff sign-up endpoint.
3. Send it your name, email and password with the same invite code.

## 4. Before you push

1. `uv run ruff format .`
2. `uv run ruff check .`
3. `uv run pytest`

All three must pass. See [Backend testing](testing.md) for what the tests cover.

## 5. If something goes wrong

| What you see | Why | Fix |
| --- | --- | --- |
| "no such table" | The terminal still has a test database address set | Open a new terminal, or unset `DATABASE_URL` |
| "column does not exist" | Your database is behind | Run `alembic upgrade head` |
| "Address already in use" | A server is already running on that port | Stop the old one, then start again |
| "Staff sign-up is not open right now" | No invite code is set, or the backend has no staff sign-up | Set `ADMIN_INVITE_CODE`, or use a backend that includes it |
| A browser shows a CORS error | The caller's address is not allowed | Add it to `CORS_ORIGINS` and restart the backend |
| Tests time out while starting | The computer is busy | Close other programs and run with fewer workers |
