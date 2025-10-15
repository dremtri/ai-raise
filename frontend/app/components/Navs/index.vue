<template>
  <div class="nav-container">
    <header class="nav-wrapper">
      <NuxtLink to="/" aria-label="Back to home" class="logo">
        <img src="/logo.png" alt="AiRaise Logo" width="32" height="32" class="logo-icon" />
        <span class="logo-text">AiRaise</span>
      </NuxtLink>
      <nav class="nav-list">
        <NuxtLink to="/pinyin" class="nav-item">
          文字注音
        </NuxtLink>
      </nav>
      <div class="nav-other">
      </div>
    </header>
  </div>
</template>

<style lang="scss" scoped>
.nav-container {
  background-color: var(--raise-nav-bg);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--raise-border-bottom);
  height: 64px;
}

.nav-wrapper {
  @apply max-w-[var(--raise-container)] h-full flex items-center justify-between px-4 mx-auto;
  gap: 2rem;
}

.logo {
  @apply flex items-center gap-2;
  text-decoration: none;
  .logo-icon {
    @apply w-8 h-8;
    border-radius: 50%;
  }

  .logo-text {
    font-size: 1.3rem;
    @apply font-bold;
  }
}

.nav-list {
  @apply flex items-center gap-6 flex-1 justify-center;
}

.nav-item {
  @apply hover:text-primary;
  text-decoration: none;
}

.nav-other {
  @apply flex items-center gap-3;
}
</style>
