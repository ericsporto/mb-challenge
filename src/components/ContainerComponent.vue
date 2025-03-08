<script setup lang="js"></script>

<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .container {
    max-width: 100%;
    padding: 12px;
  }
}
</style>
