<template>
  <section class="post-list">
    <nuxt-link
      v-for="post in posts"
      :key="post.id"
      :to="`/posts/edit/?id=${post.id}`"
      class="post-preview"
    >
      <article>
        <div
          :style="{backgroundImage: `url(${post.thumbnail})`}"
          class="post-thumbnail"
        />
        <div class="post-content">
          <h1>{{ post.title }}</h1>
          <p>{{ post.description }}</p>
        </div>
      </article>
    </nuxt-link>
  </section>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>
