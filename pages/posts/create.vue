<template>
  <div class="new-post-page">
    <section class="post-form">
      <PostForm @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import PostForm from '@/components/UI/PostForm'

export default {
  middleware: ['auth'],
  components: {
    PostForm
  },
  methods: {
    onSubmitted (postData) {
      this.$store.dispatch('addPost', postData)
        .then(() => {
          this.$router.push('/')
        })
    }
  }
}
</script>
