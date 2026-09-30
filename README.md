# Mini Social Media Platform — Task 2

A complete full-stack mini social network built with **Node.js + Express + SQLite + JWT + bcrypt + Vanilla JavaScript + Tailwind CSS**.

## Features
- Register / login / logout with JWT and bcrypt password hashing
- Editable profiles, bio, username, name and avatar
- Create, edit and delete text/image posts
- Chronological feed with followed-user prioritization
- Likes/unlikes with counters
- Follow/unfollow with follower/following counts
- Comments: create, edit and delete
- User search
- Responsive desktop/mobile UI
- SQLite foreign keys, unique constraints and indexes
- Image uploads limited to 5MB and common image formats
- Helmet, CORS, input validation, centralized error handling
- Seed data: 3 users, 10 posts, comments, likes and follows

## Requirements
Node.js 20+ is recommended. The app uses `better-sqlite3`; use a current LTS Node version for the smoothest native-module experience.

## Run locally
```bash
cd backend
npm install
copy .env.example .env
# Edit .env and set a strong JWT_SECRET
npm run seed
npm start
```
Open **http://localhost:5000**.

For development:
```bash
npm run dev
```

## Demo accounts
All seeded accounts use:
- Password: `Password123!`
- `alice@example.com`
- `bob@example.com`
- `charlie@example.com`

Change these credentials before any real deployment.

## Project structure
```text
mini-social-platform/
├── backend/
│   ├── src/
│   │   ├── auth.js
│   │   ├── db.js
│   │   ├── seed.js
│   │   ├── server.js
│   │   └── validation.js
│   ├── uploads/
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── index.html
│   ├── app.js
│   └── styles.css
└── README.md
```

## API overview
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `GET /api/posts`
- `POST /api/posts`
- `PUT /api/posts/:id`
- `DELETE /api/posts/:id`
- `GET /api/posts/:id/comments`
- `POST /api/posts/:id/comments`
- `PUT /api/comments/:id`
- `DELETE /api/comments/:id`
- `POST /api/posts/:id/like`
- `POST /api/users/:id/follow`
- `GET /api/users?q=`
- `GET /api/users/:username`
- `PUT /api/profile`

## Production notes
This project is intentionally API-key-free and uses only local SQLite data and local uploads. For a real public deployment, use HTTPS, a strong secret from the host's secret manager, rate limiting, CSRF protection if switching to cookies, object storage for images, backups, a production database, and a stricter CORS allowlist. The frontend currently loads Tailwind CSS and Font Awesome from public CDNs; for a fully self-contained deployment, install/build those assets locally.
