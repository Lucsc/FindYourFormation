<template>
  <div class="w-full">
    <label class="block text-sm font-medium text-gray-700 mb-2">Établissement</label>
    <div class="relative">
      <input type="text" placeholder="Chercher un lycée" class="w-full px-4 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  lycees?: Array<{ name: string; city: string; category: string }> | null;
}

defineProps<Props>();
</script>