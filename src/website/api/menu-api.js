import BaseApi from './base-api'

export default ['$http', '$q',
  class MenuApi extends BaseApi {
    constructor($http, $q) {
      super($http, $q, 'menus');
    }
  }
]