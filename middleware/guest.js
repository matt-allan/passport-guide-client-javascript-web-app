export default function({ store, redirect }) {
  // If the user is authenticated redirect to dashboard
  if (store.state.auth) {
    return redirect('/dashboard')
  }
}
