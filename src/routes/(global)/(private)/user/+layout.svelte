<script lang="ts">
  import NavUserSettings from "$features/accounts/ui/nav/nav-user-settings.svelte";
  import { Separator } from "$lib/components/ui/separator";

  let { children } = $props();
</script>

<div class="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
  <div class="flex flex-col gap-1">
    <h1 class="text-2xl font-semibold tracking-tight">Account Settings</h1>
    <p class="text-sm text-muted-foreground">Manage your account settings and preferences.</p>
  </div>

  <Separator />

  <div class="flex flex-1 flex-col gap-6 md:flex-row">
    <!-- Sidebar Navigation -->
    <aside class="shrink-0 md:w-56">
      <nav class="flex flex-col gap-1">
        <NavUserSettings />
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="min-w-0 flex-1">
      {@render children()}
    </main>
  </div>
</div>
