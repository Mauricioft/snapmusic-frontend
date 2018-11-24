import Vue from 'vue'
import App from './App'
import router from './router'
import VeeValidate from 'vee-validate'
import store from './store/index'

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VDataTable,
  VDialog,
  VCard,
  VTextField,
  VSelect,
  VSnackbar,
  VToolbar,
  VAlert,
  VForm,
  transitions
} from 'vuetify'

import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VDataTable,
    VDialog,
    VCard,
    VTextField,
    VSelect,
    VSnackbar,
    VToolbar,
    VAlert,
    VForm,
    transitions
  },
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})
Vue.use(VeeValidate)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store,
})
