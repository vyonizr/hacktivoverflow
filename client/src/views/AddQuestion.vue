<template>
  <v-container>
    <v-layout align-center justify-center row fill-height >
      <v-flex lg8>
        <h2>What do you want to ask?</h2>
        <v-form
          ref="questionForm"
          v-model="valid"
          lazy-validation
          @submit.prevent="validate; createAQuestion()"
        >

          <v-text-field
            v-model="titleInput"
            :rules="titleInputRules"
            label="Title"
            required
          ></v-text-field>

          <v-textarea
            v-model="descriptionInput"
            :rules="descriptionInputRules"
            solo
            name="input-7-4"
            label="Description"
          ></v-textarea>

          <v-btn
            :disabled="!valid"
            color="primary"
            type="submit"
          >
            Submit
          </v-btn>
        </v-form>
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
    titleInput: '',
    titleInputRules: [
      v => !!v || 'Title is required'
    ],
    descriptionInput: '',
    descriptionInputRules: [
      v => !!v || 'Description is required'
    ]
  }),

  methods: {
    validate () {
      if (this.$refs.questionForm.validate()) {
        this.snackbar = true
      }
    },
    createAQuestion () {
      axios.post('questions/', {
        title: this.titleInput,
        description: this.descriptionInput,
      }, {
        headers: {
          authentication: localStorage.getItem("token")
        }
      })
      .then(({ data }) => {
        Swal.fire({
          type: 'success',
          showConfirmButton: false,
          timer: 1000
        })

        this.$store.dispatch("getAllQuestions")

        this.$router.push({ name: 'home' })
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
