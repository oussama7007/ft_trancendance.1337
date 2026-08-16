# ft_trancendance.1337
# irent — ft_transcendence Project Plan
 
## 1. What we're building

**irent**: a student rental platform. Students browse rental listings, message owners directly, and cut out brokers. This is our ft_transcendence project — the final Common Core project (5-person team, ~8 weeks).

## 2. Tech stack (final — no debate needed)


| Layer | Tool | Why |
|---|---|---|
| Frontend | **React** | Listed by name in the subject. Biggest community, easiest to find tutorials/help. |
| Backend | **Express** (Node.js) | Listed by name in the subject. Simplest backend framework that exists. |
| Database | **SQLite** | A real relational database, just stored as a single file — no server setup needed. |
| Real-time | **Socket.io** | Built on WebSockets (required by subject for chat/notifications). |
| Containers | **Docker Compose** | Required by subject. One command (`docker compose up`) runs everything. |

Everyone codes in **JavaScript** only. No second language to learn.

## 3. Modules we're implementing (14 points total)

| Module | Points | What it is in irent |
|---|---|---|
| Frontend + backend framework | 2 | Automatic — using React + Express |
| Standard user management | 2 | Signup/login, profile page, avatar upload |
| Public API (listings) | 2 | GET/POST/PUT/DELETE `/api/listings` with API key + rate limiting |
| User interaction | 2 | Chat between students & owners, profile viewing, saved contacts |
| OAuth login | 1 | "Login with Google" |
| File upload | 1 | Upload/preview/delete listing photos |
| Notifications | 1 | "New message" / "New listing" alerts |
| Advanced search | 1 | Filter listings by price, location, etc. |
| GDPR data controls | 1 | Users can export/delete their own data |
| Multiple languages | 1 | French / Arabic / English |

**Total: 14 points.** Do not add extra modules until this list is fully working — no scope creep.

## 4. Team roles & tasks

### Person 1 — Backend & Auth Lead (Tech Lead)
- Set up the repo, Docker Compose file, `.env` / `.env.example`
- Build the Express + SQLite skeleton everyone else plugs into
- Database schema: users, listings, messages, favorites
- Signup/login (hashed + salted passwords)
- Profile CRUD + avatar upload endpoint
- **Learns:** Express basics, SQLite basics, bcrypt for password hashing

### Person 2 — Frontend Lead
- React app structure, routing, shared layout/navbar
- Listings browsing page + listing detail page
- Profile page (UI)
- Advanced search UI (filters for price/location) + connects to backend filter logic
- **Learns:** React basics, React Router, calling APIs from React (fetch/axios)

### Person 3 — Realtime & Chat
- Chat system: send/receive messages between a student and an owner
- Notification system: new message, new listing alerts
- Socket.io server setup + client-side integration
- **Learns:** Socket.io basics (rooms/events)

### Person 4 — Listings & Uploads
- Listings CRUD (create/edit/delete a listing)
- The 5 required public API endpoints, with API key + rate limiting + basic docs
- File upload system for listing photos (type/size validation, preview, delete)
- **Learns:** Express routes, Multer (file uploads)

### Person 5 — PO/PM + Compliance
- Product ownership: keeps scope on track, decides what gets cut if time runs short
- Google OAuth integration
- Multi-language setup (i18n) for French/Arabic/English
- GDPR pages (data export/delete) + Privacy Policy + Terms of Service pages (mandatory — missing these gets the project rejected)
- Runs team meetings, tracks progress, writes the README.md
- Makes sure every teammate can explain every module, not just their own
- **Learns:** OAuth flow basics, i18n library basics

## 5. Timeline (8 weeks)

| Week | Focus |
|---|---|
| 1 | P1 builds the skeleton (React ↔ Express ↔ SQLite, Docker running). Everyone else reads/tests it. |
| 2–3 | P1: login done. P2: listing pages. P4: listing creation + API. P3: chat backend starts. |
| 4–5 | P2: search. P3: notifications finished. P4: photo upload. P5: Google login. |
| 6 | P5: languages + GDPR + Privacy/Terms pages. |
| 7 | Integration week — everyone connects their piece, fix bugs together. |
| 8 | README, bug fixes, practice explaining every module out loud (defense prep). |

## 6. Git rules (subject requires this)

- Every team member must have real commits — no one person pushing everyone else's code.
- Clear commit messages (what changed, not "fix" or "update").
- Use GitHub Issues or a shared board to track who's doing what.

## 7. Non-negotiables (project gets rejected without these)

- `docker compose up` must run the entire app with one command.
- Privacy Policy + Terms of Service pages, real content, linked in the footer.
- Multiple users logged in and interacting at the same time, no bugs from that.
- No errors/warnings in the browser console.
- HTTPS on any connection to the backend from outside.
