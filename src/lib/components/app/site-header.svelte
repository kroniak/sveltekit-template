<script lang="ts">
  import ModeSwitcher from "$lib/components/app/mode-switcher.svelte";
  import { Separator } from "$lib/components/ui/separator";
  import { SidebarTrigger } from "$lib/components/ui/sidebar";
  import { useSession } from "$lib/auth-client";
  import { Button } from "$lib/components/ui/button";
  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "$lib/components/ui/breadcrumb";

  const session = useSession();
  $: showLogin = !$session.data && $session.isPending === false;
</script>

<header
  class="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
>
  <div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
    <SidebarTrigger class="-ms-1" />
    <Separator orientation="vertical" class="mx-2 data-[orientation=vertical]:h-4" />
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem class="hidden md:block">
          <BreadcrumbLink href="##">Building Your Application</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator class="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>Data Fetching</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div class="ms-auto flex items-center gap-2">
      {#if showLogin}
        <a href="/auth/login">
          <Button variant="outline">Log in</Button>
        </a>
      {/if}
      <ModeSwitcher />
    </div>
  </div>
</header>
