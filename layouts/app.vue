<template>
  <div id="app">
    <b-navbar toggleable="md" type="light" class="bg-white shadow-sm">
      <b-navbar-brand to="/">
        JS Web App
      </b-navbar-brand>
      <b-navbar-toggle target="#nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- left side of navbar -->
        <b-navbar-nav class="mr-auto"> </b-navbar-nav>

        <!-- right side of navbar -->
        <b-navbar-nav class="ml-auto">
          <div v-if="!$store.state.auth">
            <b-nav-item href="#">
              <b-nav-item to="login">Login</b-nav-item>
            </b-nav-item>
          </div>
          <div v-else>
            <b-nav-item-dropdown right>
              <template v-slot:button-content>
                Username <span class="caret"></span>
              </template>
              <b-dropdown-item to="logout">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <main class="py-4">
      <nuxt />
    </main>
  </div>
</template>