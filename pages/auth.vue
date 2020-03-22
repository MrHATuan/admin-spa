<template>
  <div class="login-page">
    <div class="login-container">
      <h3 class="login-header">
        {{ isLogin ? 'Signup' : 'Signin' }}
      </h3>
      <form @submit.prevent="onSubmit">
        <AppInput v-if="!isLogin" v-model="username" type="text">
          Username
        </AppInput>
        <AppInput v-model="email" type="email">
          E-Mail Address
        </AppInput>
        <AppInput v-model="password" type="password">
          Password
        </AppInput>
        <AppButton type="submit">
          {{ isLogin ? 'Login' : 'Sign Up' }}
        </AppButton>
        <AppButton
          @click="isLogin = !isLogin"
          type="button"
          btn-style="inverted"
          style="margin-left: 10px"
        >
          Switch to {{ isLogin ? 'Signup' : 'Login' }}
        </AppButton>
      </form>
    </div>
  </div>
</template>

<script>
import AppInput from '@/components/UI/AppInput'
import AppButton from '@/components/UI/AppButton'

export default {
  name: 'LoginPage',
  layout: 'auth',
  middleware: ['loginAuth'],
  components: {
    AppInput,
    AppButton
  },
  data () {
    return {
      isLogin: true,
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit () {
      const param = {
        isLogin: this.isLogin,
        email: this.email,
        password: this.password
      }
      if (!this.isLogin) {
        param.username = this.username
      }

      this.$store.dispatch('authenticateUser', param)
        .then(() => {
          this.$router.push('/')
        })
    }
  }
}
</script>
