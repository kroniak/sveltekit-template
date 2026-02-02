<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar";
  import AppSidebar from "$lib/components/app/app-sidebar.svelte";
  import SiteHeader from "$lib/components/app/site-header.svelte";

  let { children, data } = $props();
</script>

<Sidebar.Provider
  open={data.sidebarOpen}
  style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);"
>
  <AppSidebar />
  <Sidebar.Inset>
    <SiteHeader />
    <div class="flex flex-1 flex-col">
      <div class="@container/main flex min-h-screen flex-1 flex-col gap-2">
        {@render children()}
      </div>
    </div>
  </Sidebar.Inset>
</Sidebar.Provider>
