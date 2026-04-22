type Env = Record<string, unknown>;

function requireString(env: Env, key: string, fallback?: string): string {
  const value = env[key] ?? fallback;

  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`Environment variable ${key} is required.`);
  }

  return value;
}

export function validateEnv(env: Env) {
  const port = Number(env.PORT ?? 3001);

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error('Environment variable PORT must be a positive integer.');
  }

  return {
    PORT: port,
    WEB_APP_ORIGIN: requireString(
      env,
      'WEB_APP_ORIGIN',
      'http://localhost:3000',
    ),
    SCRYFALL_API_BASE_URL: requireString(
      env,
      'SCRYFALL_API_BASE_URL',
      'https://api.scryfall.com',
    ),
    SCRYFALL_USER_AGENT: requireString(
      env,
      'SCRYFALL_USER_AGENT',
      'highmarket-api/1.0 (+https://your-app.example)',
    ),
  };
}
