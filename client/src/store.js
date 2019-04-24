import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import axios from './api/axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    currentUserId: localStorage.getItem('id'),
    questions: []
  },
  mutations: {
    setCredentials(state, payload) {
      state.token = payload.token
      state.currentUserId = payload.currentUserId
    },
    clearToken(state) {
      state.token = null
      state.currentUserId = null
    },
    setQuestions(state, payload) {
      state.questions = payload
    }
  },
  actions: {
    getAllQuestions(context) {
      axios.get('/questions')
      .then(({ data }) => {
        context.commit('setQuestions', data)
      })
      .catch(err => {
        console.log(err);
      })
    },
    login(context, credentials) {
      axios.post('/users/login', credentials)
      .then(({ data }) => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('id', data.id)
        localStorage.setItem('name', data.name)
        localStorage.setItem('role', data.role)
        localStorage.setItem('authMethod', 'basic')

        context.commit("setCredentials", {
          token: localStorage.getItem('token'),
          currentUserId: localStorage.getItem('id')
        })
        context.dispatch('getAllQuestions')

        Swal.fire({
          type: 'success',
          title: `Welcome, ${localStorage.getItem('name')}!`,
          showConfirmButton: false,
          timer: 1000
        })

        router.push({ name: 'home' })
      })
      .catch(err => {
        console.log(err);
        let errorMessage = ''
        if (err.response.data.errors) {
          for (let key in err.response.data.errors) {
            errorMessage += err.response.data.errors[key] + '\n'
          }
        }
        Swal.fire({
          type: 'error',
          text: errorMessage,
          showConfirmButton: false,
          timer: 1000
        })
      })
    },
    logout(context) {
      localStorage.clear()
      context.commit("clearToken")
      router.push({ name: 'home' })
    }
  }
})
