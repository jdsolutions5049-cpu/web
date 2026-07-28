const configuredApiBase = process.env.REACT_APP_API_BASE_URL?.trim();

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
