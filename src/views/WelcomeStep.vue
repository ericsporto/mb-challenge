<script setup lang="js">
import { onBeforeMount } from 'vue';
import StepperComponent from '@/components/StepperComponent.vue';
import TitleComponent from '@/components/TitleComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import { useWelcomeStep } from '@/composables/useWelcomeStep';

const {
  email,
  emailError,
  normalPersonChecked,
  legalPersonChecked,
  radioError,
  handleInputChange,
  handleCheckboxChange,
  validateForm
} = useWelcomeStep();

const emit = defineEmits(['stepChange']);

onBeforeMount(() => {
  const savedEmail = localStorage.getItem('email');
  const savedIsLegalPerson = localStorage.getItem('isLegalPerson');

  if (savedEmail) {
    email.value = savedEmail;
  }

  if (savedIsLegalPerson === 'true') {
    legalPersonChecked.value = true;
    normalPersonChecked.value = false;
  } else if (savedIsLegalPerson === 'false') {
    normalPersonChecked.value = true;
    legalPersonChecked.value = false;
  }
});

const handleSubmit = async () => {
  const isValid = validateForm();

  if (!isValid) return;

  localStorage.setItem('email', email.value);
  localStorage.setItem('isLegalPerson', legalPersonChecked.value);
  localStorage.setItem('isNormalPerson', normalPersonChecked.value);
  localStorage.setItem('step', "2");

  emit('stepChange');
};
</script>

<template>
  <div class="form-container">
    <div class="form-header">
      <StepperComponent :stepNumber="1" />
      <TitleComponent title="Seja bem vindo(a)" />
    </div>
    <form @submit.prevent="handleSubmit" novalidate>
      <div class="form-input-field">
        <InputComponent
          label="Endereço de e-mail"
          type="text"
          id="email"
          :value="email"
          v-model="email"
          @input="handleInputChange"
          :alertMessage="emailError"
          :hasAlert="!!emailError"
        />
        <div class="radio-container">
          <div class="radio-wrapper">
            <InputComponent
              label="Pessoa física"
              type="radio"
              id="normal-person"
              :checked="normalPersonChecked"
              v-model="normalPersonChecked"
              @change="handleCheckboxChange('normal')"
            />
            <InputComponent
              label="Pessoa jurídica"
              type="radio"
              id="legal-person"
              :checked="legalPersonChecked"
              v-model="legalPersonChecked"
              @change="handleCheckboxChange('legal')"
            />
          </div>
          <div v-if="radioError" class="error-message">{{ radioError }}</div>
        </div>
        <div>
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
