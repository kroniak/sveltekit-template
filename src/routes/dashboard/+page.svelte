<script lang="ts">
  import data from "./data.js";
  import SectionCards from "$features/dashboard-template/section-cards.svelte";
  import ChartAreaInteractive from "$features/dashboard-template/chart-area-interactive.svelte";
  import DataTable from "$features/dashboard-template/data-table.svelte";
</script>

<div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
  <SectionCards />
  <div class="px-4 lg:px-6">
    <ChartAreaInteractive />
  </div>
  <DataTable {data} />
</div>
