<script lang="ts">
  import ProfileForm from "$features/accounts/ui/forms/profile-form.svelte";
  import { getUserProfile } from "$features/accounts/accounts-api.remote";
  import { formatDate } from "$lib/utils/locale";
  import { Input } from "$lib/components/ui/input";
  import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import { accountsTools } from "$features/accounts/accounts-tools";
  import { CopyButton } from "$lib/components/extras/copy-button";

  // Get user profile data
  const profileQuery = getUserProfile();
</script>

<svelte:boundary>
  {#snippet failed(error: unknown)}
    <Card>
      <CardContent class="p-6">
        <p class="text-destructive">
          Failed to load profile: {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </CardContent>
    </Card>
  {/snippet}
  {#snippet pending()}
    <Card>
      <CardContent class="p-6">
        <p class="text-muted-foreground">Loading profile...</p>
      </CardContent>
    </Card>
  {/snippet}

  <div class="space-y-6">
    {#if profileQuery.current}
      {@const profile = profileQuery.current}

      <!-- Avatar Section -->
      <Card>
        <CardHeader>
          <CardTitle>Avatar</CardTitle>
          <CardDescription>
            Your avatar is synced from your connected social account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex items-center gap-4">
            <Avatar class="size-20">
              <AvatarImage src={profile.image} alt={profile.name} />
              <AvatarFallback class="text-lg">
                {accountsTools.getInitials(profile.name)}
              </AvatarFallback>
            </Avatar>
            <div class="text-sm text-muted-foreground">
              <p>Avatar images are provided by your connected accounts.</p>
              <p>To change your avatar, update it on Google or GitHub.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Display Name Section -->
      <ProfileForm {profile} />

      <!-- Email Section -->
      <Card>
        <CardHeader>
          <CardTitle>Email Address</CardTitle>
          <CardDescription>
            Your email address is used for notifications and account recovery.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex items-center gap-2">
            <Input value={profile.email} disabled class="flex-1" />
            <CopyButton text={profile.email} variant="outline" />
          </div>
          <p class="mt-2 text-sm text-muted-foreground">
            Email cannot be changed. It is linked to your social account.
          </p>
        </CardContent>
      </Card>

      <!-- User ID Section -->
      <Card>
        <CardHeader>
          <CardTitle>User ID</CardTitle>
          <CardDescription>Your unique identifier in our system.</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex items-center gap-2">
            <Input value={profile.id} disabled class="flex-1 font-mono text-sm" />
            <CopyButton text={profile.id} variant="outline" />
          </div>
        </CardContent>
      </Card>

      <!-- Member Since Section -->
      <Card>
        <CardHeader>
          <CardTitle>Member Since</CardTitle>
          <CardDescription>The date you created your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-sm">{formatDate(profile.createdAt)}</p>
        </CardContent>
      </Card>
    {/if}
  </div>
</svelte:boundary>
