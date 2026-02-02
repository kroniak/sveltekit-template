import { createAuthClient } from "better-auth/svelte";
import { env } from "$env/dynamic/public";
import { lastLoginMethodClient } from "better-auth/client/plugins";
import { LAST_LOGIN_METHOD_KEY } from "$lib/environment";

/**
 * An authentication client instance for handling user authentication and authorization.
 *
 * This client is initialized with configuration options such as the base URL
 * and provides methods for managing authentication flows, including login, logout,
 * token management, and user session validation.
 *
 * The `authClient` is typically used to interact with an authentication server or service.
 *
 * Configuration:
 * - `baseURL`: The base URL of the authentication service or API.
 */
export const authClient = createAuthClient({
  baseURL: env.PUBLIC_BASE_URL,
  plugins: [
    lastLoginMethodClient({
      cookieName: LAST_LOGIN_METHOD_KEY,
    }),
  ],
});

/**
 * Asynchronously handles the sign-in process using a specified social login provider.
 *
 * @param {string} provider - The name of the social login provider to use for authentication (e.g., "google", "facebook").
 * @param {string} [redirectUrl] - Optional. The URL to redirect to after successful authentication.
 *                                 Defaults to "/dashboard" if not provided.
 *
 * The sign-in process includes:
 * - Redirecting the user to the provider's authentication flow.
 * - Handling both successful sign-ins and errors.
 * - Redirecting newly registered users to a dedicated onboarding page.
 */
export const signIn = async (provider: string, redirectUrl?: string | null) =>
  authClient.signIn.social({
    provider,
    /**
     * A URL to redirect after the user authenticates with the provider
     * @default "/"
     */
    callbackURL: redirectUrl ?? "/dashboard",
    /**
     * A URL to redirect if an error occurs during the sign-in process
     */
    errorCallbackURL: "/auth/error",
    /**
     * A URL to redirect if the user is newly registered
     */
    newUserCallbackURL: "/welcome",
  });
