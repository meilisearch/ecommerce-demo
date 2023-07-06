<script lang="ts" setup>
import GithubIcon from '~/components/atoms/GithubIcon.vue'
import TwitterIcon from '~/components/atoms/TwitterIcon.vue'
import DiscordIcon from '~/components/atoms/DiscordIcon.vue'
import WebIcon from '~/components/atoms/WebIcon.vue'

const props = defineProps<{
  url: string
  icon: 'discord' | 'github' | 'twitter' | 'web'
}>()

const iconComponent = computed(() => {
  const icon = toRef(props, 'icon')
  switch (icon.value) {
    case 'discord':
      return DiscordIcon
    case 'github':
      return GithubIcon
    case 'twitter':
      return TwitterIcon
    case 'web':
      return WebIcon
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
  color: var(--ashes-900);
}

.social-link:hover {
  color: var(--dodger-blue-500);
}
</style>
