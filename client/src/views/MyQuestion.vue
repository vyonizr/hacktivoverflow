<template>
    <v-container>
      <v-layout
        v-for="question in this.$store.state.myQuestions" :key="question._id"
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
</template>

<script>
import QuestionFeed from '../components/QuestionFeed'

export default {
  components: {
    QuestionFeed
  }
}
</script>

<style>
.no-style{
  text-decoration: none;
  color: inherit;
}
</style>