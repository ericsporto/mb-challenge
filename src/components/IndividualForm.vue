<script setup lang="js">
import { onBeforeMount } from 'vue';
import StepperComponent from '@/components/StepperComponent.vue';
import TitleComponent from '@/components/TitleComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import { useDataStep } from '@/composables/useDataStep';
import { useStepperManager } from '@/composables/useStepperManager';

const { stepChange } = useStepperManager()

const {
  socialName,
  cpf,
  birthDate,
  phone,
  socialNameError,
  cpfError,
  birthDateError,
  phoneError,
  handleInputChange,
  handleKeyPress,
  validateFormIndividual,
} = useDataStep();

const emit = defineEmits(['stepChange', 'stepChangeBack']);

onBeforeMount(() => {
  socialName.value = localStorage.getItem('socialName') || '';
  cpf.value = localStorage.getItem('cpf') || '';
  birthDate.value = localStorage.getItem('birthDate') || '';
  phone.value = localStorage.getItem('phone') || '';
  const savedStep = localStorage.getItem('step');
  stepChange(Number(savedStep))
});

const handleSubmit = async () => {
  const isValid = validateFormIndividual();

  if (!isValid) return;

  localStorage.setItem('socialName', socialName.value);
  localStorage.setItem('cpf', cpf.value);
  localStorage.setItem('birthDate', birthDate.value);
  localStorage.setItem('phone', phone.value);
  localStorage.setItem('step', "3");

  emit('stepChange');
};

const handleBack = () => {
  localStorage.setItem('step', "1")
  emit('stepChangeBack');
}
</script>

<template>
  <div class="form-container">
    <div class="form-header">
      <StepperComponent :stepNumber="2" />
      <TitleComponent title="Pessoa Física" />
    </div>
    <form @submit.prevent="handleSubmit" novalidate>
      <div class="form-input-field">
        <InputComponent
          label="Nome"
          type="text"
          id="email"
          :value="socialName"
          v-model="socialName"
          @input="handleInputChange"
          :alertMessage="socialNameError"
          :hasAlert="!!socialNameError"
        />
        <InputComponent
          label="CPF"
          type="text"
          id="text"
          :value="cpf"
          v-model="cpf"
          :maxLength="14"
          @keypress="handleKeyPress"
          @input="handleInputChange($event, 'cpf')"
          :alertMessage="cpfError"
          :hasAlert="!!cpfError"
        />
        <InputComponent
          label="Data de nascimento"
          type="date"
          id="date"
          :value="birthDate"
          v-model="birthDate"
          @input="handleInputChange"
          :alertMessage="birthDateError"
          :hasAlert="!!birthDateError"
        />
        <InputComponent
          label="Telefone"
          type="text"
          id="phone"
          :maxLength="15"
          :value="phone"
          v-model="phone"
          @keypress="handleKeyPress"
          @input="handleInputChange($event, 'phone')"
          :alertMessage="phoneError"
          :hasAlert="!!phoneError"
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
