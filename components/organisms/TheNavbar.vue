<template>
  <nav class="p-5 navbar">
    <div class="mobile-nav">
      <div class="mb-5 menu">
        <NuxtLink to="/">
          <BaseLogo />
        </NuxtLink>
        <SocialLink url="https://github.com/meilisearch/ecommerce-demo" icon="github" title="View the code" class="ml-auto" />
        <SocialLink url="https://www.meilisearch.com/blog/nuxt-ecommerce-search-guide?utm_campaign=ecommerce-demo&utm_source=demo" icon="web" title="Read the guide" class="ml-2" />
      </div>
      <div class="mr-5 mobile-search-bar">
        <slot name="search" />
      </div>
    </div>
    <div class="tablet-nav">
      <BaseLogo class="mr-5" />
      <div class="tablet-search-bar">
        <slot name="search" />
      </div>
      <SocialLink url="https://github.com/meilisearch/ecommerce-demo" icon="github" title="View the code" class="mr-3" />
      <SocialLink url="https://www.meilisearch.com/blog/nuxt-ecommerce-search-guide?utm_campaign=ecommerce-demo&utm_source=demo" icon="web" title="Read the guide" />
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
</style>

