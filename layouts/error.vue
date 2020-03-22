<template>
  <div class="error-page">
    <h1>Oops, Something went wrong!</h1>
    <p>Back to <a href="/">Home</a>!</p>
  </div>
</template>

<script>
export default {
  layout: (context) => {
    if (context.store.getters.isAuthenticated) {
      return 'default'
    } else {
      return 'auth'
    }
  }
}
</script>
