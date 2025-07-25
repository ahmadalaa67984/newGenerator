<template>
  <svg :class="iconClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
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
