export default [
  '$rootScope', '$state', '$timeout', '$sce', 'appConfig',
  class Controller {
    constructor($rootScope, $state, $timeout, $sce, appConfig) {
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.$timeout = $timeout;
      this.$sce = $sce;
      this.appConfig = appConfig;
    }

    get isLoggedIn() {
      return this.$rootScope.isLoggedIn;
    }

    get isSudo() {
      return this.$rootScope.global.user.name === "sudo";
    }

    get loggedUser() {
      return this.$rootScope.global.user;
    }

    get tenant() {
      return this.$rootScope.global.user.tenant;
    }

    logout() {
      window.localStorage.removeItem('token');
      this.$rootScope.global.user = null;
      this.$rootScope.isLoggedIn = false;
      this.$state.go(this.appConfig.states.LOGIN);
    }    
  }
]