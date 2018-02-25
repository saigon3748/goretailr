import BaseApi from './base-api'

export default ['$http', '$q',
  class CategoryApi extends BaseApi {
    constructor($http, $q) {
      super($http, $q, 'categories');
    }

    findTop() {
      let url = `${this.endpoint}/top`;
      return this.$q((resolve, reject) => {
        this.$http.get(url)
          .success(result => {
            resolve(result);
          })
          .error(err => {
            reject(err);
          });
      });    
    }
  }
]