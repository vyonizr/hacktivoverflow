<template>
  <v-card>
    <v-flex xs12>
      <v-layout
        row
      >
        <v-flex xs1>
          <v-layout column fill-height text-xs-center>
            <v-flex xs3>
              <v-icon
                class="mx-auto"
              >
                arrow_drop_up
              </v-icon>
            </v-flex>
            <v-flex xs3>
              <span>{{ answer.upvotes.length - answer.downvotes.length }}</span>
            </v-flex>
            <v-flex xs3>
              <v-icon>arrow_drop_down</v-icon>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12>
          <v-card-title>
            <div>
              <h3 class="headline mb-0">{{ answer.title }}</h3>
              <p>{{ answer.description }}</p>
            </div>
          </v-card-title>

          <v-divider light></v-divider>

          <v-card-actions class="pa-3">
            <span class="heading">{{ answer.createdBy.name }}</span>

            <v-spacer></v-spacer>

            <router-link
              :to="{ 
                name: 'editAnswer',
                params: {
                  questionId: this.$route.params.questionId,
                  answerId: answer._id
                }
              }"
              class="no-style"
            >
              <v-icon v-if="answer.createdBy._id === $store.state.currentUserId">
                edit
              </v-icon>
            </router-link>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-card>
</template>

<script>
export default {
  props: ["answer"]
}
</script>