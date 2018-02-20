import BaseApi from './base-api'

export default ['$http', '$q',
  class OrderApi extends BaseApi {
    constructor($http, $q) {
      super($http, $q, 'orders');
    }
  }
]