import BaseController from '../base-controller';

export default [
  '$rootScope', '$scope', '$http', 'appConfig', '$uibModalInstance', 'MenuApi', 'menu',
  class Controller extends BaseController {
    constructor($rootScope, $scope, $http, appConfig, $uibModalInstance, MenuApi, menu) {
      super()
      this.$http = $http;
      this.$scope = $scope;
      this.$uibModalInstance = $uibModalInstance;
      this.MenuApi = MenuApi;
      this.menu = menu || {};
      if(this.menu.tags) {
        this.menu._tags = this.menu.tags.reduce((value, item) => `${value}, ${item}`);
      }
    }

    cancel() {
      this.$uibModalInstance.close(false);
    }

    save() {
      if (!this.validate()) return;

      this.menu.tags = [];
      if (this.menu._tags) {
        this.menu.tags = this.menu._tags.split(',').map(tag => tag.trim())
      }

      if (this.menu._id) {
        return this.MenuApi.update(this.menu._id, this.menu)
          .then(result => {
            toastr.success('Updated successfully');
            this.$uibModalInstance.close(this.menu);
          })
          .catch(err => {
            toastr.error(err.message);
          })
      } else {
        return this.MenuApi.create(this.menu)
          .then(menu => {
            toastr.success('Created successfully');
            this.$uibModalInstance.close(menu);
          })
          .catch(err => {
            toastr.error(err.message);
          })        
      }
    }

    validate() {
      if (!this.menu.name) {
        toastr.error("Name is required");
        return false;
      }

      if (!this.menu.unit_price) {
        toastr.error("Unit price is required");
        return false;
      } 
      
      return true;
    }
  }
]