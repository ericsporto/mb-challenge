<script setup lang="js">

const props = defineProps({
  label: String,
  variant: 'primary' | 'secondary',
  type: String,
  isLoading: Boolean
})
</script>

<template>
  <button
    :type="props.type"
    :class="props.variant === 'primary' ? 'primary' : 'secondary'"
  >
    <div v-if="props.isLoading" class="spinner">
      <div class="spinner-inner" />
    </div>
    <div v-else>
      {{ label }}
    </div>
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100%;
  cursor: pointer;
}
.primary {
  background-color: var(--color-primary);
  color: var(--color-bg);
  font-weight: 500;
  border: none;
  border-radius: 5px;
}
.primary:hover {
  background-color: var(--color-button-primary-hover);
  transition: ease-in-out 0.3s;
}
.secondary {
  background-color: var(--color-bg);
  color: var(--color-primary);
  font-weight: 500;
  border: 1px solid var(--color-primary);
  border-radius: 5px;
}
.secondary:hover {
  background-color: var(--color-button-primary-hover);
  color: var(--color-button-secondary-hover);
  transition: ease-in-out 0.3s;
}
.spinner {
  width: 23px;
  height: 23px;
  position: relative;
  margin: 0 auto;
  margin-bottom: 5px;
}

.spinner-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: var(--color-bg);
  border-left-color: var(--color-bg);
  border-right-color: var(--color-bg);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
