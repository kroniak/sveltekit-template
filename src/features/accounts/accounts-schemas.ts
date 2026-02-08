import { z } from "zod";

/**
 * Schema for updating user profile
 */
export const updateProfileSchema = z.object({
  name: z
    .string({ message: "Name must be a string" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

/**
 * Schema for unlinking a social account
 */
export const unlinkAccountSchema = z.object({
  providerId: z.enum(["google", "github"], { message: "Invalid provider" }),
});

export type UnlinkAccountInput = z.infer<typeof unlinkAccountSchema>;

/**
 * Schema for revoking a session
 */
export const revokeSessionSchema = z.object({
  sessionId: z.string({ message: "Session ID must be a string" }).min(1, "Session ID is required"),
});

export type RevokeSessionInput = z.infer<typeof revokeSessionSchema>;

/**
 * Schema for deleting the user account
 */
export const deleteAccountSchema = z.object({
  confirmEmail: z.email("Invalid email format"),
});

export type DeleteAccountInput = z.infer<typeof deleteAccountSchema>;
