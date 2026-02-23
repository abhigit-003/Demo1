# Deploying Raffine on Render

This guide outlines the steps to deploy the Raffine full-stack application (React + Node.js + PostgreSQL) on [Render](https://render.com).

## Prerequisites

1.  A [Render](https://render.com) account.
2.  The project code pushed to a GitHub/GitLab repository.

---

## Step 1: Create a PostgreSQL Database

1.  In the Render Dashboard, click **New +** and select **PostgreSQL**.
2.  Name the database (e.g., `raffine-db`).
3.  Select the region and plan (Free tier works for testing).
4.  Click **Create Database**.
5.  Wait for it to become available.
6.  Copy the **Internal Database URL** (for internal communication) or **External Database URL** (for local testing).

---

## Step 2: Deploy the Web Service

You can deploy using **Docker** (Recommended) or **Native Node**.

### Option A: Docker (Recommended)

This method ensures the environment matches exactly what was tested and built.

1.  In Render Dashboard, click **New +** and select **Web Service**.
2.  Connect your repository.
3.  Select **Docker** as the Runtime.
4.  **Environment Variables**:
    *   `DATABASE_URL`: Paste the **Internal Database URL** from Step 1.
    *   `JWT_SECRET`: A secure random string (e.g., `supersecretkey123`).
    *   `NODE_ENV`: `production`
5.  Click **Create Web Service**.

Render will automatically build the Docker image (which builds both frontend and backend) and start the server.

### Option B: Native Node Environment

If you prefer not to use Docker:

1.  In Render Dashboard, click **New +** and select **Web Service**.
2.  Connect your repository.
3.  Select **Node** as the Runtime.
4.  **Build Command**:
    ```bash
    npm install && npm run build && cd server && npm install && npm run build
    ```
5.  **Start Command**:
    ```bash
    cd server && node dist/index.js
    ```
6.  **Environment Variables**:
    *   `DATABASE_URL`: Paste the **Internal Database URL** from Step 1.
    *   `JWT_SECRET`: A secure random string.
    *   `NODE_ENV`: `production`
7.  Click **Create Web Service**.

---

## Step 3: Verify Deployment

1.  Once deployment is live, visit the provided Render URL.
2.  The backend will automatically:
    *   Connect to the PostgreSQL database.
    *   Create tables (migrations).
    *   Seed initial data (Services, Products, Demo Users) if the database is empty.
3.  Log in with the demo credentials:
    *   **User**: `user@raffine.com` / `password123`
    *   **Provider**: `provider@raffine.com` / `password123`

---

## Running Tests

To run tests, you need a PostgreSQL database.

### Local Testing
1.  Ensure you have a local PostgreSQL instance running.
2.  Create a `.env` file in `server/`:
    ```env
    DATABASE_URL=postgres://user:pass@localhost:5432/raffine
    ```
3.  Run tests:
    ```bash
    cd server
    npm test
    ```
    This command will automatically attempt to create a `raffine_test` database and run the test suite.

### CI/CD Testing
If setting up CI (e.g., GitHub Actions), ensure a PostgreSQL service container is available and `DATABASE_URL` is set.
