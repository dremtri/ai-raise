<template>
  <div class="pt-16">
    <Navs class="h-[5rem] w-full relative" />
    <main class="min-h-[calc(100vh-5rem)]">
      <slot class="mx-0 my-a max-w-[var(--raise-container)] w-100% relative" />
    </main>
  </div>
</template>
