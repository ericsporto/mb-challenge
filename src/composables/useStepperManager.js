import { ref } from 'vue';

const useStepperManager = () => {
  const steps = ref({
    stepOne: true,
    stepTwo: false,
    stepThree: false,
    stepFour: false,
  });
  const stepChange = (step) => {
    switch (step) {
      case 1:
        steps.value = {
          stepOne: true,
          stepTwo: false,
          stepThree: false,
          stepFour: false,
        };
        break;
      case 2:
        steps.value = {
          stepOne: false,
          stepTwo: true,
          stepThree: false,
          stepFour: false,
        };
        break;
      case 3:
        steps.value = {
          stepOne: false,
          stepTwo: false,
          stepThree: true,
          stepFour: false,
        };
        break;
      case 4:
        steps.value = {
          stepOne: false,
          stepTwo: false,
          stepThree: false,
          stepFour: true,
        };
        break;
      default:
        break;
    }
  };
  return { stepChange, steps };
};

export { useStepperManager };