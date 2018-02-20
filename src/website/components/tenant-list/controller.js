import BaseController from '../base-controller';
import TenantDialog from '../tenant-dialog';

export default [
  '$rootScope', '$state', '$timeout', '$sce', 'appConfig', 'DialogService', 'TenantApi',
  class Controller extends BaseController {
    constructor($rootScope, $state, $timeout, $sce, appConfig, DialogService, TenantApi) {
      super();
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.$timeout = $timeout;
      this.$sce = $sce;
      this.appConfig = appConfig;
      this.DialogService = DialogService;
      this.TenantApi = TenantApi;
    }

    $onInit() {
      this.pagination = {
        page: 1,
        limit: 10
      };

      this.search();
    }

    search() {
      let query = this.searchText ? `text=${this.searchText}` : null;
      this.TenantApi.find(query, this.pagination)
        .then(result => {
          this.tenants = result.docs || [];
          this.pagination = _.extend(this.pagination, _.pick(result, ['total', 'limit', 'page', 'pages']));
        })
    }

    create() {
      let inputs = {
        user: null
      };

      this.DialogService.open(TenantDialog, inputs)
        .then(tenant => {
          if (!tenant) return;
          this.tenants.push(tenant);
        })
    }

    edit(user) {
      let inputs = {
        tenant: _.clone(tenant)
      };

      this.DialogService.open(TenantDialog, inputs)
        .then(tenant => {
          if (!tenant) return;
          let item = _.find(this.tenants, item => {
            return item._id === tenant._id;
          })
          if (item) _.extend(item, tenant);
        })
    }
  }
]
