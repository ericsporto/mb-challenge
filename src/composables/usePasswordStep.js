import { ref } from 'vue';

const usePasswordStep = () => {
  const password = ref('');
  const isPasswordValid = ref(false);

  const passwordError = ref('');

  const handleInputChange = (event) => {
    email.value = event.target.value;
    isPasswordValid.value = false;
  };

  const validateForm = () => {
    let isValid = true;

    passwordError.value = '';

    if (password.value.trim() === '') {
      passwordError.value = 'Senha é obrigatória.';
      isValid = false;
    }

    if (password.value.length < 6) {
      passwordError.value = 'Senha precisa ter pelo menos 6 caracteres.';
      isValid = false;
    }

    return isValid;
  };

  return {
    password,
    passwordError,
    isPasswordValid,
    handleInputChange,
    validateForm,
  };
};

export { usePasswordStep };
