import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/users/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/users/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },{
      path: '/myquestions',
      name: 'myQuestions',
      component: () => import('./views/MyQuestion.vue'),
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (to.matched.some(record => record.meta.requiresAuth)) {
          if (localStorage.getItem("token") === null) {
            next({
              path: '/users/login',
              query: { redirect: to.fullPath }
            })
          } else {
            next()
          }
        } else {
          next()
        }
      }
    },{
      path: '/questions',
      name: 'questions',
      component: () => import('./views/Question.vue'),
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (to.matched.some(record => record.meta.requiresAuth)) {
          if (localStorage.getItem("token") === null) {
            next({
              path: '/users/login',
              query: { redirect: to.fullPath }
            })
          } else {
            next()
          }
        } else {
          next() 
        }
      },
      children: [{
        path: 'ask',
        name: 'addQuestion',
        component: () => import('./views/AddQuestion.vue')
      }, {
        path: 'details/:questionId',
        name: 'questionDetail',
        component: () => import('./views/QuestionDetail.vue')
      }, {
        path: 'edit/:questionId',
        name: 'editQuestion',
        component: () => import('./views/EditQuestion.vue')
      }]
    }, {
      path: '/answers',
      name: 'answers',
      component: () => import('./views/Answer.vue'),
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (to.matched.some(record => record.meta.requiresAuth)) {
          if (localStorage.getItem("token") === null) {
            next({
              path: '/users/login',
              query: { redirect: to.fullPath }
            })
          } else {
            next()
          }
        } else {
          next() 
        }
      },
      children: [{
        path: 'edit/:questionId/:answerId',
        name: 'editAnswer',
        component: () => import('./views/EditAnswer.vue')
      }]
    }
  ]
})
