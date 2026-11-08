# Frontend

HUZA has three apps and a public website. All of them talk to the same [backend](../backend/index.md).

<div class="grid cards" markdown>

- :material-cellphone: **Mobile app**

    ---

    For suppliers and buyers. List raw materials, search finished products, send enquiries and pay.

    [:octicons-arrow-right-24: Open the mobile app](mobile-app.md)

- :material-monitor-cellphone: **Web app (PWA)**

    ---

    For processors. Search raw materials, list finished products and pay suppliers.

    [:octicons-arrow-right-24: Open the web app](pwa.md)

- :material-view-dashboard-outline: **Admin dashboard**

    ---

    For HUZA staff. Sign in, approve businesses and watch listings, enquiries and metrics.

    [:octicons-arrow-right-24: Open the dashboard](admin-dashboard.md)

- :material-web: **Informational website**

    ---

    The public website that explains what HUZA is.

    [:octicons-arrow-right-24: Open the website page](informational-website.md)

</div>

## Running the apps

| App | Repository | Start it with | Address |
| --- | --- | --- | --- |
| Mobile app | `athena-mobile` | `flutter run` | On the emulator or phone |
| Web app (PWA) | `athena-frontend` | `npm run dev` | http://localhost:3000 |
| Admin dashboard | `athena-dashboard` | `npm run dev` | http://localhost:3001 |
| Informational website | `athena-informational-website` | `npm run dev` | http://localhost:3000, or the next free port |

Run the [backend](../backend/local-setup.md) first. Each app's page has its full setup steps.

## Security in the frontend

- Never put secrets or API keys in an app. Anything in the app can be read by the person using it.
- The sign-in token is handled in one place in each app and nothing else reads or writes it.
- Do not log tokens or personal data.
- Contact details are shown only after an enquiry is accepted. The backend enforces this and the apps must not work around it.
- Keep every hosted app on HTTPS.

The rules the backend enforces are on [Backend security](../backend/security.md).

## Deploying the apps

| App | Output | Notes |
| --- | --- | --- |
| Web app (PWA) | `dist/` static site | Set the API address before building |
| Admin dashboard | `dist/` static site | `VITE_API_URL` is built in, so rebuild after changing it |
| Informational website | Next.js build | Hosted on Vercel at [athena-informational-website.vercel.app](https://athena-informational-website.vercel.app/){ target=_blank } |
| Mobile app | Android and iOS packages | Release builds must point to the hosted API |

Deploy the [backend](../backend/deployment.md) first.

## Before you push

For the web apps:

1. `npm run format:check` (run `npm run format` if it fails)
2. `npm run lint`
3. `npm test -- --run`
4. `npm run build`

For the mobile app:

1. `dart format .`
2. `flutter analyze`
3. `flutter test`
