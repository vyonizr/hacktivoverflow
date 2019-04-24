<template>
  <v-toolbar app dark class="grey darken-3">
    <router-link to="/" style="text-decoration: none; color: inherit;">
      <v-toolbar-title class="headline text-uppercase mx-3">
          <span>Hacktiv</span>
          <span class="font-weight-light">Overflow</span>
      </v-toolbar-title>
    </router-link>
    <v-toolbar-items v-if="this.$store.state.token !== null" class="hidden-sm-and-down">
      <v-btn
        :ripple="false"
        to="/myquestions"
        flat
      >
        <span>My questions</span>
      </v-btn>
      <v-btn
        v-if="this.$store.state.token !== null"
        :ripple="false"
        to="/questions/ask"
        flat
      >
        <v-icon>live_help</v-icon>Ask
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items v-if="this.$store.state.token === null" class="hidden-sm-and-down">
      <v-btn
        :ripple="false"
        to="/users/login"
        flat
      >
        <span>Login</span>
      </v-btn>
      <v-btn
        :ripple="false"
        to="/users/register"
        flat
      >
        <span>Register</span>
      </v-btn>
    </v-toolbar-items>

    <v-toolbar-items v-else class="hidden-sm-and-down">
      <v-btn
        v-if="this.$store.state.token !== null"
        :ripple="false"
        flat
      >
        <v-icon>person</v-icon>{{ this.$store.state.currentUserName }}
      </v-btn>
      <v-btn
        v-if="this.$store.state.token !== null"
        :ripple="false"
        @click="logout()"
        flat
      >
        <span>Logout</span>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout")
    }
  }
}
</script>

<style>
.no-style{
  text-decoration: none;
  color: inherit;
}
</style>