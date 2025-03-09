import { ref } from 'vue';
import { formatCPF, formatCNPJ, formatPhone, validateEmail } from '@/utils/formatters';

const useReviewInformationStep = () => {
  const email = ref('');
  const password = ref('');
  const legalName = ref('');
  const socialName = ref('');
  const cpf = ref('');
  const cnpj = ref('');
  const birthDate = ref('');
  const birthOpened = ref('');
  const phone = ref('');
  const isLoading = ref(false);

  const isLegalNameValid = ref(false);
  const isSocialNameValid = ref(false);
  const isCpfValid = ref(false);
  const isCnpjValid = ref(false);
  const isBirthDateValid = ref(false);
  const isBirthOpenedValid = ref(false);
  const isPhoneValid = ref(false);
  const isPasswordValid = ref(false);
  const isEmailValid = ref(false);

  const socialNameError = ref('');
  const legalNameError = ref('');
  const cpfError = ref('');
  const cnpjError = ref('');
  const birthDateError = ref('');
  const birthOpenedError = ref('');
  const phoneError = ref('');
  const passwordError = ref('');
  const emailError = ref('');

  const inputMappings = {
    email: email,
    password: password,
    legalName: legalName,
    socialName: socialName,
    cpf: cpf,
    cnpj: cnpj,
    birthDate: birthDate,
    birthOpened: birthOpened,
    phone: phone,
  };

  const handleInputChange = (event, fieldName) => {
    let targetValue = event.target.value;

    const onlyNumbers = targetValue.replace(/\D/g, '');

    if (fieldName === 'cpf') {
      targetValue = formatCPF(onlyNumbers);
    } else if (fieldName === 'phone') {
      targetValue = formatPhone(onlyNumbers);
    } else if (fieldName === 'cnpj') {
      targetValue = formatCNPJ(onlyNumbers);
    } else {
      targetValue = onlyNumbers;
    }

    if (inputMappings[fieldName]) {
      inputMappings[fieldName].value = targetValue;
    }
  };


  const validateFormIndividual = () => {
    let isValid = true;

    socialNameError.value = '';
    cpfError.value = '';
    birthDateError.value = '';
    phoneError.value = '';
    passwordError.value = '';
    emailError.value = '';

    if (!email.value || email.value.trim() === '') {
      emailError.value = 'Este campo é obrigatório.';
      isValid = false;
    } else if (!validateEmail(email.value)) {
      emailError.value = 'Digite um e-mail válido.';
      isValid = false;
    }

    if (password.value.trim() === '') {
      passwordError.value = 'Senha é obrigatória.';
      isValid = false;
    }

    if (password.value.length < 6) {
      passwordError.value = 'Senha precisa ter pelo menos 6 caracteres.';
      isValid = false;
    }

    if (!socialName.value.trim()) {
      socialNameError.value = 'Nome é obrigatório.';
      isValid = false;
    }

    if (!cpf.value.trim()) {
      cpfError.value = 'CPF é obrigatório.';
      isValid = false;
    } else if (cpf.value.replace(/\D/g, '').length !== 11) {
      cpfError.value = 'CPF inválido.';
      isValid = false;
    }

    if (!birthDate.value) {
      birthDateError.value = 'Data de nascimento é obrigatória.';
      isValid = false;
    }

    if (!phone.value.trim()) {
      phoneError.value = 'Telefone é obrigatório.';
      isValid = false;
    } else if (phone.value.replace(/\D/g, '').length < 10) {
      phoneError.value = 'Telefone inválido.';
      isValid = false;
    }

    return isValid;
  };
  const validateFormLegal = () => {
    let isValid = true;

    legalNameError.value = '';
    cnpjError.value = '';
    birthOpenedError.value = '';
    phoneError.value = '';
    passwordError.value = '';
    emailError.value = '';

    if (!email.value || email.value.trim() === '') {
      emailError.value = 'Este campo é obrigatório.';
      isValid = false;
    } else if (!validateEmail(email.value)) {
      emailError.value = 'Digite um e-mail válido.';
      isValid = false;
    }

    if (password.value.trim() === '') {
      passwordError.value = 'Senha é obrigatória.';
      isValid = false;
    }

    if (password.value.length < 6) {
      passwordError.value = 'Senha precisa ter pelo menos 6 caracteres.';
      isValid = false;
    }

    if (!legalName.value.trim()) {
      legalNameError.value = 'Razão social é obrigatório.';
      isValid = false;
    }

    if (!cnpj.value.trim()) {
      cnpjError.value = 'CNPJ é obrigatório.';
      isValid = false;
    } else if (cnpj.value.replace(/\D/g, '').length !== 14) {
      cnpjError.value = 'CNPJ inválido.';
      isValid = false;
    }

    if (!birthOpened.value) {
      birthOpenedError.value = 'Data de abertura é obrigatória.';
      isValid = false;
    }

    if (!phone.value.trim()) {
      phoneError.value = 'Telefone é obrigatório.';
      isValid = false;
    } else if (phone.value.replace(/\D/g, '').length < 10) {
      phoneError.value = 'Telefone inválido.';
      isValid = false;
    }

    return isValid;
  };

  const showToast = (message, isSuccess) => {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '5px';
    toast.style.fontSize = '16px';
    toast.style.color = '#fff';
    toast.style.backgroundColor = isSuccess ? 'green' : 'red';
    toast.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.2)';
    toast.style.opacity = '1';
    toast.style.transition = 'opacity 0.5s ease-in-out';

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        toast.remove();
      }, 500);
    }, 3000);
  };

  return {
    handleInputChange,
    legalName,
    socialName,
    cpf,
    cnpj,
    birthDate,
    birthOpened,
    phone,
    email,
    password,
    emailError,
    passwordError,
    isEmailValid,
    isPasswordValid,
    isLegalNameValid,
    isSocialNameValid,
    isCpfValid,
    isCnpjValid,
    isBirthDateValid,
    isBirthOpenedValid,
    isPhoneValid,
    socialNameError,
    legalNameError,
    cpfError,
    cnpjError,
    birthDateError,
    birthOpenedError,
    phoneError,
    isLoading,
    showToast,
    validateFormIndividual,
    validateFormLegal,
  };
};

export { useReviewInformationStep };
