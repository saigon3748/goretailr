import BaseApi from './base-api'

export default ['$http', '$q',
  class CategoryApi extends BaseApi {
    constructor($http, $q) {
      super($http, $q, 'categories');
    }
  }
]