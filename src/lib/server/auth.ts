import { betterAuth, isProduction } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "$lib/server/prisma";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";
import { env } from "$env/dynamic/private";
import { APP_COOKIE_PREFIX, LAST_LOGIN_METHOD_KEY } from "$lib/environment";
import { lastLoginMethod } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    google: {
      prompt: isProduction ? "select_account" : undefined,
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      prompt: isProduction ? "select_account" : undefined,
      clientId: env.GITHUB_CLIENT_ID as string,
      clientSecret: env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [
    sveltekitCookies(getRequestEvent),
    lastLoginMethod({
      cookieName: LAST_LOGIN_METHOD_KEY,
    }),
  ],
  advanced: {
    cookiePrefix: APP_COOKIE_PREFIX,
  },
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  trustedOrigins: [env.BETTER_AUTH_URL],
});
