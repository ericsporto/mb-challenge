<script setup lang="js">

const props = defineProps({
  label: String,
  variant: 'primary' | 'secondary',
  type: String,
})
</script>

<template>
  <button :type="props.type" :class="props.variant === 'primary' ? 'primary' : 'secondary'">
    {{ label }}
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
  background-color: #d78c1b;
  transition: ease-in-out 0.2s;
}
.secondary {
  background-color:  var(--color-bg);
  color: var(--color-primary);
  font-weight: 500;
  border: 1px solid var(--color-primary);
  border-radius: 5px;
}
.secondary:hover {
  background-color: #f4f4f4;
  transition: ease-in-out 0.2s;
}
</style>