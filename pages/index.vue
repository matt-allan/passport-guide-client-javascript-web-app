<template>
  <div class="content">
    <Logo />
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  layout: 'app',
  middleware: 'guest',
  components: {
    Logo
  }
}
</script>

<style>
.content {
  text-align: center;
}
</style>
