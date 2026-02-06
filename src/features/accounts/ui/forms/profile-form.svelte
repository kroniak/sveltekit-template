<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
  import { Separator } from "$lib/components/ui/separator";
  import { updateProfile, getUserProfile } from "$features/accounts/accounts-api.remote";
  import { toast } from "svelte-sonner";
  import IconCopy from "@tabler/icons-svelte/icons/copy";
  import { formatDate } from "$lib/utils/locale";

  let nameValue = $state("");
  let isLoading = $state(false);

  const { profile } = $props();

  async function handleSubmit(e: Event) {
    e.preventDefault();
    if (!nameValue.trim()) return;

    isLoading = true;
    try {
      await updateProfile({ name: nameValue.trim() });
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Failed to update profile");
      console.error(err);
    } finally {
      isLoading = false;
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
    <form onsubmit={handleSubmit} class="flex flex-col gap-4 sm:flex-row sm:items-end">
      <div class="flex-1 space-y-2">
        <Label for="name">Name</Label>
        <Input
          id="name"
          type="text"
          bind:value={nameValue}
          placeholder="Enter your name"
          minlength={2}
          maxlength={100}
          required
        />
      </div>
      <Button type="submit" disabled={isLoading || nameValue === profile.name}>
        {isLoading ? "Saving..." : "Save"}
      </Button>
    </form>
  </CardContent>
</Card>
