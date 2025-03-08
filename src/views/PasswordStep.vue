<script setup lang="js">
import { onBeforeMount } from 'vue';
import StepperComponent from '@/components/StepperComponent.vue';
import TitleComponent from '@/components/TitleComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import { useWelcomeStep } from '@/composables/useWelcomeStep';
import { usePasswordStep } from '@/composables/usePasswordStep';
import { useStepperManager } from '@/composables/useStepperManager';

const {stepChange, steps} = useStepperManager()

const {
  password,
  passwordError,
  handleInputChange,
  validateForm
} = usePasswordStep();

const emit = defineEmits(['stepChange']);

onBeforeMount(() => {
  password.value = localStorage.getItem('password') || '';
  const savedStep = localStorage.getItem('step');
  stepChange(Number(savedStep))
});

const handleSubmit = async () => {
  const isValid = validateForm();

  if (!isValid) return;

  localStorage.setItem('password', password.value);
  localStorage.setItem('step', "4");

  emit('stepChange');
};

const handleBack = () => {
  localStorage.setItem('step', "2")
  emit('stepChangeBack');
}
</script>

<template>
  <div class="form-container">
    <div class="form-header">
      <StepperComponent :stepNumber="3" />
      <TitleComponent title="Senha de acesso" />
    </div>
    <form @submit.prevent="handleSubmit" novalidate>
      <div class="form-input-field">
        <InputComponent
          label="Sua senha"
          type="text"
          id="password"
          :value="password"
          v-model="password"
          @input="handleInputChange"
          :alertMessage="passwordError"
          :hasAlert="!!passwordError"
        />
        <div class="button-container">
          <ButtonComponent
            @click="handleBack"
            label="Voltar"
            variant="secondary"
            type="button"
          />
          <ButtonComponent label="Continuar" variant="primary" type="submit" />
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.radio-container {
  display: flex;
  flex-direction: column;
}
.radio-container > * {
  padding: 5px 0 0 0;
}

.radio-wrapper {
  display: flex;
}
</style>
