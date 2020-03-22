<template>
  <div class="edit-post-page">
    <section class="post-form">
      <PostForm :post="loadedPost" :is-edit="true" @submit="onSubmitted" @delete="onDeleted" />
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
  asyncData (context) {
    const postId = context.query.id ? context.query.id : null
    if (!postId) {
      context.error(404)
      return
    }

    return context.app.$axios.$get(`/posts/${postId}.json`)
      .then((data) => {
        if (!data) {
          context.error(400)
          return
        }
        return {
          loadedPost: { ...data, id: postId }
        }
      })
      .catch((e) => {
        context.error(e)
      })
  },
  beforeCreate () {
    if (!this.$route.query.id) {
      this.$router.push('/')
    }
  },
  methods: {
    onSubmitted (editedPost) {
      this.$store.dispatch('editPost', editedPost)
        .then(() => {
          this.$router.push('/')
        })
    },
    onDeleted (deletedPost) {
      this.$store.dispatch('deletePost', deletedPost)
        .then(() => {
          this.$router.push('/')
        })
    }
  }
}
</script>
