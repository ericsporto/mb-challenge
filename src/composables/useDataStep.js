import { ref } from 'vue';

const useDataStep = () => {
  const legalName = ref('');
  const socialName = ref('');
  const cpf = ref('');
  const cnpj = ref('');
  const birthDate = ref('');
  const birthOpened = ref('');
  const phone = ref('');

  const socialNameError = ref('');
  const legalNameError = ref('');
  const cpfError = ref('');
  const cnpjError = ref('');
  const birthDateError = ref('');
  const birthOpenedError = ref('');
  const phoneError = ref('');

  const inputMappings = {
    legalName: legalName,
    socialName: socialName,
    cpf: cpf,
    cnpj: cnpj,
    birthDate: birthDate,
    birthOpened: birthOpened,
    phone: phone,
  };

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const formatPhone = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
  };

  const formatCNPJ = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4')
      .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5');
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


  const handleKeyPress = (event) => {
    const key = event.key;
    if (/[^0-9]/.test(key)) {
      event.preventDefault();
    }
  };

  const validateFormIndividual = () => {
    let isValid = true;

    socialNameError.value = '';
    cpfError.value = '';
    birthDateError.value = '';
    phoneError.value = '';

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

  return {
    handleInputChange,
    handleKeyPress,
    legalName,
    socialName,
    cpf,
    cnpj,
    birthDate,
    birthOpened,
    phone,
    socialNameError,
    legalNameError,
    cpfError,
    cnpjError,
    birthDateError,
    birthOpenedError,
    phoneError,
    validateFormIndividual,
    validateFormLegal,
  };
};

export { useDataStep };
