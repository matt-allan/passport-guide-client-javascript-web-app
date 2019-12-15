<script>
export default {
  middleware: 'guest',
  mounted() {
    this.login()
  },
  methods: {
    login() {
      this.$store.commit('setAuth', {
        accessToken: 'exampleAccessTokenForTesting'
      })
      this.$router.push('/dashboard')
    }
  }
}
</script>
