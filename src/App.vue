<script setup lang="js">
import { onBeforeMount } from 'vue';
import ContainerComponent from '@/components/ContainerComponent.vue';
import WelcomeStep from '@/views/WelcomeStep.vue';
import DataStep from '@/views/DataStep.vue';
import PasswordStep from '@/views/PasswordStep.vue';
import ReviewInformationStep from '@/views/ReviewInformationStep.vue';
import { useStepperManager } from '@/composables/useStepperManager';

const {stepChange, steps} = useStepperManager()

onBeforeMount(() => {
  const savedStep = localStorage.getItem('step');
  stepChange(Number(savedStep))
});
</script>

<template>
  <ContainerComponent>
    <WelcomeStep v-if="steps.stepOne === true" @stepChange="stepChange(2)" />
    <DataStep
      v-if="steps.stepTwo === true"
      @stepChange="stepChange(3)"
      @stepChangeBack="stepChange(1)"
    />
    <PasswordStep
      v-if="steps.stepThree === true"
      @stepChange="stepChange(4)"
      @stepChangeBack="stepChange(2)"
    />
    <ReviewInformationStep
      v-if="steps.stepFour === true"
      @stepChangeBack="stepChange(3)"
      @stepChange="stepChange(1)"
    />
  </ContainerComponent>
</template>

<style scoped></style>
