<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
  } from "$lib/components/ui/sidebar/index.js";
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
    BadgeCheckIcon,
    BellIcon,
    ChevronsUpDownIcon,
    CreditCardIcon,
    LogOutIcon,
    SparklesIcon,
  } from "@lucide/svelte";
  import { signOut, useSession } from "$lib/auth-client";
  import type { User } from "better-auth";
  import { page } from "$app/state";

  const sidebar = useSidebar();
  const session = useSession();
</script>

{#snippet userInfo(user: User | undefined)}
  {#if user}
    <Avatar class="size-8 rounded-lg">
      {#if user.image}
        <AvatarImage src={user.image} alt={user.name} />
      {:else}
        <AvatarFallback class="rounded-lg">CN</AvatarFallback>
      {/if}
    </Avatar>
    <div class="grid flex-1 text-start text-sm leading-tight">
      <span class="truncate font-medium">{user.name}</span>
      <span class="truncate text-xs">{user.email}</span>
    </div>
  {/if}
{/snippet}

<SidebarMenu class="h-12">
  {#if $session.data}
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {#snippet child({ props })}
            <SidebarMenuButton
              size="lg"
              class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              {...props}
            >
              {@render userInfo($session.data?.user)}
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
              {@render userInfo($session.data?.user)}
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
            <DropdownMenuItem>
              <BadgeCheckIcon />
              Account
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
              await signOut().then(() => goto(`/auth/login?redirect=${page.url.pathname}`))}
          >
            <LogOutIcon />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  {/if}
</SidebarMenu>
