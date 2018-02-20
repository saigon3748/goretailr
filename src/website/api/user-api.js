import BaseApi from './base-api'

export default ['$http', '$q',
  class UserApi extends BaseApi {
    constructor($http, $q) {
      super($http, $q, 'users');
    }
  }
]