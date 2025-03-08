<script setup lang="js">
const props = defineProps({
title: String
})
</script>

<template>
  <h1>
    {{ props.title }}
  </h1>
</template>

<style scoped></style>
