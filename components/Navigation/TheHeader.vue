<template>
  <div class="header-container">
    <header class="header">
      <TheSideNavToggle @toggle="$emit('sidenavToggle')" />
      <div class="logo">
        <nuxt-link to="/">
          Admin SPA
        </nuxt-link>
      </div>
      <div class="spacer" />
      <div class="navigation-items">
        <ul class="nav-list">
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
    </header>
  </div>
</template>

<script>
import TheSideNavToggle from '@/components/Navigation/TheSideNavToggle'

export default {
  name: 'TheHeader',
  components: {
    TheSideNavToggle
  }
}
</script>
