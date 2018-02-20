import BaseController from '../base-controller';
import ReceiptDialog from '../receipt-dialog';

export default [
  '$rootScope', '$state', '$timeout', '$sce', 'appConfig', 'DialogService', 'OrderApi',
  class Controller extends BaseController {
    constructor($rootScope, $state, $timeout, $sce, appConfig, DialogService, OrderApi) {
      super();
      this.$rootScope = $rootScope;
      this.$state = $state;
      this.$timeout = $timeout;
      this.$sce = $sce;
      this.appConfig = appConfig;
      this.DialogService = DialogService;
      this.OrderApi = OrderApi;
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
      this.OrderApi.find(query, this.pagination)
        .then(result => {
          this.orders = result.docs || [];
          this.pagination = _.extend(this.pagination, _.pick(result, ['total', 'limit', 'page', 'pages']));
        })
    }

    view(order) {
      let inputs = {
        order: _.clone(order)
      };

      this.DialogService.open(ReceiptDialog, inputs)
        .then(order => {
          if (!order) return;
          let item = _.find(this.orders, item => {
            return item._id === order._id;
          })
          if (item) _.extend(item, order);
        })      
    }

    getTags(order) {
      if (!order.tags) return null;
      return order.tags.reduce((value, item) => `${value}, ${item}`);
    }

    getStatus(order) {
      if (order.isLocked) return "Locked";
      return null;
    }
  }
]
