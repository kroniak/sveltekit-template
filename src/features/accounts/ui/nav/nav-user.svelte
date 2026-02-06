<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
  } from "$lib/components/ui/sidebar";
  import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "$lib/components/ui/dropdown-menu";
  import {
    BellIcon,
    ChevronsUpDownIcon,
    CreditCardIcon,
    LogOutIcon,
    SparklesIcon,
  } from "@lucide/svelte";
  import { signOut } from "$lib/auth-client";
  import type { User } from "better-auth";
  import { page } from "$app/state";
  import routes from "$features/routes";
  import { getCurrentUser } from "$features/accounts/accounts-api.remote";
  import { Skeleton } from "$lib/components/ui/skeleton";
  import { accountsTools } from "$features/accounts/accounts-tools";

  const sidebar = useSidebar();
  const userQuery = getCurrentUser();
</script>

{#snippet userInfo(user: User | undefined)}
  {#if user}
    <Avatar class="size-8 rounded-lg">
      {#if user.image}
        <AvatarImage src={user.image} alt={user.name} />
      {:else}
        <AvatarFallback class="rounded-lg">{accountsTools.getInitials(user.name)}</AvatarFallback>
      {/if}
    </Avatar>
    <div class="grid flex-1 text-start text-sm leading-tight">
      <span class="truncate font-medium">{user.name}</span>
      <span class="truncate text-xs">{user.email}</span>
    </div>
  {/if}
{/snippet}

{#snippet userSkeleton()}
  <Skeleton class="size-8 rounded-lg" />
  <div class="grid flex-1 text-start text-sm leading-tight">
    <Skeleton class="h-4 w-24 rounded" />
    <Skeleton class="mt-1 h-3 w-32 rounded" />
  </div>
{/snippet}

<SidebarMenu class="h-12">
  <svelte:boundary>
    {#snippet failed()}
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" class="cursor-default">
          {@render userSkeleton()}
          <ChevronsUpDownIcon class="ms-auto size-4 opacity-0" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    {/snippet}
    {#snippet pending()}
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" class="cursor-default">
          {@render userSkeleton()}
          <ChevronsUpDownIcon class="ms-auto size-4 opacity-0" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    {/snippet}
    {#if userQuery.current}
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger>
            {#snippet child({ props })}
              <SidebarMenuButton
                size="lg"
                class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                {...props}
              >
                {@render userInfo(userQuery.current)}
                <ChevronsUpDownIcon class="ms-auto size-4" />
              </SidebarMenuButton>
            {/snippet}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
            side={sidebar.isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel class="p-0 font-normal">
              <div class="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
                {@render userInfo(userQuery.current)}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <SparklesIcon />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onclick={() => goto(routes.accounts.pages.profile.path())}>
                <routes.accounts.pages.profile.icon />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCardIcon />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BellIcon />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onclick={async () =>
                await signOut().then(() =>
                  goto(
                    routes.accounts.pages.login.path({ query: { redirect: page.url.pathname } }),
                  ),
                )}
            >
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    {/if}
  </svelte:boundary>
</SidebarMenu>
