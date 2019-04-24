<template>
  <div>
    <div v-if="this.$store.state.token === null">
      <Welcome/>
    </div>
    <div v-else>
        <v-container>
          <v-layout
            v-for="question in this.$store.state.questions" :key="question._id"
            align-center justify-center
            row
            wrap
            ma-2
          >
            <QuestionFeed
              :question="question"
            />
          </v-layout>
        </v-container>
    </div>
  </div>
</template>

<script>
  import Welcome from '../components/Welcome'
  import QuestionFeed from '../components/QuestionFeed'

  export default {
    components: {
      Welcome,
      QuestionFeed
    },
    created() {
      this.$store.dispatch('getAllQuestions')
    }
  }
</script>
