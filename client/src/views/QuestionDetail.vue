<template>
  <v-container>
    <v-layout
      row
      wrap
      align-center
      justify-center
    >
      <v-flex xs12 mb-4>
        <h1>
          {{ question.title }}
        </h1>
        <p>
          {{ question.description }}
        </p>
      </v-flex>
      <v-divider light></v-divider>
      <v-flex xs4 text-xs-center mb-4>
        <h3>Post an answer</h3>
        <v-form
          ref="answerForm"
          v-model="valid"
          lazy-validation
          @submit.prevent="validate; createAnAnswer()"
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
            label="Your answer"
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

    <v-layout>
      <v-flex xs12>
        <h2>{{ this.question.answers.length }} Answers </h2>
      </v-flex>
    </v-layout>

    <v-layout
      justify-center
      column
      ma-2
    >
      <v-flex
        xs6
        v-for="answer in this.question.answers" :key="answer._id"
        my-2
      >
        <AnswerCard
          :answer="answer"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from '../api/axios'
import Swal from 'sweetalert2'
import moment from 'moment'
import AnswerCard from '../components/AnswerCard'

export default {
  components: {
    AnswerCard
  },

  data: () => ({
    question: {},
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

  created() {
    this.getAQuestion()
  },

  methods: {
    validate () {
      if (this.$refs.answerForm.validate()) {
        this.snackbar = true
      }
    },
    clearForm() {
      this.titleInput = ''
      this.descriptionInput = ''
    },
    getAQuestion() {
    //   console.log(answer.createdBy);
    // console.log(answer.createdBy._id === $store.state.id);
      axios.get(`/questions/${this.$route.params.questionId}`)
      .then(({ data }) => {
        this.question = data
      })
    },
    createAnAnswer() {
      axios.post(`/answers`, {
        questionId: this.$route.params.questionId,
        title: this.titleInput,
        description: this.descriptionInput
      }, {
        headers: {
          authentication: localStorage.getItem("token")
        }
      })
      .then(({ data }) => {
        this.clearForm()
        this.getAQuestion()
      })
    }
  }
}

</script>
