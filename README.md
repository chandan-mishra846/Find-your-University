# Find Your University

A full-stack app to find, filter, compare, and apply to universities.

## Structure
- backend: Express API (mock mode by default)
- frontend: React (CRA + CRACO + Tailwind)

## Quick Start (Development)
### Backend (Mock API)
```powershell
cd "c:\Users\mishr\Desktop\assignment 2\backend"
npm install
npm run dev
# Health: http://localhost:5000/api/health
```

### Frontend
```powershell
cd "c:\Users\mishr\Desktop\assignment 2\frontend"
npm install
npm run dev
# App: http://localhost:3000
```

The frontend logs the running URL and API base in the browser console.

## Real Database (Optional)
- Set `.env` in backend with `DATABASE_URL`.
- Start with: `npm run dev:db` (backend).

## Notes
- `backend/.gitignore` and `frontend/.gitignore` already exclude `node_modules` and `.env` files.
- Use the mock server for easy testing; it includes a broad set of universities across multiple countries and degree levels.
