<script setup lang="js">
const props = defineProps({
    message: String,
})
</script>

<template>
  <span class="error-message">
    {{ props.message }}
  </span>
</template>

<style scoped></style>
