/**
 * An array of routes that are accessible to the public.
 * these routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/auth/new-verification",
]

/**
 * An array of routes that are use for authentication.
 * these routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
]

/**
 * the prefix for API authentication routes
 * Routes that start with the prefix are used for API
 * @type {string}
 */
export const apiAuthPrefix = "api/auth"

/**
 * the deafault redirect path after loggin in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"
