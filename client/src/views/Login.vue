<template>
  <v-container>
    <v-layout align-center justify-center column fill-height >
      <v-flex lg12>
        <h2>Login</h2>
        <v-form
          ref="loginForm"
          v-model="valid"
          lazy-validation
          style="width: 300px;"
          @submit.prevent="validate; login()"
        >

          <v-text-field
            v-model="emailInput"
            :rules="emailInputRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="passwordInput"
            type="password"
            :rules="passwordInputRules"
            label="Password"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="primary"
            type="submit"
          >
            Login
          </v-btn>
        </v-form>
      </v-flex>
      <v-flex lg12>
        <span>Not a member? <router-link to="/users/register">Register</router-link></span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from '../api/axios'
import Swal from 'sweetalert2'

export default {
  data: () => ({
    valid: true,
    emailInput: '',
    emailInputRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    passwordInput: '',
    passwordInputRules: [
      v => !!v || 'Password is required'
    ]
  }),

  methods: {
    validate () {
      if (this.$refs.loginForm.validate()) {
        this.snackbar = true
      }
    },
    reset () {
      this.$refs.loginForm.reset()
    },
    resetValidation () {
      this.$refs.loginForm.resetValidation()
    },
    login () {
      let credentials = {
        email: this.emailInput,
        password: this.passwordInput
      }
      this.$store.dispatch("login", credentials)
    }
  }
}
</script>
