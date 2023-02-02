<template>
  <div class="card p-5 shadow-m">
    <slot name="default" />
  </div>
</template>

<style scoped>
.card {
  background-color: var(--white);
  border-radius: 0.5rem;
}
</style>
