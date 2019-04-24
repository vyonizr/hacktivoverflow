<template>
      <v-flex xs7 >
        <v-hover>
            <v-card
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 12 : 2}`"

            >
              <v-layout>
                <v-flex xs1>
                  <v-layout column fill-height text-xs-center>
                    <v-flex xs4>
                      <v-icon
                        v-if="voteType === 'upvote'"
                        class="mx-auto"
                        color="orange darken-2"
                        @click="removeUpvoteAQuestion"
                      >
                        arrow_drop_up
                      </v-icon>
                      <v-icon
                        v-else-if="voteType === null || voteType === 'downvote'"
                        class="mx-auto"
                        @click="upvoteQuestion"
                      >
                        arrow_drop_up
                      </v-icon>
                    </v-flex>

                    <v-flex xs4>
                      <span>{{ question.upvotes.length - question.downvotes.length }}</span>
                    </v-flex>

                    <v-flex xs4>
                      <v-icon
                        v-if="voteType === 'downvote'"
                        color="orange"
                        class="mx-auto"
                        @click="removeDownvoteAQuestion"
                      >
                        arrow_drop_down
                      </v-icon>
                      <v-icon
                        v-else-if="voteType === null || voteType === 'upvote'"
                        class="mx-auto"
                        @click="downvoteQuestion"
                      >
                        arrow_drop_down
                      </v-icon>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs11>
                  <router-link
                    :to="{ name: 'questionDetail', params: { questionId: question._id}}"
                    class="no-style"
                  >
                    <v-card-title>
                      <div>
                        <h3 class="headline mb-0">{{ question.title }}</h3>
                        <div>{{ question.description }}</div>
                      </div>
                    </v-card-title>
                  </router-link>

                    <v-divider light></v-divider>

                    <v-card-actions class="pa-3">
                      <div v-if="question.answers.length > 0">
                        <v-badge>
                          <template v-slot:badge>
                            <span>{{ question.answers.length }}</span>
                          </template>
                          <v-icon>comment</v-icon>
                        </v-badge>
                      </div>
                      <div v-else>
                        <v-icon>comment</v-icon>
                      </div>
                      <v-spacer></v-spacer>
                        <div v-if="$store.state.currentUserId === question.createdBy._id">
                          <router-link class="no-style"
                            :to="{name: 'editQuestion', params: {questionId: question._id}}">
                            <v-icon class="mx-2">edit</v-icon>
                          </router-link>

                          <v-icon class="mx-2" @click="confirmDelete">delete</v-icon>
                        </div>
                        <div v-else>
                          <span class="heading">Asked by {{ question.createdBy.name }}</span>
                        </div>
                    </v-card-actions>
                </v-flex>
              </v-layout>
            </v-card>
        </v-hover>
      </v-flex>
</template>

<script>
import axios from '../api/axios'
import Swal from 'sweetalert2'

export default {
  props: ['question'],
  data() {
    return {
      voteType: null
    }
  },
  created() {
    this.checkVoteType()
  },
  computed: {

  },
  methods: {
    checkVoteType() {
      if(this.question.upvotes.find(id => id == this.$store.state.currentUserId)) {
        this.voteType = "upvote"
      }
      else if (this.question.downvotes.find(id => id == this.$store.state.currentUserId)) {
        this.voteType = "downvote"
      }
      else {
        this.voteType = null
      }
    },
    upvoteQuestion() {
      axios.post(`/questions/${this.question._id}/upvote`, {}, {
        headers: {
          authentication: localStorage.getItem("token")
        }
      })
      .then(() => {
        this.checkVoteType()
        console.log('upvoted to database');
      })
      .catch(err => {
        console.log(err);
      })
    },
    removeUpvoteAQuestion() {
      axios.delete(`/questions/${this.question._id}/upvote`, {}, {
        headers: {
          authentication: localStorage.getItem("token")
        }
      })
      .then(() => {
        this.checkVoteType()
        console.log('removed upvote from database');
      })
      .catch(err => {
        console.log(err);
      })
    },
    downvoteQuestion() {
      axios.post(`/questions/${this.question._id}/downvote`, {}, {
        headers: {
          authentication: localStorage.getItem("token")
        }
      })
      .then(() => {
        this.checkVoteType()
        console.log('downvoted to database');
      })
      .catch(err => {
        console.log(err);
      })
    },
    removeDownvoteAQuestion() {
      axios.delete(`/questions/${this.question._id}/downvote`, {}, {
        headers: {
          authentication: localStorage.getItem("token")
        }
      })
      .then(() => {
        this.checkVoteType()
        console.log('removed downvote from database');
      })
      .catch(err => {
        console.log(err);
      })
    },
    confirmDelete() {
      Swal.fire({
        title: 'Delete this question?',
        text: "You won't be able to revert this",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
      })
      .then((result) => {
        if (result.value) {
          return axios.delete(`/questions/${this.question._id}`, {
            headers: {
              authentication: localStorage.getItem("token")
            }
          })
        }
      })
      .then(() => {
        this.$store.dispatch('getAllQuestions')

        Swal.fire({
          title: 'Deleted',
          type: 'success',
          showConfirmButton: false,
          timer: 1000
        })
      })
      .catch(err => {
        console.log(err);
      })
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