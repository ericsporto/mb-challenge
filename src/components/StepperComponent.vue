<script setup lang="js">
const props = defineProps({
stepNumber: Number
})
</script>

<template>
  <p>
    Etapa <span class="primary-color">{{ props.stepNumber }}</span> de 4
  </p>
</template>

<style scoped></style>
