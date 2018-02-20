export default [
  '$rootScope', '$state', '$timeout', '$sce', 'appConfig', 'AuthApi',
  class Controller {
    constructor($rootScope, $state, $timeout, $sce, appConfig, AuthApi) {
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.$timeout = $timeout;
      this.$sce = $sce;
      this.appConfig = appConfig;
      this.AuthApi = AuthApi;
    }

    login() {
      this.AuthApi.login(this.username, this.password)
        .success(result => {
          if (!result.token) return toastr.error(result.error);

          window.localStorage.setItem('token', result.token);
          
          let payload = result.token.split('.')[1];
          payload = payload.replace('-', '+').replace('_', '/');
          payload = JSON.parse(window.atob(payload));

          this.$rootScope.global.user = payload;
          this.$rootScope.isLoggedIn = true;
          this.$state.go(this.appConfig.states.HOME);
        })
    }
  }
]