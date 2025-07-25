<template>
  <svg :class="iconClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  iconClass?: string;
}

withDefaults(defineProps<Props>(), {
  iconClass: "h-6 w-6",
});
</script>
