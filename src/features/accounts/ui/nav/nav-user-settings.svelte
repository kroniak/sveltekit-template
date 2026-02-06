<script lang="ts">
  import { page } from "$app/state";
  import routes from "$features/routes";
  import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "$lib/components/ui/sidebar";

  const navItems = [
    {
      title: "Profile",
      url: routes.accounts.pages.profile.path(),
      icon: routes.accounts.pages.profile.icon,
    },
    {
      title: "Connections",
      url: routes.accounts.pages.connections.path(),
      icon: routes.accounts.pages.connections.icon,
    },
    {
      title: "Security",
      url: routes.accounts.pages.security.path(),
      icon: routes.accounts.pages.security.icon,
    },
    {
      title: "Danger Zone",
      url: routes.accounts.pages.danger.path(),
      icon: routes.accounts.pages.danger.icon,
      isDanger: true,
    },
  ];
</script>

<SidebarGroup>
  <SidebarGroupLabel>Account Settings</SidebarGroupLabel>
  <SidebarGroupContent>
    <SidebarMenu>
      {#each navItems as item (item.url)}
        <SidebarMenuItem>
          <SidebarMenuButton isActive={page.url.pathname === item.url}>
            {#snippet child({ props })}
              <a
                href={item.url}
                {...props}
                class:text-destructive={item.isDanger && page.url.pathname !== item.url}
              >
                <item.icon class="size-4" />
                <span>{item.title}</span>
              </a>
            {/snippet}
          </SidebarMenuButton>
        </SidebarMenuItem>
      {/each}
    </SidebarMenu>
  </SidebarGroupContent>
</SidebarGroup>
