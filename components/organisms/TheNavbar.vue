
<template>
  <nav class="navbar p-5">
    <div class="mobile-nav">
      <div class="menu mb-5">
        <BaseLogo />
        <TwitterIcon class="social-icon ml-auto" />
        <GithubIcon class="social-icon ml-2" />
      </div>
      <SearchInput class="mr-5" />
    </div>
    <div class="desktop-nav">
      <BaseLogo class="mr-5" />
      <SearchInput class="mr-5" />
      <TwitterIcon class="social-icon mr-5" height="36" width="36" />
      <GithubIcon class="social-icon" height="36" width="36" />
    </div>
  </nav>
</template>

<style>
.navbar {
  background-color: var(--white);
}

.desktop-nav {
  display: none;
}

.mobile-nav .menu {
  display: flex;
  flex-direction: row;
  align-items: center;
}

@media screen and (min-width: 768px) {
  .desktop-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .mobile-nav {
    display: none;
  }
  .social-icon {
  }
}

.social-icon path {
  fill: var(--ashes-900);
}
</style>
