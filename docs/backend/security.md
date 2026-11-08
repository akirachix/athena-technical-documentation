# Backend security

Who can do what in HUZA, and how the backend keeps data safe.

The full security design is drawn in the SSAD on the [System architecture](../architecture.md) page. This page lists the protections in the backend.

## 1. How a request is checked

Every request to the HUZA API says who is asking. The API reads the sign-in token, finds the user and then checks whether their role may do what they ask.

## 2. Roles

| Role | Can do |
| --- | --- |
| Supplier | Manage their own business, raw material listings, enquiries and payments |
| Processor | Manage their own business, finished product listings, enquiries and payments |
| Buyer | Search finished products, send enquiries and pay |
| Staff | Review businesses, remove listings, manage price guides, see all enquiries and payments, and see metrics |

A person can see and change only their own business. They cannot read another business's private messages.

## 3. Business approval

A business cannot trade until staff approve it.

| Status | What it means |
| --- | --- |
| Pending | Waiting for staff to review |
| Approved | Can list and trade |
| Rejected | Turned down, with a reason |
| Suspended | Stopped for now, with a reason. Staff can restore it |

Every decision is sent to the business as a notification.

## 4. Staff pages

Staff pages are closed to business accounts. A business account that tries to open one is turned away.

| Answer | Meaning |
| --- | --- |
| 401 | Not signed in, or the token expired |
| 403 | Signed in, but the role is not allowed |

## 5. Staff accounts and the invite code

Staff accounts can only be created with an invite code.

| Rule | Why |
| --- | --- |
| The code is set on the server as `ADMIN_INVITE_CODE` | It never appears in the code |
| It must be at least 16 characters | Hard to guess |
| If it is not set, staff sign-up is closed | Nobody can sneak in |
| A wrong code is turned away | Only invited people join |
| Change it if it is shared by mistake | The old one stops working |

The team's plan also includes an extra MFA code for staff sign-in. Today, staff sign in with email and password.

## 6. Accounts and sessions

- People sign in with their email and password. A phone number is only a contact detail.
- Passwords are stored as hashes, never as plain text.
- A new account must confirm its email address.
- After too many wrong passwords, an account is locked. A staff member can unlock it.
- Sessions use a token that expires. When it does, the person is asked to sign in again.

## 7. Secrets

Passwords, tokens, the invite code and the database address live in environment settings and in the untracked `.env` file. They are never committed to git and never pasted in screenshots.

| Setting | What it protects |
| --- | --- |
| `JWT_SECRET` | The sign-in tokens |
| `ADMIN_INVITE_CODE` | Staff sign-up |
| `DATABASE_URL` | The database |

If a secret is shared by mistake, change it. The old one stops working.

## 8. Who may call the API

The backend only accepts requests from the web addresses listed in `CORS_ORIGINS`. If a browser shows a network error, check that the address is in that list.

## 9. Private messages

Businesses message each other inside an enquiry. Contact details are shown only after the seller accepts, and staff cannot read the private messages.

## 10. Payments

Every payment is tied to one enquiry, and an enquiry can have only one successful payment. Money moves through MTN Mobile Money, and HUZA keeps its own record of the reference for every payment. Staff can match payments with MoMo records, refund and send payouts. See [Backend payments](payments.md).

## 11. Backups and recovery

How the hosted database is backed up and restored is still to be confirmed by the team, and will be added here.
