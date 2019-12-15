<script>
export default {
  middleware: 'auth',
  mounted() {
    this.logout()
  },
  methods: {
    logout() {
      this.$store.commit('setAuth', null)
      this.$router.push('/')
    }
  }
}
</script>
