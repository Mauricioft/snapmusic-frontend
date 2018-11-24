import Vue from 'vue'
import Router from 'vue-router'

import NotFound from '../pages/NotFound'
import Artist from '../pages/artist/index'
import Album from '../pages/album/index'
import SignIn from '../pages/auth/signIn'

import store from '../store/index'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/signin'
    },
    {
      path: '/artist',
      name: 'artist',
      component: Artist,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/album',
      name: 'album',
      component: Album,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '*',
      component: NotFound,
    },
  ]
})

router.beforeEach((to, from, next) => {
  var isLoggedIn = store.getters.isLoggedIn;
  var requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    if (!isLoggedIn) {
      next({
        path: '/signin',
      })
    } else {
      next()
    }
  } else {  
    next()
  }
});

export default router