# Todo App — Backend

A simple RESTful backend for a Todo application built with Node.js, Express and TypeScript. It provides user authentication, task management, and password reset via email.

**Tech Stack:**

- Node.js + TypeScript
- Express
- MongoDB (Mongoose)
- JWT for auth
- Nodemailer for email OTPs

## Features

- User registration, login, logout
- Password reset (OTP)
- Create, read, update, delete tasks
- Protected task routes (JWT authentication)

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or hosted)

## Quick Setup

1. Clone the repo and install dependencies:

```bash
git clone https://github.com/kabir-afk/todo-app-backend.git
cd todo-app-backend
npm install
```

2. Create a `.env` file in the project root with the required environment variables (see below).

3. Run in development mode (fast, uses `tsx` watch):

```bash
npm run dev
```

4. Build and run production:

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env` file containing the following keys (matching `config/env.ts`):

- `JWT_SECRET_KEY` — Secret key for signing JWTs
- `MONGO_URI` — MongoDB connection string
- `PORT` — Port the server listens on (e.g. `5000`)
- `NODE_ENV` — `development` or `production`
- `FRONTEND_URI` — Allowed frontend origin for CORS
- `GMAIL_API_USER` — Gmail address used to send OTP emails
- `GMAIL_API_PASS` — App password / API password for Gmail

Example `.env`:

```
JWT_SECRET_KEY=your_jwt_secret
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/todo-app
PORT=5000
NODE_ENV=development
FRONTEND_URI=http://localhost:3000
GMAIL_API_USER=your.email@gmail.com
GMAIL_API_PASS=your_gmail_app_password
```

## NPM Scripts

- `npm run dev` — Start in dev mode (watch, TypeScript runtime via `tsx`)
- `npm run build` — Compile TypeScript to `dist/` using `tsc`
- `npm start` — Run compiled production build from `dist/`

(These are defined in `package.json`.)

## API Reference

Base URL: `http://localhost:<PORT>/api/v1`

**User Routes** (`/api/v1/users`)

- `GET /all` — Get all users
- `GET /me` — Get profile of authenticated user (requires cookie header / JWT)
- `POST /register` — Register a new user
- `POST /login` — Login and receive auth cookie/token
- `GET /logout` — Logout (clears cookie)
- `POST /forgot-password` — Send password reset OTP to email
- `POST /reset-password` — Reset password using OTP

**Task Routes** (`/api/v1/tasks`) — All task routes are protected (require authentication)

- `POST /new` — Create a new task
- `GET /my` — Get tasks for the authenticated user
- `PATCH /:id` — Edit a task (partial update)
- `DELETE /:id` — Delete a task
- `PATCH /:id/toggle` — Toggle task completion status

## Project Structure

- `src/`
  - `index.ts` — App entrypoint and route registration
  - `controllers/` — Request handlers (`user`, `todo`)
  - `routes/` — Express route definitions
  - `middleware/` — Auth, error handlers
  - `models/` — Mongoose models
  - `utils/` — Helpers (logger, feature utilities)
- `config/env.ts` — Loads environment variables
- `package.json`, `tsconfig.json`

## Error Logging

Errors are logged via a project utility in `src/utils/errorLogger.ts` and persisted (see `src/models/errorLogs.ts`).
