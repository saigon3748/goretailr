import BaseController from '../base-controller';
import CategoryDialog from '../category-dialog';

export default [
  '$rootScope', '$state', '$timeout', '$sce', 'appConfig', 'DialogService', 'CategoryApi',
  class Controller extends BaseController {
    constructor($rootScope, $state, $timeout, $sce, appConfig, DialogService, CategoryApi) {
      super();
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.$timeout = $timeout;
      this.$sce = $sce;
      this.appConfig = appConfig;
      this.DialogService = DialogService;
      this.CategoryApi = CategoryApi;
    }

    $onInit() {
      this.pagination = {
        page: 1,
        limit: 10
      };

      this.search();
    }

    search() {
      this.CategoryApi.findTop()
        .then(result => {
          this.categories = result;
        })
    }

    create() {
      let inputs = {
        category: null
      };

      this.DialogService.open(CategoryDialog, inputs)
        .then(category => {
          if (!category) return;
          this.categories.push(category);
        })      
    }

    edit(category) {
      let inputs = {
        category: _.clone(category)
      };

      this.DialogService.open(CategoryDialog, inputs)
        .then(category => {
          if (!category) return;
          let item = _.find(this.categories, item => {
            return item._id === category._id;
          })
          if (item) _.extend(item, category);
        })      
    }

    delete(category) {
      this.DialogService.confirm("Do you want to delete?")
        .then(confirmed => {
          if (!confirmed) return;
          this.CategoryApi.delete(category._id)
            .then(result => {
              toastr.success('Deleted successfully');
            })
            .catch(err => {
              toastr.error('Deleted failed');
            })          
        })
    }

    getTags(category) {
      if (!category.tags) return null;
      return category.tags.reduce((value, item) => `${value}, ${item}`);
    }

    getStatus(category) {
      if (category.isLocked) return "Locked";
      return null;
    }
  }
]
