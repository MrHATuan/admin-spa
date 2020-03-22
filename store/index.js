export const state = () => ({
  postsList: [],
  token: null
})

export const mutations = {
  setPosts (state, posts) {
    state.postsList = posts
  },
  addPost (state, post) {
    state.postsList.push(post)
  },
  editPost (state, editedPost) {
    const postIndex = state.postsList.findIndex(post => post.id === editedPost.id)
    state.postsList[postIndex] = editedPost
  },
  deletePost (state, deletedPost) {
    const postIndex = state.postsList.findIndex(post => post.id === deletedPost.id)
    state.postsList.splice(postIndex, 1)
  },
  setToken (state, token) {
    state.token = token
  },
  clearToken (state) {
    state.token = null
  }
}

export const actions = {
  fetchPost ({ commit }) {
    return this.$axios.$get('/posts.json')
      .then((data) => {
        const postsArray = []
        for (const key in data) {
          postsArray.push({ ...data[key], id: key })
        }
        commit('setPosts', postsArray)
      })
      .catch((e) => {
        console.error(e)
      })
  },
  setPosts ({ commit }, posts) {
    commit('setPosts', posts)
  },
  addPost ({ commit, state }, post) {
    const createdPost = {
      ...post,
      updatedDate: new Date()
    }

    return this.$axios.$post(
      `/posts.json?auth=${state.token}`,
      createdPost
    )
      .then((data) => {
        commit('addPost', { ...createdPost, id: data.name })
      })
      .catch((e) => {
        console.error(e)
      })
  },
  editPost ({ commit, state }, editedPost) {
    return this.$axios.$put(
      `/posts/${editedPost.id}.json?auth=${state.token}`,
      editedPost
    )
      .then((data) => {
        commit('editPost', editedPost)
      })
      .catch((e) => {
        console.error(e)
      })
  },
  deletePost ({ commit, state }, deletedPost) {
    return this.$axios.$delete(`/posts/${deletedPost.id}.json?auth=${state.token}`)
      .then((data) => {
        commit('deletePost', deletedPost)
      })
      .catch((e) => {
        console.error(e)
      })
  },
  authenticateUser ({ commit }, authData) {
    let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIKey}`
    const param = {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    }
    if (!authData.isLogin) {
      authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIKey}`
      param.username = authData.username
    }

    return this.$axios.$post(authUrl, param)
      .then((resuilt) => {
        commit('setToken', resuilt.idToken)
        localStorage.setItem('token', resuilt.idToken)
        localStorage.setItem(
          'tokenExpiration',
          new Date().getTime() + Number.parseInt(resuilt.expiresIn) * 1000
        )
      })
      .catch((e) => {
        console.error(e)
      })
  },
  initAuth ({ dispatch, commit }, req) {
    const token = localStorage.getItem('token')
    const expirationDate = localStorage.getItem('tokenExpiration')

    if (new Date().getTime() > Number.parseInt(expirationDate) || !token) {
      dispatch('logout')
      return
    }

    commit('setToken', token)
  },
  logout ({ commit }) {
    commit('clearToken')

    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpiration')
  }
}

export const getters = {
  postsList (state) {
    return state.postsList
  },
  isAuthenticated (state) {
    return state.token != null
  }
}
