import BaseController from '../base-controller';

export default [
  '$rootScope', '$scope', '$http', 'appConfig', '$uibModalInstance', 'order',
  class Controller extends BaseController {
    constructor($rootScope, $scope, $http, appConfig, $uibModalInstance, order) {
      super()
      this.$http = $http;
      this.$scope = $scope;
      this.$uibModalInstance = $uibModalInstance;
      this.order = order;
    }

    close() {
      this.$uibModalInstance.close(false);
    }

    print() {
      this.$uibModalInstance.close(false);
    }
  }
]