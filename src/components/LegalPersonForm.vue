<script setup lang="js">
import { onBeforeMount } from 'vue';
import StepperComponent from '@/components/StepperComponent.vue';
import TitleComponent from '@/components/TitleComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import { useDataStep } from '@/composables/useDataStep';
import { useStepperManager } from '@/composables/useStepperManager';

const {stepChange} = useStepperManager()

const {
  legalName,
  cnpj,
  birthOpened,
  phone,
  legalNameError,
  cnpjError,
  birthOpenedError,
  phoneError,
  handleInputChange,
  handleKeyPress,
  validateFormLegal,
} = useDataStep();

const emit = defineEmits(['stepChange', 'stepChangeBack']);

onBeforeMount(() => {
  legalName.value = localStorage.getItem('legalName') || '';
  cnpj.value = localStorage.getItem('cnpj') || '';
  birthOpened.value = localStorage.getItem('birthOpened') || '';
  phone.value = localStorage.getItem('phone') || '';
  const savedStep = localStorage.getItem('step');
  stepChange(Number(savedStep))
});


const handleSubmit = async () => {
  const isValid = validateFormLegal();

  if (!isValid) return;

  localStorage.setItem('legalName', legalName.value);
  localStorage.setItem('cnpj', cnpj.value);
  localStorage.setItem('birthOpened', birthOpened.value);
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
      <TitleComponent title="Pessoa Jurídica" />
    </div>
    <form @submit.prevent="handleSubmit" novalidate>
      <div class="form-input-field">
        <InputComponent
          label="Razão social"
          type="text"
          id="legalName"
          :value="legalName"
          v-model="legalName"
          @input="handleInputChange"
          :alertMessage="legalNameError"
          :hasAlert="!!legalNameError"
        />
        <InputComponent
          label="CNPJ"
          type="text"
          id="cnpj"
          :value="cnpj"
          v-model="cnpj"
          :maxLength="18"
          @input="handleInputChange($event, 'cnpj')"
          @keypress="handleKeyPress"
          :alertMessage="cnpjError"
          :hasAlert="!!cnpjError"
        />
        <InputComponent
          label="Data de abertura"
          type="date"
          id="birthOpened"
          :value="birthOpened"
          v-model="birthOpened"
          @input="handleInputChange"
          :alertMessage="birthOpenedError"
          :hasAlert="!!birthOpenedError"
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
