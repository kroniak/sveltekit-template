<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { deleteAccount, getUserProfile } from "$features/accounts/accounts-api.remote";
  import { toast } from "svelte-sonner";
  import IconAlertTriangle from "@tabler/icons-svelte/icons/alert-triangle";

  let {
    open = $bindable(false),
  }: {
    open?: boolean;
  } = $props();

  const profileQuery = getUserProfile();

  let confirmEmail = $state("");
  let isDeleting = $state(false);

  const emailMatches = $derived(
    profileQuery.current && confirmEmail.toLowerCase() === profileQuery.current.email.toLowerCase(),
  );

  async function handleDelete() {
    if (!emailMatches) return;

    isDeleting = true;
    try {
      await deleteAccount({ confirmEmail });
      toast.success("Account deleted successfully");
      // The redirect happens in the remote function
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to delete account";
      toast.error(message);
      isDeleting = false;
    }
  }

  function handleOpenChange(newOpen: boolean) {
    if (!isDeleting) {
      open = newOpen;
      if (!newOpen) {
        confirmEmail = "";
      }
    }
  }
</script>

<AlertDialog.Root bind:open onOpenChange={handleOpenChange}>
  <AlertDialog.Trigger>
    {#snippet child({ props })}
      <Button variant="destructive" {...props}>
        <IconAlertTriangle class="mr-2 size-4" />
        Delete Account
      </Button>
    {/snippet}
  </AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Delete Account</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete your account and remove all
        associated data from our servers.
      </AlertDialog.Description>
    </AlertDialog.Header>

    <div class="space-y-4 py-4">
      <div class="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
        <div class="flex gap-3">
          <IconAlertTriangle class="mt-0.5 size-5 shrink-0 text-destructive" />
          <div class="text-sm">
            <p class="font-medium text-destructive">Warning</p>
            <ul class="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
              <li>All your data will be permanently deleted</li>
              <li>Your connected accounts will be unlinked</li>
              <li>Your active sessions will be terminated</li>
              <li>This action cannot be reversed</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="space-y-2">
        <Label for="confirm-email">
          Type <span class="font-mono font-medium"
            >{profileQuery.current?.email ?? "your email"}</span
          > to confirm
        </Label>
        <Input
          id="confirm-email"
          type="email"
          placeholder="Enter your email"
          bind:value={confirmEmail}
          disabled={isDeleting}
        />
      </div>
    </div>

    <AlertDialog.Footer>
      <AlertDialog.Cancel disabled={isDeleting}>Cancel</AlertDialog.Cancel>
      <Button variant="destructive" disabled={!emailMatches || isDeleting} onclick={handleDelete}>
        {isDeleting ? "Deleting..." : "Delete My Account"}
      </Button>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
