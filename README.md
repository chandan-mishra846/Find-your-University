# Find Your University

A small full‑stack project to browse, filter, compare and apply to university programs. The backend exposes simple REST endpoints (mock data by default). The frontend is a React app with Tailwind styling.

## Features
- Filter by country, degree level, tuition budget
- Quick eligibility indicator from GPA and IELTS
- Compare multiple programs side by side
- Submit an application (validated on backend)

## Tech Stack
- Frontend: React (CRA), CRACO, Tailwind
- Backend: Node.js, Express, Nodemon, dotenv
- Database (optional): PostgreSQL via `pg`

## Project Structure
```
backend/
	controllers/       # Route handlers
	models/            # DB access (used in DB mode)
	routes/            # Express routers
	utils/             # Validation & error helpers
	server-mock.js     # Mock API (default dev)
	server.js          # Real API (requires DB)
frontend/
	public/
	src/
		components/
		utils/
```

## Running the Project (Development)
Backend (Mock API recommended for evaluation):
```powershell
cd "c:\Users\mishr\Desktop\assignment 2\backend"
npm install
npm run dev
# Health check:
# http://localhost:5000/api/health
```

Frontend:
```powershell
cd "c:\Users\mishr\Desktop\assignment 2\frontend"
npm install
npm run dev
# App URL:
# http://localhost:3000
```

On startup, the frontend console prints both the app URL and the API base.

## Environment (Backend)
Mock mode does not need a database. For database mode:
1. Create `backend/.env` with:
```
DATABASE_URL=postgres://user:password@host:5432/dbname
PORT=5000
```
2. Start the real API:
```powershell
cd "c:\Users\mishr\Desktop\assignment 2\backend"
npm run dev:db
```

## API Reference (Mock)
Base URL: `http://localhost:5000/api`

- GET `/health`
	- Simple status probe.

- GET `/countries`
	- Returns an array of supported country names.

- GET `/universities`
	- Query params (optional):
		- `country` (string | `'all'`)
		- `degree_level` (`"Bachelor's" | "Master's" | "PhD" | 'all'`)
		- `min_tuition` (number)
		- `max_tuition` (number)
		- `gpa` (number, for eligibility badge)
		- `ielts` (number, for eligibility badge)
	- Returns a list of programs with `eligible` computed from `gpa` and `ielts` if provided.

- POST `/applications`
	- Body fields (required): `university_id`, `program_id`, `first_name`, `last_name`, `email`, `gpa`, `ielts_score`
	- Optional: `phone`, `date_of_birth`, `nationality`
	- Validates input and minimum requirements; returns success or validation error.

## Common Scripts
Backend:
- `npm run dev` → mock API with nodemon
- `npm run dev:db` → real API (requires `.env`)

Frontend:
- `npm run dev` → start React dev server
- `npm run build` → production build

## Troubleshooting
- If `EADDRINUSE: 5000`, stop running Node processes and re‑start:
```powershell
Stop-Process -Name node -ErrorAction SilentlyContinue
```
- If frontend cannot reach the API, ensure the backend is running at `http://localhost:5000`.

## Notes
- Mock dataset includes multiple countries and degree levels (Bachelor’s, Master’s, PhD) for broader coverage.
- `.gitignore` files already exclude `node_modules` and `.env`.
