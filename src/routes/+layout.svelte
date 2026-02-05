<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import { ModeWatcher } from "mode-watcher";
  import { APP_NAME_PREFIX } from "$lib/environment";

  let { children } = $props();
</script>

<svelte:head>
  <!--  TODO mv to html-->
  <link rel="icon" href={favicon} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<ModeWatcher
  modeStorageKey={`${APP_NAME_PREFIX}.mode`}
  themeStorageKey={`${APP_NAME_PREFIX}.theme`}
  defaultMode="system"
  defaultTheme="mono"
/>
{@render children()}
