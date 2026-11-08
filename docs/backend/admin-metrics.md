# Admin metrics

## 1. Overview

Admin metrics help HUZA staff see how the marketplace is doing while the pilot runs. They are for staff only. A business account cannot open them and the API answers 403 if it tries.

The numbers appear on the admin dashboard. The backend provides them through the endpoints below.

## 2. The three views

| View | The question it answers |
| --- | --- |
| Exchange outcomes | How do enquiries end and how much money moves? |
| Marketplace health | Is the marketplace active and are suppliers answering? |
| Pilot learning | What is the pilot teaching us, such as why exchanges fail? |

## 3. Endpoints

| Method | Path |
| --- | --- |
| GET | `/admin/metrics/exchange-outcomes` |
| GET | `/admin/metrics/marketplace-health` |
| GET | `/admin/metrics/pilot-learning` |

All three take the same two filters.

| Filter | Meaning | Allowed values |
| --- | --- | --- |
| `days` | How far back to look | A whole number of days, such as 7 or 30 |
| `stream` | Only one material stream | `SAWDUST`, `PLASTIC`, `GARMENT_OFFCUTS`, `GLASS` |

Leave `stream` out to include every stream. A bad `days` or `stream` value gives a 422 answer.

On the dashboard, these two filters are the date range and the stream picker above the charts.

!!! tip "See the exact fields"
    Open `/docs` on the running API and try each endpoint. The answer shows every field.

## 4. Other staff pages

| Endpoint | Used for |
| --- | --- |
| `/admin/overview` | The counts on the dashboard home page |
| `/admin/listings` | The listings page, with a remove action |
| `/admin/enquiries` | The enquiries page |

## 5. Staff sign-up

Staff accounts are created with an invite code, so only people HUZA trusts can join. The code is set on the server as `ADMIN_INVITE_CODE` and must be at least 16 characters long.

See [Admin dashboard](../frontend/admin-dashboard.md) and [Backend security](../backend/security.md).
