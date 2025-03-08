import { ref } from 'vue';

const validateEmail = (email) => {
  const value = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return value.test(email);
};

const useWelcomeStep = () => {
  const email = ref('');
  const normalPersonChecked = ref(false);
  const legalPersonChecked = ref(false);
  const isEmailValid = ref(false);
  const isCheckboxValid = ref(false);

  const emailError = ref('');
  const radioError = ref('');

  const handleInputChange = (event) => {
    email.value = event.target.value;
    isEmailValid.value = false;
  };

  const handleCheckboxChange = (type) => {
    if (type === 'normal') {
      normalPersonChecked.value = true;
      legalPersonChecked.value = false;
    } else if (type === 'legal') {
      legalPersonChecked.value = true;
      normalPersonChecked.value = false;
    }
    isCheckboxValid.value = normalPersonChecked.value || legalPersonChecked.value;
  };

  const validateForm = () => {
    let isValid = true;

    emailError.value = '';
    radioError.value = '';

    if (!email.value || email.value.trim() === '') {
      emailError.value = 'Este campo é obrigatório.';
      isValid = false;
    } else if (!validateEmail(email.value)) {
      emailError.value = 'Digite um e-mail válido.';
      isValid = false;
    }

    if (!normalPersonChecked.value && !legalPersonChecked.value) {
      radioError.value = 'Por favor, selecione uma opção.';
      isValid = false;
    }

    return isValid;
  };

  return {
    email,
    normalPersonChecked,
    legalPersonChecked,
    emailError,
    radioError,
    isEmailValid,
    isCheckboxValid,
    handleInputChange,
    handleCheckboxChange,
    validateForm,
  };
};

export { useWelcomeStep };
