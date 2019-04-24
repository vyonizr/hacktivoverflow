<template>
  <v-card>
    <v-flex xs12>
      <v-layout
        row
      >
        <v-flex xs1>
          <v-layout column fill-height text-xs-center>
            <v-flex xs3>
<!--               <v-icon
                class="mx-auto"
              >
                arrow_drop_up
              </v-icon> -->
            <v-icon
              large
              v-if="voteType === 'upvote'"
              class="mx-auto"
              color="orange darken-2"
              @click="removeUpvoteAnAnswer"
            >
              arrow_drop_up
            </v-icon>
            <v-icon
              large
              v-else-if="voteType === null || voteType === 'downvote'"
              class="mx-auto"
              @click="upvoteAnswer"
            >
              arrow_drop_up
            </v-icon>
          </v-flex>

          <v-flex xs3>
            <span>{{ totalVote }}</span>
          </v-flex>

          <v-flex xs3>
<!--               <v-icon
                class="mx-auto"
              >
                arrow_drop_down
              </v-icon> -->
            <v-icon
              large
              v-if="voteType === 'downvote'"
              color="orange"
              class="mx-auto"
              @click="removeDownvoteAnAnswer"
            >
              arrow_drop_down
            </v-icon>
            <v-icon
              large
              v-else-if="voteType === null || voteType === 'upvote'"
              class="mx-auto"
              @click="downvoteAnswer"
            >
              arrow_drop_down
            </v-icon>
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
import axios from '../api/axios'
import Swal from 'sweetalert2'

export default {
  props: ["answer"],
  data() {
    return {
      voteType: null,
      totalVote: null
    }
  },
  created() {
    this.checkVoteType()
    this.calculateVote()
  },
  computed: {

  },
  methods: {
    checkVoteType() {
      if(this.answer.upvotes.find(id => id == this.$store.state.currentUserId)) {
        this.voteType = "upvote"
      }
      else if (this.answer.downvotes.find(id => id == this.$store.state.currentUserId)) {
        this.voteType = "downvote"
      }
      else {
        this.voteType = null
      }
    },
    upvoteAnswer() {
      axios.post(`/answers/${this.answer._id}/upvote`, {}, {
        headers: {
          authentication: localStorage.getItem("token")
        }
      })
      .then(({ data }) => {
        // data = object answer
        this.totalVote = data.upvotes.length - data.downvotes.length
        this.voteType = "upvote"
        console.log('upvoted to database');
      })
      .catch(err => {
        console.log(err);
      })
    },
    removeUpvoteAnAnswer() {
      axios.delete(`/answers/${this.answer._id}/upvote`, {
        headers: {
          authentication: localStorage.getItem("token")
        }
      })
      .then(({ data }) => {
        this.totalVote = data.upvotes.length - data.downvotes.length
        this.voteType = null
        console.log('removed upvote from database');
      })
      .catch(err => {
        console.log(err);
      })
    },
    downvoteAnswer() {
      axios.post(`/answers/${this.answer._id}/downvote`, {}, {
        headers: {
          authentication: localStorage.getItem("token")
        }
      })
      .then(({ data }) => {
        this.totalVote = data.upvotes.length - data.downvotes.length
        this.voteType = "downvote"
        console.log('downvoted to database');
      })
      .catch(err => {
        console.log(err);
      })
    },
    removeDownvoteAnAnswer() {
      axios.delete(`/answers/${this.answer._id}/downvote`, {
        headers: {
          authentication: localStorage.getItem("token")
        }
      })
      .then(({ data }) => {
        this.voteType = null
        this.totalVote = data.upvotes.length - data.downvotes.length
        console.log('removed downvote from database');
      })
      .catch(err => {
        console.log(err);
      })
    },
    calculateVote() {
      this.totalVote = this.answer.upvotes.length - this.answer.downvotes.length
    }
  }
}
</script>