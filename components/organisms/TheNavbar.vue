
<template>
  <nav class="p-5 navbar">
    <div class="mobile-nav">
      <div class="mb-5 menu">
        <NuxtLink to="/">
          <BaseLogo />
        </NuxtLink>
        <TwitterIcon class="ml-auto social-icon" />
        <GithubIcon class="ml-2 social-icon" />
      </div>
      <MeiliSearchInput class="mobile-search-bar mr-5" />
    </div>
    <div class="tablet-nav">
      <BaseLogo class="mr-5" />
      <MeiliSearchInput class="tablet-search-bar" />
      <TwitterIcon class="mr-5 social-icon" height="36" width="36" />
      <GithubIcon class="social-icon" height="36" width="36" />
    </div>
  </nav>
</template>

<style>
.navbar {
  background-color: var(--white);
  padding-left: calc(2 * var(--size-5));
  padding-right: calc(2 * var(--size-5));
}

.tablet-nav {
  display: none;
}

.mobile-nav .menu {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.mobile-search-bar {
  width: 100%;
}

@media screen and (min-width: 768px) {
  .tablet-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .tablet-search-bar {
    margin-left: var(--size-5);
    margin-right: var(--size-5);
    flex-grow: 1;
  }
  .mobile-nav {
    display: none;
  }
}

@media screen and (min-width: 1024px) {
  .tablet-search-bar {
    margin-left: calc(4 * var(--size-5));
    margin-right: calc(4 * var(--size-5));
  }
}

.social-icon path {
  fill: var(--ashes-900);
}
</style>
