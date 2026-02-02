<script lang="ts">
  import { cn } from "$lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";
  import { Button } from "$lib/components/ui/button";
  import { Field, FieldDescription, FieldGroup, FieldSeparator } from "$lib/components/ui/field";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import { authClient, signIn } from "$lib/auth-client";
  import BrandGithub from "@tabler/icons-svelte/icons/brand-github";
  import BrandGoogle from "@tabler/icons-svelte/icons/brand-google";
  import { onMount } from "svelte";
  import { Badge } from "$lib/components/ui/badge";
  import type { Icon } from "@tabler/icons-svelte";

  let {
    class: className,
    redirectUrl,
    ...restProps
  }: HTMLAttributes<HTMLDivElement> & {
    redirectUrl: string | null;
  } = $props();

  let lastMethod = $state();

  onMount(async () => {
    lastMethod = authClient.getLastUsedLoginMethod();
  });
</script>

{#snippet socialButton(provider: string, Icon: Icon)}
  <div class="relative">
    <Button
      variant="outline"
      type="button"
      class="w-full"
      onclick={async () => await signIn(provider, redirectUrl)}
    >
      <Icon />
      Login with <span class="capitalize">{provider}</span>
    </Button>
    {#if lastMethod === provider}
      <Badge class="absolute -top-2 -right-2">Last used</Badge>
    {/if}
  </div>
{/snippet}

<div class={cn("flex flex-col gap-6", className)} {...restProps}>
  <Card>
    <CardHeader class="text-center">
      <CardTitle class="text-xl">
        {#if lastMethod !== null}
          Welcome back
        {:else}
          Welcome
        {/if}
      </CardTitle>
      <CardDescription>Login with your Social account</CardDescription>
    </CardHeader>
    <CardContent>
      <FieldGroup>
        <Field class="py-6">
          {@render socialButton("google", BrandGoogle)}
          {@render socialButton("github", BrandGithub)}
        </Field>
        <FieldSeparator />
        <Field>
          <FieldDescription class="grid gap-2 text-center">
            <span>Don't have an account?</span>
            <span>Don't worry, just login and account will be created for you.</span>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </CardContent>
  </Card>
  <FieldDescription class="px-6 text-center">
    By clicking login, you agree to our <a href="##">Terms of Service</a>
    and <a href="##">Privacy Policy</a>.
  </FieldDescription>
</div>
