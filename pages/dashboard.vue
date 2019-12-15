<template>
  <b-container>
    <b-row align-v="center">
      <b-col md="8">
        <b-card header="Dashboard">
          You are logged in!
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  layout: 'app',
  middleware: 'auth'
}
</script>