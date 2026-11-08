# Backend testing

## 1. Overview

Every backend change is checked by tests and by two code checks before it can be merged. The same checks run on your computer and on every pull request, so a red check on the pull request means the same thing as a red check in your terminal.

## 2. What we run

| Check | Command |
| --- | --- |
| Tests | `uv run pytest` |
| Formatting | `uv run ruff format --check .` |
| Style | `uv run ruff check .` |

The backend has hundreds of tests. A pull request cannot be merged while any check is red.

## 3. Fix formatting

If the format check fails, let ruff fix the files, then commit them:

```bash
uv run ruff format .
```

## 4. Test settings

The tests use their own settings, so they never touch your real database. The payment settings need placeholder values, and the test setup provides them.

!!! warning "Keep test settings out of your terminal"
    If your terminal still has `DATABASE_URL` set to a test database, the server will use it. Open a fresh terminal for normal work.

## 5. What the tests cover

| Area | Examples |
| --- | --- |
| Database models | The tables, the links between them and the rules the database enforces |
| Health | The API and database checks answer correctly |
| Sign-in and sign-up | Wrong password, used email, staff invite code |
| Admin pages | Overview, listings, enquiries, remove a listing |
| Admin metrics | Each view, each filter, bad values |
| Access | A business account is not allowed on staff pages |

## 6. Postman

The Postman collection checks the running server from the outside. Use it after a change to see the real answers.

1. Start the server.
2. Import the collection and the environment.
3. Set the invite code and the base address.
4. Run the collection.

## 7. Before you push

1. Run `uv run ruff format .`
2. Run `uv run ruff check .`
3. Run `uv run pytest`
4. Fix anything red, then push.

When you add a feature, add its tests in the same pull request, and check that the new code is covered by at least one test.