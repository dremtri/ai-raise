<template>
  <main>
    <Navs class="h-[5rem] relative lt-sm:(h-[4.333rem])" />
    <slot class="mx-0 my-a max-w-960 w-100% relative" />
  </main>
</template>

<style lang="scss" scoped>
@media (max-width: 960px) {
  .suspension-panel {
    display: none;
  }
}
</style>
