# Team

HUZA is built by Team Athena at AkiraChix.

## Who builds what

| Person | Features |
| --- | --- |
| Angela | Account registration, login and profile. Mobile money payment |
| Glory | Business approval and account status. Search, filters and location. Notifications |
| Faith | Raw material listings. Processed product listings |
| Fatma | Enquiries and acceptance. Exchange tracking |
| Walusungu | User dashboard and activity. Admin functions |

## Repositories

| Repository | What it holds |
| --- | --- |
| `athena-backend` | The API and the database |
| `athena-dashboard` | The admin dashboard |
| `athena-frontend` | The web app (PWA) |
| `athena-mobile` | The mobile app |
| `athena-informational-website` | The public website |

## Team rules

| Rule | Detail |
| --- | --- |
| One branch per feature | Named like `feature/admin-metrics` |
| One pull request per feature | Use the pull request template and open it as a draft |
| Tests with every change | Backend with pytest, web apps with Vitest, mobile with flutter test |
| Check before you push | Format, style, tests and build must pass |
| Plain commit messages | Short and simple, for example "Fix formatting in approvals page" |
| No secrets in git | Keep them in `.env` files and server settings |
| Tell the table owner | Nobody changes a table without telling the person who owns it |
| Reuse, do not copy | Use another owner's model instead of copying it |

The exact checks to run are on [Backend local setup](../backend/local-setup.md) and the [Frontend](../frontend/index.md) page.

## Pull requests

- Fill in the whole template, including the Ready for Review checklist.
- A pull request needs the required number of approvals and green checks before it can be merged.
- Answer every review comment, even with a short reply.
