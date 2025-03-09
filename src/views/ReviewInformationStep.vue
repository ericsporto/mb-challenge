<script setup lang="js">
import { onBeforeMount, ref, computed } from 'vue';
import StepperComponent from '@/components/StepperComponent.vue';
import TitleComponent from '@/components/TitleComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import { useReviewInformationStep } from '@/composables/useReviewInformationStep';
import { useStepperManager } from '@/composables/useStepperManager';
import { removeMask } from '@/utils/formatters';
import userRegister from '@/services/register';
import getRegistered from '@/services/getRegistered';

const {stepChange} = useStepperManager()
const isLegalPerson = ref();

const {
  legalName,
  cnpj,
  birthOpened,
  legalNameError,
  cnpjError,
  birthOpenedError,
  socialName,
  cpf,
  birthDate,
  phone,
  socialNameError,
  cpfError,
  birthDateError,
  phoneError,
  email,
  emailError,
  password,
  passwordError,
  isLoading,
  handleInputChange,
  handleKeyPress,
  showToast,
  validateFormLegal,
  validateFormIndividual,
} = useReviewInformationStep();

const emit = defineEmits(['stepChange']);

onBeforeMount(() => {
  const savedIsLegalPerson = localStorage.getItem('isLegalPerson');

  if (savedIsLegalPerson === 'true') {
    isLegalPerson.value = true;
  } else if(savedIsLegalPerson === 'false') {
    isLegalPerson.value = false;
  }
  password.value = localStorage.getItem('password') || '';
  email.value = localStorage.getItem('email') || '';
  legalName.value = localStorage.getItem('legalName') || '';
  socialName.value = localStorage.getItem('socialName') || '';
  cpf.value = localStorage.getItem('cpf') || '';
  cnpj.value = localStorage.getItem('cnpj') || '';
  birthDate.value = localStorage.getItem('birthDate') || '';
  birthOpened.value = localStorage.getItem('birthOpened') || '';
  phone.value = localStorage.getItem('phone') || '';

  const savedStep = localStorage.getItem('step');
  stepChange(Number(savedStep))
});

const currentName = computed({
  get() {
    return isLegalPerson.value ? legalName.value : socialName.value;
  },
  set(value) {
    if (isLegalPerson.value) {
      legalName.value = value;
    } else {
      socialName.value = value;
    }
  },
});
const currentDocument = computed({
  get() {
    return isLegalPerson.value ? cnpj.value : cpf.value;
  },
  set(value) {
    if (isLegalPerson.value) {
      cnpj.value = value;
    } else {
      cpf.value = value;
    }
  },
});
const currentDate = computed({
  get() {
    return isLegalPerson.value ? birthOpened.value : birthDate.value;
  },
  set(value) {
    if (isLegalPerson.value) {
      birthOpened.value = value;
    } else {
      birthDate.value = value;
    }
  },
});

const handleSubmit = async () => {
  const isValid = isLegalPerson.value ? validateFormLegal() : validateFormIndividual();

  if (!isValid) return;

  isLoading.value = true;

  const formData = {
    email: email.value,
    password: password.value,
    phone: removeMask(phone.value),
    legal_name: isLegalPerson.value ? legalName.value : '',
    social_name: !isLegalPerson.value ? socialName.value : '',
    cpf: !isLegalPerson.value ? removeMask(cpf.value) : '',
    cnpj: isLegalPerson.value ? removeMask(cnpj.value) : '',
    birth_date: !isLegalPerson.value ? birthDate.value : '',
    birth_opened: isLegalPerson.value ? birthOpened.value : '',
  };

  const filteredData = Object.fromEntries(
    Object.entries(formData).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
  );

  setTimeout(async () => {
    const response = await userRegister(filteredData);
    isLoading.value = false;
    showToast(response.message, response.success);

    setTimeout(() => {
      if (response.success) {
        getRegistered();
      }
      localStorage.clear()
      localStorage.setItem('step', "1");
      emit('stepChange');
    }, 1500)
  }, 1000);

};

const handleBack = () => {
  localStorage.setItem('step', "3")
  emit('stepChangeBack');
}
</script>

<template>
  <div class="form-container">
    <div class="form-header">
      <StepperComponent :stepNumber="4" />
      <TitleComponent title="Revise suas informações" />
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
        <InputComponent
          :label="isLegalPerson ? 'Razão social' : 'Nome'"
          type="text"
          :id="isLegalPerson ? 'legalName' : 'socialName'"
          :value="isLegalPerson ? legalName : socialName"
          v-model="currentName"
          @input="handleInputChange"
          :alertMessage="isLegalPerson ? legalNameError : socialNameError"
          :hasAlert="isLegalPerson ? !!legalNameError : !!socialNameError"
        />
        <InputComponent
          :label="isLegalPerson ? 'CNPJ' : 'CPF'"
          type="text"
          :id="isLegalPerson ? 'cnpj' : 'cpf'"
          :value="isLegalPerson ? cnpj : cpf"
          v-model="currentDocument"
          @keypress="handleKeyPress"
          @input="
            isLegalPerson
              ? handleInputChange($event, 'cnpj')
              : handleInputChange($event, 'cpf')
          "
          :alertMessage="isLegalPerson ? cnpjError : cpfError"
          :hasAlert="isLegalPerson ? !!cnpjError : !!cpfError"
        />
        <InputComponent
          :label="isLegalPerson ? 'Data de abertura' : 'Data de nascimento'"
          type="date"
          :id="isLegalPerson ? 'birthOpened' : 'birthDate'"
          :value="isLegalPerson ? birthOpened : birthDate"
          v-model="currentDate"
          @input="handleInputChange"
          :alertMessage="isLegalPerson ? birthOpenedError : birthDateError"
          :hasAlert="isLegalPerson ? !!birthOpenedError : !!birthDateError"
        />
        <InputComponent
          label="Telefone"
          type="text"
          id="phone"
          :value="phone"
          v-model="phone"
          @keypress="handleKeyPress"
          @input="handleInputChange($event, 'phone')"
          :alertMessage="phoneError"
          :hasAlert="!!phoneError"
        />
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
          <ButtonComponent
            label="Continuar"
            variant="primary"
            type="submit"
            :isLoading="isLoading"
          />
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
