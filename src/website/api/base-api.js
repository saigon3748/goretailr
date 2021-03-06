export default class BaseApi {
  constructor($http, $q, resource) {
    this.$http = $http;
    this.$q = $q;
    this.endpoint = `/api/${resource}`;
  }

  findById(id) {
    let url = `${this.endpoint}/${id}`;

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

  find(query, options) {
    let url = `${this.endpoint}`;
    if (query) url = `${url}?${query}`;
    if (options) {
      if (url.indexOf('?') < 0) url = `${url}?`;
      if (options.page) url = `${url}&page=${options.page}`;
      if (options.limit) url = `${url}&limit=${options.limit}`;
    }

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

  create(data) {
    let url = `${this.endpoint}`;

    return this.$q((resolve, reject) => {
      this.$http.post(url, data)
        .success(result => {
          resolve(result);
        })
        .error(err => {
          reject(err);
        });
    });
  }

  update(id, data) {
    let url = `${this.endpoint}/${id}`;

    return this.$q((resolve, reject) => {
      this.$http.put(url, data)
        .success(result => {
          resolve(result);
        })
        .error(err => {
          reject(err);
        });
    });
  }

  delete(id) {
    let url = `${this.endpoint}/${id}`;

    return this.$q((resolve, reject) => {
      this.$http.delete(url)
        .success(result => {
          resolve(result);
        })
        .error(err => {
          reject(err);
        });
    });
  }
}