<template>
  <button
    :class="btnStyle"
    v-bind="$attrs"
    v-on="$listeners"
    class="button"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    btnStyle: {
      type: String,
      default: ''
    }
  }
}
</script>
