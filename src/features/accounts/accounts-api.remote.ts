import { command, getRequestEvent, query } from "$app/server";
import { error, redirect } from "@sveltejs/kit";
import prisma from "$lib/server/prisma";
import {
  deleteAccountSchema,
  revokeSessionSchema,
  unlinkAccountSchema,
  updateProfileSchema,
} from "./account-schemas";
import routes from "$features/routes";
import type { Session, User } from "better-auth";

/**
 * Helper to get the current user from the request event
 */
export const getCurrentUser = query<User>(() => {
  const { user } = getRequestEvent().locals;
  if (!user) {
    redirect(
      303,
      routes.accounts.pages.login.path({ query: { redirect: getRequestEvent().url.pathname } }),
    );
  }
  return user;
});

/**
 * Helper to get the current session from the request event
 */
export const getCurrentSession = query<Session>(() => {
  const { session } = getRequestEvent().locals;
  if (!session) {
    redirect(
      303,
      routes.accounts.pages.login.path({ query: { redirect: getRequestEvent().url.pathname } }),
    );
  }
  return session;
});

/**
 * Get current user profile data
 */
export const getUserProfile = query<User>(async () => getCurrentUser());

/**
 * Get user's connected OAuth accounts
 */
export const getUserAccounts = query(async () => {
  const user = await getCurrentUser();

  return prisma.account.findMany({
    where: { userId: user.id },
    select: {
      id: true,
      providerId: true,
      accountId: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });
});

/**
 * Get user's active sessions
 */
export const getUserSessions = query(async () => {
  const user = await getCurrentUser();
  const currentSession = await getCurrentSession();

  const sessions = await prisma.session.findMany({
    where: { userId: user.id },
    select: {
      id: true,
      token: true,
      ipAddress: true,
      userAgent: true,
      createdAt: true,
      updatedAt: true,
      expiresAt: true,
    },
    orderBy: { updatedAt: "desc" },
  });

  return sessions.map((session) => ({
    ...session,
    isCurrent: session.token === currentSession.token,
  }));
});

/**
 * Update user profile (name)
 */
export const updateProfile = command(updateProfileSchema, async (data) => {
  const user = await getCurrentUser();

  await prisma.user.update({
    where: { id: user.id },
    data: { name: data.name },
  });

  // Refresh the query after update
  await getUserProfile().refresh();

  return { success: true };
});

/**
 * Unlink a social account
 */
export const unlinkAccount = command(unlinkAccountSchema, async (data) => {
  const user = await getCurrentUser();

  // Check if a user has more than one account
  const accountCount = await prisma.account.count({
    where: { userId: user.id },
  });

  if (accountCount <= 1) {
    error(400, "Cannot unlink your only authentication method");
  }

  // Find and delete the account
  const account = await prisma.account.findFirst({
    where: {
      userId: user.id,
      providerId: data.providerId,
    },
  });

  if (!account) {
    error(404, "Account not found");
  }

  await prisma.account.delete({
    where: { id: account.id },
  });

  // Refresh the accounts query
  await getUserAccounts().refresh();

  return { success: true };
});

/**
 * Revoke a specific session
 */
export const revokeSession = command(revokeSessionSchema, async (data) => {
  const user = await getCurrentUser();
  const currentSession = await getCurrentSession();

  // Find the session
  const session = await prisma.session.findFirst({
    where: {
      id: data.sessionId,
      userId: user.id,
    },
  });

  if (!session) {
    error(404, "Session not found");
  }

  // Prevent revoking the current session
  if (session.token === currentSession.token) {
    error(400, "Cannot revoke your current session");
  }

  await prisma.session.delete({
    where: { id: session.id },
  });

  // Refresh the sessions query
  await getUserSessions().refresh();

  return { success: true };
});

/**
 * Revoke all sessions except current
 */
export const revokeAllSessions = command(async () => {
  const user = await getCurrentUser();
  const currentSession = await getCurrentSession();

  await prisma.session.deleteMany({
    where: {
      userId: user.id,
      token: { not: currentSession.token },
    },
  });

  // Refresh the sessions query
  await getUserSessions().refresh();

  return { success: true };
});

/**
 * Delete a user account
 */
export const deleteAccount = command(deleteAccountSchema, async (data) => {
  const user = await getCurrentUser();

  // Verify email matches
  if (data.confirmEmail.toLowerCase() !== user.email.toLowerCase()) {
    error(400, "Email does not match");
  }

  // Delete user (cascades to sessions and accounts due to Prisma relations)
  await prisma.user.delete({
    where: { id: user.id },
  });

  // Redirect to home after deletion
  redirect(303, routes.application.pages.home.path());
});
