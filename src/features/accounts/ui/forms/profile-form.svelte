<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import * as Form from "$lib/components/ui/form";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import { updateProfile } from "$features/accounts/accounts-api.remote";
  import { updateProfileSchema, type UpdateProfileInput } from "$features/accounts/accounts-schemas";
  import { toast } from "svelte-sonner";
  import { defaults, superForm } from "sveltekit-superforms";
  import { zod4 } from "sveltekit-superforms/adapters";
  import type { User } from "better-auth";

  interface Props {
    profile: User | null | undefined;
  }

  let { profile }: Props = $props();

  const form = superForm(defaults({ name: profile?.name ?? "" }, zod4(updateProfileSchema)), {
    SPA: true,
    validators: zod4(updateProfileSchema),
    async onUpdate({ form }) {
      if (form.valid) {
        await handleSubmit(form.data);
      }
    },
  });

  const { form: formData, enhance, submitting, errors } = form;

  async function handleSubmit(data: UpdateProfileInput) {
    try {
      await updateProfile(data);
      toast.success("Profile updated successfully");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update profile";
      toast.error(message);
      console.error(err);
    }
  }
</script>

<!-- Display Name Section -->
<Card>
  <CardHeader>
    <CardTitle>Display Name</CardTitle>
    <CardDescription>
      This is the name that will be displayed across the application.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <form method="POST" use:enhance class="flex flex-col gap-4 sm:flex-row sm:items-start">
      <Form.Field {form} name="name" class="flex-1">
        <Form.Control>
          {#snippet children({ props })}
            <Input
              {...props}
              type="text"
              placeholder="Enter your name"
              bind:value={$formData.name}
            />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <Button type="submit" disabled={$submitting || $formData.name === profile?.name}>
        {$submitting ? "Saving..." : "Save"}
      </Button>
    </form>
  </CardContent>
</Card>
