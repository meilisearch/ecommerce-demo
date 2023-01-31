
<template>
  <nav class="navbar p-5">
    <BaseLogo class="mr-5" />
    <SearchInput class="mr-5" />
    <TwitterIcon class="social-icon mr-5" />
    <GithubIcon class="social-icon" />
  </nav>
</template>

<style>
.navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--white);
}

.social-icon {
  width: 2.5rem;
}

.social-icon path {
  fill: var(--ashes-900);
}
</style>
