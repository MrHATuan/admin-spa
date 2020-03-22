export default function (context) {
  if (context.store.getters.isAuthenticated && context.route.name === 'auth') {
    context.redirect('/')
  }
}
