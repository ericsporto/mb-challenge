<script setup lang="js">
import AlertMessageComponent from '@/components/AlertMessageComponent.vue';

const props = defineProps({
  label: String,
  type: String,
  required: Boolean,
  id: String,
  modelValue: [String, Number, Boolean],
  checked: Boolean,
  maxLength: Number,
  hasAlert: Boolean,
  alertMessage: String

})

const emit = defineEmits(['update:modelValue']);

const handleChange = (event) => {
  const newValue = event.target.value;
  emit('update:modelValue', newValue);
};

</script>

<template>
  <div
    :class="
      props.type === 'radio' ? 'input-radio-container' : 'input-container'
    "
  >
    <label :for="id">{{ props.label }}</label>
    <input
      :checked="props.checked"
      :value="props.modelValue"
      :id="props.id"
      :type="props.type"
      :maxLength="props.maxLength"
      :required="props.required"
      :class="props.type === 'radio' ? 'radio-input' : 'input'"
      @change="handleChange"
      autocomplete="off"
    />
    <AlertMessageComponent
      v-if="props.hasAlert"
      :message="props.alertMessage"
    />
  </div>
</template>

<style scoped>
.input-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: start;
}

.input-radio-container {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: start;
  margin: 0;
  gap: 5px;
  width: 100%;
}

.input {
  height: 40px;
  outline: none;
  border-radius: 8px;
  padding: 0 8px;
  width: 100%;
}
.radio-input {
  height: 15px;
  outline: none;
  border-radius: 100%;
  width: 20px;
}
</style>
