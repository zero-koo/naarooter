/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  '^/$',
  '^/(community|post|polls)(/[0-9a-fA-F-]{36})?$',
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to '/'
 * @type {string[]}
 */
export const authRoutes = ['/signin', '/signup'];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/';
