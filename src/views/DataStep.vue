<script setup lang="js">
import { ref } from 'vue';
import { onBeforeMount } from 'vue';
import IndividualForm from '@/components/IndividualForm.vue';
import LegalPersonForm from '@/components/LegalPersonForm.vue';

const isLegalPerson = ref();

onBeforeMount(() => {
  const savedIsLegalPerson = localStorage.getItem('isLegalPerson');

  if (savedIsLegalPerson === 'true') {
    isLegalPerson.value = true;
  } else if(savedIsLegalPerson === 'false') {
    isLegalPerson.value = false;
  }
});
</script>

<template>
  <IndividualForm
    v-if="!isLegalPerson"
    @stepChangeBack="$emit('stepChangeBack')"
    @stepChange="$emit('stepChange')"
  />
  <LegalPersonForm
    v-if="isLegalPerson"
    @stepChangeBack="$emit('stepChangeBack')"
    @stepChange="$emit('stepChange')"
  />
</template>

<style scoped></style>
