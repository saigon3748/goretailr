import BaseApi from './base-api'

export default ['$http', '$q',
  class AuthApi extends BaseApi {
    constructor($http, $q) {
      super($http, $q, 'auth');
    }

    login(username, password) {
      return this.$http.post(`${this.endpoint}/login`, null, {
        headers: {
          'Authorization': 'Basic ' + window.btoa(username + ':' + password)
        }
      })
    }
  }
]