<script>
import { Auth } from '../../auth'

export default {
  middleware: 'guest',
  mounted() {
    new Auth().makeAuthorizationRequest()
  },
  render() {
    return null
  }
}
</script>
