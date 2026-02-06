<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import {
    getUserSessions,
    revokeSession,
    revokeAllSessions,
  } from "$features/accounts/accounts-api.remote";
  import { toast } from "svelte-sonner";
  import { cn } from "$lib/utils";
  import IconDeviceDesktop from "@tabler/icons-svelte/icons/device-desktop";
  import IconDeviceMobile from "@tabler/icons-svelte/icons/device-mobile";
  import IconX from "@tabler/icons-svelte/icons/x";

  // Get sessions
  const sessionsQuery = getUserSessions();

  let revokingSessionId = $state<string | null>(null);
  let revokingAll = $state(false);

  function parseUserAgent(userAgent: string | null): {
    browser: string;
    os: string;
    isMobile: boolean;
  } {
    if (!userAgent) {
      return { browser: "Unknown", os: "Unknown", isMobile: false };
    }

    const isMobile = /Mobile|Android|iPhone|iPad/i.test(userAgent);

    // Parse browser
    let browser = "Unknown Browser";
    if (userAgent.includes("Firefox")) {
      browser = "Firefox";
    } else if (userAgent.includes("Edg/")) {
      browser = "Edge";
    } else if (userAgent.includes("Chrome")) {
      browser = "Chrome";
    } else if (userAgent.includes("Safari")) {
      browser = "Safari";
    } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
      browser = "Opera";
    }

    // Parse OS
    let os = "Unknown OS";
    if (userAgent.includes("Windows")) {
      os = "Windows";
    } else if (userAgent.includes("Mac OS")) {
      os = "macOS";
    } else if (userAgent.includes("Linux")) {
      os = "Linux";
    } else if (userAgent.includes("Android")) {
      os = "Android";
    } else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
      os = "iOS";
    }

    return { browser, os, isMobile };
  }

  function formatRelativeTime(date: Date | string): string {
    const now = new Date();
    const then = new Date(date);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

    return then.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  async function handleRevokeSession(sessionId: string) {
    revokingSessionId = sessionId;
    try {
      await revokeSession({ sessionId });
      toast.success("Session revoked successfully");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to revoke session";
      toast.error(message);
    } finally {
      revokingSessionId = null;
    }
  }

  async function handleRevokeAll() {
    revokingAll = true;
    try {
      await revokeAllSessions();
      toast.success("All other sessions revoked");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to revoke sessions";
      toast.error(message);
    } finally {
      revokingAll = false;
    }
  }
</script>

<svelte:boundary>
  {#snippet failed(error: unknown)}
    <Card>
      <CardContent class="p-6">
        <p class="text-destructive">
          Failed to load sessions: {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </CardContent>
    </Card>
  {/snippet}

  <div class="space-y-6">
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <div>
            <CardTitle>Active Sessions</CardTitle>
            <CardDescription>
              Manage your active sessions across devices. Your current session cannot be revoked.
            </CardDescription>
          </div>
          {#if sessionsQuery.current && sessionsQuery.current.filter((s) => !s.isCurrent).length > 0}
            <Button variant="outline" size="sm" disabled={revokingAll} onclick={handleRevokeAll}>
              {revokingAll ? "Revoking..." : "Revoke all other sessions"}
            </Button>
          {/if}
        </div>
      </CardHeader>
      <CardContent>
        {#if sessionsQuery.loading}
          <p class="text-muted-foreground">Loading sessions...</p>
        {:else if sessionsQuery.current}
          {@const sessions = sessionsQuery.current}

          {#if sessions.length === 0}
            <p class="text-muted-foreground">No active sessions found.</p>
          {:else}
            <div class="space-y-4">
              {#each sessions as session (session.id)}
                {@const parsed = parseUserAgent(session.userAgent)}
                {@const DeviceIcon = parsed.isMobile ? IconDeviceMobile : IconDeviceDesktop}

                <div
                  class={cn(
                    "flex items-center justify-between rounded-lg border p-4",
                    session.isCurrent && "border-primary bg-primary/5",
                  )}
                >
                  <div class="flex items-center gap-4">
                    <div class="flex size-10 items-center justify-center rounded-full bg-muted">
                      <DeviceIcon class="size-5" />
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="font-medium">
                          {parsed.browser} on {parsed.os}
                        </span>
                        {#if session.isCurrent}
                          <Badge>Current session</Badge>
                        {/if}
                      </div>
                      <div
                        class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground"
                      >
                        {#if session.ipAddress}
                          <span>{session.ipAddress}</span>
                        {/if}
                        <span>Last active: {formatRelativeTime(session.updatedAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    {#if !session.isCurrent}
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={revokingSessionId === session.id}
                        onclick={() => handleRevokeSession(session.id)}
                      >
                        <IconX class="size-4" />
                        <span class="sr-only">Revoke session</span>
                      </Button>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          {/if}
        {/if}
      </CardContent>
    </Card>
  </div>
</svelte:boundary>
