const configuredApiBase = process.env.REACT_APP_API_BASE_URL?.trim();

const normalizedApiBase = configuredApiBase
  ? configuredApiBase.replace(/\/+$/, "")
  : "http://localhost:8080";

export const buildApiUrl = (path) =>
  `${normalizedApiBase}${path.startsWith("/") ? path : `/${path}`}`;
