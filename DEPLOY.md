# Deployment Instructions

This guide provides steps to deploy the full-stack Raffine application (React Frontend + Node.js/Express Backend + SQLite).

## Prerequisites
- Node.js (v18+)
- Docker (optional, for containerized deployment)

## Environment Variables
Create a `.env` file in the `server/` directory:

```env
PORT=3000
JWT_SECRET=your_secure_jwt_secret
```

---

## Method 1: Docker (Recommended)

This method packages the entire application into a single container.

1.  **Build the Docker image:**
    ```bash
    docker build -t raffine-app .
    ```

2.  **Run the container:**
    ```bash
    docker run -p 3000:3000 --env-file server/.env raffine-app
    ```

The application will be available at `http://localhost:3000`.

---

## Method 2: Manual Deployment

1.  **Build Frontend:**
    ```bash
    # From root directory
    npm install
    npm run build
    ```
    This generates static files in the `dist/` directory.

2.  **Build & Run Backend:**
    ```bash
    cd server
    npm install
    npm run build

    # Start the server (ensure .env exists)
    node dist/index.js
    ```

The server is configured to serve the frontend build from `../dist`.
Access the app at `http://localhost:3000`.

## Database
The application uses SQLite (`database.sqlite`). This file will be created automatically in the `server/` directory upon first run. For persistent data in Docker, mount a volume:

```bash
docker run -p 3000:3000 -v $(pwd)/server/database.sqlite:/app/server/database.sqlite raffine-app
```
