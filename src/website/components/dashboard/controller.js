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
  }
]