import BaseApi from './base-api'

export default ['$http', '$q',
  class MenuApi extends BaseApi {
    constructor($http, $q) {
      super($http, $q, 'menus');
    }

    findTags() {
      let url = `${this.endpoint}/tags`;
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