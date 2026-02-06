<script lang="ts">
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import DeleteAccountDialog from "./forms/delete-account-dialog.svelte";
  import IconAlertTriangle from "@tabler/icons-svelte/icons/alert-triangle";
</script>

<div class="space-y-6">
  <Card class="border-destructive/50">
    <CardHeader>
      <div class="flex items-center gap-2">
        <IconAlertTriangle class="size-5 text-destructive" />
        <CardTitle class="text-destructive">Danger Zone</CardTitle>
      </div>
      <CardDescription>
        Irreversible and destructive actions. Please proceed with caution.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h4 class="font-medium">Delete Account</h4>
            <p class="text-sm text-muted-foreground">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
          </div>
          <div class="shrink-0">
            <DeleteAccountDialog />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</div>
