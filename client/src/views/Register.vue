<template>
  <v-container>
    <v-layout align-center justify-center column fill-height >
      <v-flex lg12>
        <h2>Register</h2>
        <v-form
          ref="registrationForm"
          v-model="valid"
          lazy-validation
          style="width: 300px;"
        >

          <v-text-field
            v-model="emailInput"
            :rules="emailInputRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="nameInput"
            :rules="nameInputRules"
            label="Name"
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
            @click="validate; login()"
          >
            Submit
          </v-btn>
        </v-form>
      </v-flex>
      <v-flex lg12>
        <span>Already a member? <router-link to="/users/login">Login</router-link></span>
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
    nameInput: '',
    nameInputRules: [
      v => !!v || 'Name is required'
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
    login () {
      axios.post('users/register', {
        email: this.emailInput,
        name: this.nameInput,
        password: this.passwordInput
      })
      .then(({ data }) => {
        Swal.fire({
          type: 'success',
          showConfirmButton: false,
          timer: 1000
        })
        this.$router.push({ name: 'login' })
      })
      .catch(err => {
        let errorMessage = ''
        if (err.response.data.errors) {
          for (let key in err.response.data.errors) {
            errorMessage += err.response.data.errors[key] + '\n'
          }
        }
        Swal.fire({
          type: 'error',
          text: errorMessage,
          showConfirmButton: true,
          timer: 1000
        })
        console.log(err.response.data.errors)
      })
    }
  }
}
</script>
