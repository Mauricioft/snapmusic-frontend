import HTTP from '../../http-common'

export default {
  signIn(user) {
    let params = Object.assign({}, user)
    return HTTP.post('auth/obtain_token/', params)
      .then(resp => resp.data)
  },
}