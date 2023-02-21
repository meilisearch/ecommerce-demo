<script lang="ts" setup>
import GithubIcon from '~/components/atoms/GithubIcon.vue'
import TwitterIcon from '~/components/atoms/TwitterIcon.vue'

const props = defineProps<{
  url: string
  icon: 'github' | 'twitter'
}>()

const iconComponent = computed(() => {
  const icon = toRef(props, 'icon')
  switch (icon.value) {
    case 'github':
      return GithubIcon
    case 'twitter':
      return TwitterIcon
  }
})
</script>

<template>
  <a :href="url" target="_blank" class="social-link">
    <component :is="iconComponent" class="social-icon" height="36" width="36" />
  </a>
</template>

<style>
.social-link {
  display: inline-flex;
}

.social-link .social-icon path {
  fill: var(--ashes-900);
}

.social-link:hover .social-icon path {
  fill: var(--dodger-blue-500)
}
</style>
