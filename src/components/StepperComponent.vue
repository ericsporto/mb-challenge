<script setup lang="js">
const props = defineProps({
stepNumber: Number
})
</script>

<template>
  <p>
    Etapa <span class="primary-color step-number-bold">{{ props.stepNumber }}</span> de 4
  </p>
</template>

<style scoped>
.step-number-bold {
  font-weight: 600;
}
</style>
