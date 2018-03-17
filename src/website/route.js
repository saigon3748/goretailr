export default ['$stateProvider', '$locationProvider', 'appConfig', function ($stateProvider, $locationProvider, appConfig) {
  $stateProvider
    .state(appConfig.states.HOME, {
      url: '^',
      template: '<go-dashboard/>'
    })
    .state(appConfig.states.LOGIN, {
      url: '/login',
      template: '<go-login/>'
    })
    .state(appConfig.states.TENANT_LIST, {
      url: '/tenants',
      template: '<go-tenant-list/>'
    })
    .state(appConfig.states.TENANT_DETAIL, {
      url: '/shop',
      template: '<go-tenant-detail/>'
    })
    .state(appConfig.states.CART, {
      url: '/cart',
      template: '<go-cart/>'
    })
    .state(appConfig.states.TODAY, {
      url: '/today',
      template: '<go-today/>'
    })
    .state(appConfig.states.ORDER_DETAIL, {
      url: '/orders/:id',
      template: '<go-order-detail/>'
    })
    .state(appConfig.states.MENU_LIST, {
      url: '/menu',
      template: '<go-menu-list/>'
    })
    .state(appConfig.states.CATEGORY_LIST, {
      url: '/category',
      template: '<go-category-list/>'
    })
}]