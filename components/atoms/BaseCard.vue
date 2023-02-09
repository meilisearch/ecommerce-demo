<template>
  <div class="p-5 card shadow-m">
    <slot name="default" />
  </div>
</template>

<style scoped>
.card {
  background-color: var(--white);
  border-radius: 0.5rem;
}
</style>
