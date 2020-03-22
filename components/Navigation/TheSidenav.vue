<template>
  <div class="nav-container">
    <div
      v-if="show"
      @click="$emit('close')"
      class="nav-body"
    />
    <transition name="slide-side">
      <div
        v-if="show"
        class="sidenav"
      >
        <ul
          @click="$emit('close')"
          class="nav-list"
        >
          <li class="nav-item">
            <nuxt-link to="/posts/create">
              Create Post
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/logout">
              Logout
            </nuxt-link>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TheSidenav',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>
