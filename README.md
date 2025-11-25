# final_project

## M80 – Generative AI Innovations (Final Project)

Single Page Application (SPA) with React frontend and Node.js/Express backend using MongoDB and JWT authentication.

## Tech Stack
- Frontend: React + react-router + Chart.js (via react-chartjs-2)
- Backend: Node.js (Express), JWT auth
- Database: MongoDB (Mongoose)
- Hosting (recommended): NGINX serves frontend on port 80, backend runs on port 3000 on the same server

## Requirements mapping
- App title: M80
- Subject: Recent innovations in Generative AI (last 6 months)
- Login: Use your first name as both username and password (hardcoded on backend; configurable via env)
- Protected pages: Dashboard, Summary, Reports
- Charts: Data retrieved asynchronously from backend (JWT required)

## Setup
1. Install dependencies
```
npm install
```

2. Configure environment
```
cp .env.example .env
# Edit .env to set FIRST_NAME, JWT_SECRET, and MONGODB_URI
```

3. Start MongoDB locally (if not already running). On Windows you can use MongoDB Community Server or Docker.

4. Run the backend (port 3000)
```
npm run server
```

5. In another terminal, run the frontend (CRA will prompt to use a different port if 3000 is taken):
```
npm start
```

Login with the configured FIRST_NAME (default: Maria) for both username and password. You’ll be redirected to the Dashboard and can navigate to Summary and Reports (both include charts fetched from the backend with JWT).

## Production build and NGINX
Build the frontend and serve it with NGINX on port 80. Keep the backend running on port 3000.

```
npm run build
# Copy the build/ directory to /var/www/m80 (example)
```

Sample NGINX server block (adjust paths and domain):

```
server {
	listen 80;
	server_name your-domain.com;

	root /var/www/m80;
	index index.html;

	# Serve the SPA
	location / {
		try_files $uri /index.html;
	}

	# Proxy API to backend on port 3000
	location /api/ {
		proxy_pass http://127.0.0.1:3000;
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
	}
}
```

Ensure the backend process stays running using a process manager (pm2/systemd) and MongoDB is accessible.

## Security notes
- Do not commit secrets. `.env` is ignored by git.
- JWT secret must be strong in production.
- CORS is open by default in development; restrict origins in production.

## Accessibility
- Semantic headings and regions
- ARIA labels on navigation
- Keyboard-focusable controls and color contrast-aware chart palettes

## Testing
```
npm test
```

## License
For coursework use.
