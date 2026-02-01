<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";

  import { ModeWatcher } from "mode-watcher";
  import AppSidebar from "$lib/components/app/app-sidebar.svelte";
  import { SidebarInset, SidebarProvider } from "$lib/components/ui/sidebar";
  import SiteHeader from "$lib/components/app/site-header.svelte";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<ModeWatcher />

<SidebarProvider
  style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);"
>
  <AppSidebar />
  <SidebarInset>
    <SiteHeader />
    <div class="flex flex-1 flex-col">
      <div class="@container/main flex min-h-screen flex-1 flex-col gap-2">
        {@render children()}
      </div>
    </div>
  </SidebarInset>
</SidebarProvider>
