import BaseController from '../base-controller';

export default [
  '$rootScope', '$scope', '$http', 'appConfig', '$uibModalInstance', 'TenantApi',
  class Controller extends BaseController {
    constructor($rootScope, $scope, $http, appConfig, $uibModalInstance, TenantApi) {
      super()
      this.$http = $http;
      this.$scope = $scope;
      this.$uibModalInstance = $uibModalInstance;
      this.TenantApi = TenantApi;
      this.tenant = {};
      this.user = {};
    }

    cancel() {
      this.$uibModalInstance.close(false);
    }

    save() {
      if (!this.validate()) return;

      let data = {
        tenant: this.tenant,
        user: this.user
      }

      return this.TenantApi.create(data)
        .then(tenant => {
          this.$uibModalInstance.close(tenant);
        })
        .catch(err => {
          toastr.error(err.data.message);
        })
    }

    validate() {
      if (!this.tenant.name) {
        toastr.error("Tenant name is required");
        return false;
      }

      if (!this.tenant.code) {
        toastr.error("Tenant code is required");
        return false;
      }

      if (!this.user.name) {
        toastr.error("Admin name is required");
        return false;
      } 

      if (!this.user.username) {
        toastr.error("Username is required");
        return false;
      }

      if (!this.user.password) {
        toastr.error("Password is required");
        return false;
      } 
      
      return true;
    }
  }
]