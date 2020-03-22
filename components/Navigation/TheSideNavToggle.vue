<template>
  <div
    @click="$emit('toggle')"
    class="toggle-item"
    role="button"
  >
    <div class="bar" />
    <div class="bar" />
    <div class="bar" />
  </div>
</template>
