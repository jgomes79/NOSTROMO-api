/**
 * Configuration options for CSRF protection middleware.
 * @property {Object} cookie - The configuration for the cookie to be set by CSRF middleware.
 * @property {string} cookie.key - The name of the cookie.
 * @property {boolean} cookie.sameSite - Strictly set to the same site for CSRF protection.
 * @property {boolean} cookie.httpOnly - Ensures the cookie is sent only over HTTP(S), not accessible through JavaScript.
 * @property {boolean} cookie.secure - Ensures the cookie is sent over HTTPS.
 */
export const csurfConfigOptions = {
  cookie: {
    key: '_csrf',
    sameSite: true,
    httpOnly: true,
    secure: true,
  },
};

// Types
type Domains = Record<'LOCAL' | 'STAGING' | 'PRODUCTION', string[]>;

/**
 * Get domains from environment variable.
 * @returns Domains from environment variable.
 */
const getDomainsFromEnv = () => {
  const corseDomain = process.env.CORS_DOMAIN.split(',');
  return Array.from(new Set(corseDomain));
};

/**
 * Domains configuration for different environments.
 * LOCAL: Domains for local development.
 * DEV: Domains for the development environment.
 * PRODUCTION: Domains for the production environment.
 */
const domains: Domains = {
  LOCAL: ['http://localhost:4200', 'http://127.0.0.1:4200', ...getDomainsFromEnv()],
  STAGING: [...getDomainsFromEnv()],
  PRODUCTION: [...getDomainsFromEnv()],
};

export default domains;
