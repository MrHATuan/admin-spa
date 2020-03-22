<template>
  <div />
</template>

<script>
export default {
  middleware: ['auth'],
  beforeCreate () {
    this.$store.dispatch('logout')
      .then(() => {
        this.$router.push('/auth')
      })
  }
}
</script>
