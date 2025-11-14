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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--raise-border-bottom);
  height: 64px;
}

.nav-wrapper {
  @apply max-w-(--raise-container) h-full px-4 mx-auto;
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  align-items: center;
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
  @apply flex items-center gap-6;
  justify-content: center;
}

.nav-item {
  @apply hover:text-primary transition-colors;
  text-decoration: none;

  &.router-link-active {
    @apply text-primary font-semibold;
  }
}

.nav-other {
  @apply flex items-center gap-3;
}
</style>
