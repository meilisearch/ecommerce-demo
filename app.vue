<script lang="ts" setup>
import { ModalsContainer } from 'vue-final-modal'
</script>

<template>
  <div>
    <GoogleTagManager />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ModalsContainer />
  </div>
</template>
