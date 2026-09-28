# Security deployment notes

The application requires a unique `SESSION_SECRET` of at least 32 characters and refuses to start in production when `ADMIN_PASSWORD` is shorter than 14 characters. Keep both values in the hosting provider's secret environment settings; never commit `.env`.

For production:

- Set `NODE_ENV=production` and serve the site over HTTPS. Behind a single trusted reverse proxy, the app assumes one proxy hop; set `TRUST_PROXY_HOPS` if the deployment has a different topology.
- Set `ADMIN_USERNAME` and a unique, high-entropy `ADMIN_PASSWORD` in the hosting provider. The local `.env` credentials are for local development only.
- Restrict the MongoDB user to the application database and limit Atlas network access to the application host. Keep database backups and rotate credentials if they may have been exposed.
- Add only trusted browser origins to `APP_ORIGINS`. Localhost origins are disabled automatically in production.
- The built-in request throttles are per-process. If the app runs on multiple instances, use a shared rate-limit store at the edge or in a shared service.

These controls reduce common web risks; they do not replace deployment access controls, monitoring, backups, or regular dependency and security reviews.
