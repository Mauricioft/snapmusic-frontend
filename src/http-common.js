import axios from 'axios'
import store from './store/index'

const HTTP = axios.create({
  baseURL: `http://127.0.0.1:8000/api/v1/`,
  //withCredentials: true,
  timeout: 50000
})
/*
HTTP.defaults.withCredentials = true
HTTP.defaults.crossDomain = true
HTTP.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
*/
HTTP.interceptors.request.use((config) => {
  // if (store.state.auth.isLoggedIn) config.headers.Authorization = `Bearer ${store.getters.token}`;
  return config;
}, function (error) {
  return Promise.reject(error)
});

HTTP.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.log('error.response', error.response)
  switch (error.response.status) {
    case 400:
      store.commit('push', { color: 'warning', msg: error.response.data['non_field_errors'] })
      break;
    case 401:
      store.commit('push', { color: 'warning', msg: error.response.data })
      break;
    case 404:
      store.commit('push', { color: 'error', msg: error.response.statusText })
      break;
    case 422:
      break;
    case 500:
      if (error.response.statusText == "Internal Server Error") {
        // store.dispatch('logout');
      }
      break;
    default:
      break;
  }
  return Promise.reject(error);
});

export default HTTP;