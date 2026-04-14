# Render Backend Deployment

This project's frontend is already live on GitHub Pages.
The backend in `backend/demo` is prepared for Render.

## 1. Create the backend on Render

1. Open `https://dashboard.render.com/blueprints`
2. Click `New Blueprint Instance`
3. Select the GitHub repo `jdsolutions5049-cpu/web`
4. Render will detect [render.yaml](/c:/Users/ASUS/Downloads/JD_Project-main/JD_Project-main/render.yaml)
5. Continue and create the services

Render will create:
- one Java web service: `jd-solutions-backend`
- one Postgres database: `jd-solutions-db`

## 2. Fill required environment values in Render

Set these on the `jd-solutions-backend` web service:
- `SENDGRID_API_KEY`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

Optional:
- `ADMIN_FULL_NAME`

## 3. Wait for deploy

When the Render service finishes, open:
- `https://<your-render-service>.onrender.com/api/health`

It should return `OK`.

## 4. Connect the frontend to the backend

1. Copy the public backend URL from Render
2. In GitHub, open:
   `Settings -> Secrets and variables -> Actions -> Variables`
3. Create a repository variable:
   `REACT_APP_API_BASE_URL`
4. Set its value to your backend URL, for example:
   `https://jd-solutions-backend.onrender.com`

## 5. Redeploy the frontend

After saving the GitHub Actions variable:

1. Open `https://github.com/jdsolutions5049-cpu/web/actions`
2. Re-run the latest Pages workflow

After that, the forms should call the live backend instead of `localhost`.
