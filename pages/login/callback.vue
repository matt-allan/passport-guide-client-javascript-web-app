<script>
import { Auth } from '../../auth'

export default {
  middleware: 'guest',
  async mounted() {
    const response = await new Auth().completeAuthorizationRequest()

    this.$axios.setToken(response.accessToken, 'Bearer')
    this.$store.commit('setAuth', response)
    this.$router.push('/dashboard')
  },
  render() {
    return null
  }
}
</script>
