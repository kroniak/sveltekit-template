<script lang="ts">
  import ModeSwitcher from "$features/application/ui/mode-switcher.svelte";
  import { Button } from "$lib/components/ui/button";
  import { IconHome } from "@tabler/icons-svelte";
  import routes from "$features/routes";

  let { children } = $props();
</script>

<header
  class="flex h-12 shrink-0 items-center gap-2 bg-muted transition-[width,height] ease-linear"
>
  <div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
    <div class="ms-auto flex items-center gap-2">
      <a href={routes.application.pages.home.path()}>
        <Button variant="outline" size="icon"><IconHome /></Button>
      </a>
      <ModeSwitcher />
    </div>
  </div>
</header>
{@render children()}
