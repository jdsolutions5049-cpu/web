// Production serves the React app from the website domain while the API runs
// as a separate Render web service. Keep an explicit fallback so a missing
// build-time environment variable cannot send requests to the static host.
const productionApiBase = "https://jd-solutions-backend-riwi.onrender.com";
const configuredApiBase = process.env.REACT_APP_API_BASE_URL?.trim() || productionApiBase;

const normalizedApiBase = configuredApiBase
  ? configuredApiBase.replace(/\/+$/, "")
  : "";

export const buildApiUrl = (path) =>
  `${normalizedApiBase}${path.startsWith("/") ? path : `/${path}`}`;

export const fetchWithTimeout = (url, options = {}, timeoutMs = 15000) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(timeout));
};
