# Backend local setup

How to run the HUZA backend on your computer, create the first staff account and check your work before you push.

## 1. Before you start

| You need | Notes |
| --- | --- |
| Git | And access to the akirachix repositories |
| Python 3.11 | The version the backend uses |
| uv | Installs the packages |
| PostgreSQL | Running on your computer, with an empty database for HUZA |

## 2. Run the backend

1. Clone `athena-backend` and open it.
2. Install the packages:

    ```bash
    uv venv
    uv pip install -r pyproject.toml --group dev
    ```

3. Create a `.env` file in the project root with these settings:

    | Setting | What it is |
    | --- | --- |
    | `DATABASE_URL` | The address of your PostgreSQL database |
    | `JWT_SECRET` | A long random secret of at least 32 characters, for tokens |
    | `ADMIN_INVITE_CODE` | At least 16 characters, for staff sign-up |

    Payment and email settings are only needed to try payments or emails. See [Backend payments](payments.md).

4. Build the tables:

    ```bash
    uv run --no-sync alembic upgrade head
    ```

5. Start the server:

    ```bash
    uv run --no-sync uvicorn main:app --reload
    ```

6. Open `http://127.0.0.1:8000/docs` to try the API.

## 3. Create your first staff account

1. Make sure `ADMIN_INVITE_CODE` is set and the backend is running.
2. Open `http://127.0.0.1:8000/docs` and find the staff sign-up endpoint.
3. Send it your name, email and password with the same invite code.

## 4. Before you push

1. `uv run --no-sync ruff format .`
2. `uv run --no-sync ruff check .`
3. `uv run --no-sync pytest`

All three must pass. See [Backend testing](testing.md) for what the tests cover.

## 5. If something goes wrong

| What you see | Why | Fix |
| --- | --- | --- |
| "no such table" | The terminal still has a test database address set | Open a new terminal, or unset `DATABASE_URL` |
| "column does not exist" | Your database is behind | Run `alembic upgrade head` |
| "Address already in use" | A server is already running on that port | Stop the old one, then start again |
| "Staff sign-up is not open right now" | No invite code is set | Set `ADMIN_INVITE_CODE` and restart the backend |
| The server stops with a message about `JWT_SECRET` | The secret is shorter than 32 characters | Use a longer secret |
| Tests time out while starting | The computer is busy | Close other programs and run with fewer workers |
