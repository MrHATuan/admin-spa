<template>
  <div class="index-page">
    <PostList :posts="postsList" />
  </div>
</template>

<script>
import PostList from '@/components/UI/PostList'

export default {
  middleware: ['auth'],
  components: {
    PostList
  },
  computed: {
    postsList () {
      return this.$store.getters.postsList
    }
  },
  asyncData (context) {
    return context.store.dispatch('fetchPost')
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
