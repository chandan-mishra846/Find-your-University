# Vercel Deployment Guide

## Quick Deploy to Vercel

### Backend Only (Recommended for evaluation)
Deploy the backend API to Vercel:

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy backend:
```bash
cd backend
vercel
```

Follow prompts:
- Set up and deploy? **Y**
- Scope? Select your account
- Link to existing project? **N**
- Project name? `find-university-api` (or your choice)
- Directory? `.` (current)
- Override settings? **N**

Your API will be live at `https://your-project.vercel.app/api/`

### Environment Variables
No environment variables needed for mock mode. For database mode, add in Vercel dashboard:
- `DATABASE_URL=your_postgres_connection_string`

### Frontend Deployment
For separate frontend deployment:

```bash
cd frontend
vercel
```

Update `frontend/src/utils/apiClient.js` to use your deployed API URL:
```javascript
export const API_BASE_URL = 'https://your-backend.vercel.app/api';
```

### Full-stack Monorepo Deploy
The root `vercel.json` is configured for monorepo deployment. Just run from project root:
```bash
vercel
```

## Troubleshooting

### Build Errors
- Ensure `backend/vercel.json` points to `server-mock.js` (no DB needed)
- Check Node version matches (use `"engines"` in `package.json` if needed)
- Verify all dependencies are in `package.json`, not just `devDependencies`

### API 404 Errors
- Confirm routes in `backend/server-mock.js` match API calls
- Check `vercel.json` routing configuration

### CORS Issues
The backend already has CORS enabled via `cors()` middleware.
