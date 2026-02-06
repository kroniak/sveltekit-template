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
  import { Separator } from "$lib/components/ui/separator";
  import { getUserAccounts, unlinkAccount } from "$features/accounts/accounts-api.remote";
  import { authClient, oAuth2Providers, type OAuth2Providers } from "$lib/auth-client";
  import { toast } from "svelte-sonner";
  import routes from "$features/routes";
  import IconLink from "@tabler/icons-svelte/icons/link";
  import IconUnlink from "@tabler/icons-svelte/icons/unlink";
  import { formatDate } from "$lib/utils/locale";

  // Get connected accounts
  const accountsQuery = getUserAccounts();

  let unlinkingProvider = $state<string | null>(null);
  let connectingProvider = $state<string | null>(null);

  function getLastLoginMethod(): string | null {
    return authClient.getLastUsedLoginMethod();
  }

  async function handleUnlink(providerId: string) {
    unlinkingProvider = providerId;
    try {
      await unlinkAccount({ providerId: providerId as "google" | "github" });
      toast.success(`${providerId} account disconnected`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to disconnect account";
      toast.error(message);
    } finally {
      unlinkingProvider = null;
    }
  }

  async function handleConnect(providerId: string) {
    connectingProvider = providerId;
    try {
      await authClient.linkSocial({
        provider: providerId,
        callbackURL: routes.accounts.pages.connections.path(),
      });
    } catch (err) {
      toast.error("Failed to connect account");
      console.error(err);
      connectingProvider = null;
    }
  }
</script>

<svelte:boundary>
  {#snippet failed(error: unknown)}
    <Card>
      <CardContent class="p-6">
        <p class="text-destructive">
          Failed to load accounts: {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </CardContent>
    </Card>
  {/snippet}

  <div class="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Connected Accounts</CardTitle>
        <CardDescription>
          Manage your connected social accounts. You can use any of these to sign in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {#if accountsQuery.loading}
          <p class="text-muted-foreground">Loading accounts...</p>
        {:else if accountsQuery.current}
          {@const accounts = accountsQuery.current}
          {@const lastLoginMethod = getLastLoginMethod()}
          {@const canUnlink = accounts.length > 1}

          <div class="space-y-4">
            {#each oAuth2Providers as provider (provider.id)}
              {@const account = accounts.find((a) => a.providerId === provider.id)}
              {@const isLastUsed = lastLoginMethod === provider.id}

              <div class="flex items-center justify-between rounded-lg border p-4">
                <div class="flex items-center gap-4">
                  <div class="flex size-10 items-center justify-center rounded-full bg-muted">
                    <provider.icon class="size-5" />
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="font-medium">{provider.name}</span>
                      {#if account && isLastUsed}
                        <Badge variant="secondary">Last used</Badge>
                      {/if}
                    </div>
                    {#if account}
                      <p class="text-sm text-muted-foreground">
                        Connected on {formatDate(account.createdAt)}
                      </p>
                    {:else}
                      <p class="text-sm text-muted-foreground">Not connected</p>
                    {/if}
                  </div>
                </div>

                <div>
                  {#if account}
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={!canUnlink || unlinkingProvider === provider.id}
                      onclick={() => handleUnlink(provider.id)}
                    >
                      <IconUnlink class="mr-2 size-4" />
                      {unlinkingProvider === provider.id ? "Disconnecting..." : "Disconnect"}
                    </Button>
                  {:else}
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={connectingProvider === provider.id}
                      onclick={() => handleConnect(provider.id)}
                    >
                      <IconLink class="mr-2 size-4" />
                      {connectingProvider === provider.id ? "Connecting..." : "Connect"}
                    </Button>
                  {/if}
                </div>
              </div>
            {/each}
          </div>

          {#if accounts.length <= 1}
            <Separator class="my-4" />
            <p class="text-sm text-muted-foreground">
              You must have at least one connected account to sign in. Connect another account
              before disconnecting this one.
            </p>
          {/if}
        {/if}
      </CardContent>
    </Card>
  </div>
</svelte:boundary>
