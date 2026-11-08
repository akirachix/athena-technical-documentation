# API reference

## 1. Overview

The live reference is the Swagger page of the running API. It is always up to date and you can try every endpoint from it.

- Hosted: [huza-2fb08e00b606.herokuapp.com/docs](https://huza-2fb08e00b606.herokuapp.com/docs)
- Local: `http://127.0.0.1:8000/docs`

This page is a map of what exists, so you know where to look.

## 2. Signing in on the Swagger page

Most endpoints need a token.

1. Open the `POST /auth/login` endpoint and press **Try it out**.
2. Enter an email and password that exist on that server, then execute.
3. Copy the `access_token` from the answer.
4. Press **Authorize** at the top of the page, paste the token and confirm.

If login answers `401`, that account does not exist on that server. The hosted and local databases are separate, so an account made locally does not exist on the hosted API.

## 3. Common answers

| Code | Meaning |
| --- | --- |
| 200, 201 | It worked |
| 401 | Not signed in, or the token expired |
| 403 | Signed in, but not allowed to do this |
| 404 | Not found |
| 409 | Clashes with something that exists, such as a used email |
| 422 | The request was not in the right shape |

## 4. Endpoints

### Auth

| Method | Path | What it does |
| --- | --- | --- |
| POST | `/auth/register` | Create a business account |
| POST | `/auth/register-admin` | Create a staff account with an invite code |
| POST | `/auth/login` | Sign in and get a token |
| GET | `/auth/me` | Who am I |
| POST | `/auth/logout` | Sign out |
| POST | `/auth/change-password` | Change my password |
| POST | `/auth/forgot-password` | Ask for a reset link |
| POST | `/auth/reset-password` | Set a new password |
| POST | `/auth/verify-email` | Confirm an email address |
| POST | `/auth/resend-verification` | Send the confirmation again |

### Listings

| Method | Path | What it does |
| --- | --- | --- |
| POST | `/listing/` | Create a listing |
| GET | `/listing/` | Browse published listings |
| GET | `/listing/mine` | My own listings |
| GET | `/listing/{listing_id}` | One listing |
| PATCH | `/listing/{listing_id}` | Edit a listing |
| DELETE | `/listing/{listing_id}` | Close a listing |
| GET | `/listing/{listing_id}/photos/{position}` | One photo |

### Enquiries and payments

| Method | Path | What it does |
| --- | --- | --- |
| POST | `/enquiries` | Send an enquiry |
| GET | `/enquiries` | My enquiries |
| GET | `/enquiries/{enquiry_id}` | One enquiry |
| POST | `/enquiries/{enquiry_id}/accept` | Supplier accepts |
| POST | `/enquiries/{enquiry_id}/close` | Close with a reason |
| POST | `/enquiries/{enquiry_id}/payments` | Buyer pays |
| GET | `/enquiries/{enquiry_id}/payments` | Payments on an enquiry |
| POST | `/enquiries/{enquiry_id}/confirm-receipt` | Buyer confirms receipt |
| GET | `/payments` | My payments |
| GET | `/payments/{payment_id}` | One payment |
| GET | `/payments/payout-details` | My payout details |
| PUT | `/payments/payout-details` | Set my payout details |

### Businesses, price guides and notifications

| Method | Path | What it does |
| --- | --- | --- |
| GET | `/business/me` | My business |
| PATCH | `/business/me` | Edit my business |
| GET | `/businesses/places` | Search places |
| GET | `/businesses/{business_id}` | A business's public details |
| GET | `/price-guides` | List price guides |
| GET | `/price-guides/lookup` | Find the guide for a material |
| GET | `/price-guides/{guide_id}` | One price guide |
| POST, PATCH, DELETE | `/price-guides` | Staff manage guides |
| GET | `/notifications` | My notifications |
| GET | `/notifications/{notification_id}` | One notification |
| GET | `/notifications/unread-count` | How many are unread |
| POST | `/notifications/read-all` | Mark all as read |
| PATCH | `/notifications/{notification_id}/read` | Mark one as read |
| DELETE | `/notifications/{notification_id}` | Delete one |

### Staff only: admin

| Method | Path | What it does |
| --- | --- | --- |
| GET | `/admin/businesses` | Businesses by approval status |
| GET | `/admin/businesses/{business_id}` | One business for review |
| POST | `/admin/businesses/{business_id}/approve` | Approve |
| POST | `/admin/businesses/{business_id}/reject` | Reject with a reason |
| POST | `/admin/businesses/{business_id}/suspend` | Suspend |
| POST | `/admin/businesses/{business_id}/restore` | Restore |
| GET | `/admin/users` | List users |
| POST | `/admin/users/{user_id}/unlock` | Unlock a locked account |
| GET | `/admin/payments` | List payments |
| POST | `/admin/payments/{payment_id}/reconcile` | Match a payment with M-Pesa |
| POST | `/admin/payments/sweep` | Match every pending payment with M-Pesa |
| GET | `/admin/payments/{payment_id}/events` | Steps a payment went through |
| POST | `/admin/payments/{payment_id}/refund` | Refund |
| POST | `/admin/payments/{payment_id}/payout` | Send the payout |
| GET | `/admin/overview` | Counts for the overview page |
| GET | `/admin/listings` | Listings for moderation |
| POST | `/admin/listings/{listing_id}/remove` | Remove a listing |
| GET | `/admin/enquiries` | All enquiries |

The overview, listings, remove and enquiries endpoints belong to the admin metrics feature, together with the metrics endpoints described on the [Admin metrics](admin-metrics.md) page.

### Health

| Method | Path | What it does |
| --- | --- | --- |
| GET | `/health` | Is the API up |
| GET | `/health/db` | Is the database reachable |

## 5. Where to go next

- [Data model](data-model.md) for the tables behind these endpoints.
- [Admin metrics](admin-metrics.md) for the numbers staff see.