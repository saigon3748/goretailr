import BaseApi from './base-api'

export default ['$http', '$q',
  class TenantApi extends BaseApi {
    constructor($http, $q) {
      super($http, $q, 'tenants');
    }
  }
]