import appConfig from './config';
import route from './route';
import app from './components/app';
import login from './components/login';
import dashboard from './components/dashboard';
import tenantList from './components/tenant-list';
import tenantDetail from './components/tenant-detail';
import cart from './components/cart';
import orderList from './components/order-list';
import orderDetail from './components/order-detail';
import menuList from './components/menu-list';
import categoryList from './components/category-list';
import userList from './components/user-list';
import dialogService from './services/dialog-service';
import websocketService from './services/websocket-service';
import authApi from './api/auth-api';
import tenantApi from './api/tenant-api';
import userApi from './api/user-api';
import menuApi from './api/menu-api';
import categoryApi from './api/category-api';
import orderApi from './api/order-api';
import websocketInterceptor from './utils/websocket-interceptor';

angular
  .module('goretailr', [
    'ui.router', 'ui.bootstrap', 'angular-storage', 'angular-jwt'
  ])
  .component('goApp', app)
  .component('goLogin', login)
  .component('goDashboard', dashboard)
  .component('goTenantList', tenantList)
  .component('goTenantDetail', tenantDetail)
  .component('goCart', cart)
  .component('goOrderList', orderList)
  .component('goOrderDetail', orderDetail)
  .component('goMenuList', menuList)
  .component('goCategoryList', categoryList)
  .component('goUserList', userList)
  .service('AuthApi', authApi)
  .service('TenantApi', tenantApi)
  .service('UserApi', userApi)
  .service('MenuApi', menuApi)
  .service('CategoryApi', categoryApi)
  .service('OrderApi', orderApi)
  .service('DialogService', dialogService)
  .service('WebsocketService', websocketService)
  .factory('WebsocketInterceptor', websocketInterceptor)
  .directive("ngFileSelect", function(fileReader, $timeout) {
    return {
      scope: {
        ngModel: '='
      },
      link: function($scope, el) {
        function getFile(file) {
          fileReader.readAsDataUrl(file, $scope)
            .then(function(result) {
              $timeout(function() {
                $scope.ngModel = result;
              });
            });
        }

        el.bind("change", function(e) {
          var file = (e.srcElement || e.target).files[0];
          getFile(file);
        });
      }
    };
  })
  .factory("fileReader", function($q, $log) {
    var onLoad = function(reader, deferred, scope) {
      return function() {
        scope.$apply(function() {
          deferred.resolve(reader.result);
        });
      };
    };

    var onError = function(reader, deferred, scope) {
      return function() {
        scope.$apply(function() {
          deferred.reject(reader.result);
        });
      };
    };

    var onProgress = function(reader, scope) {
      return function(event) {
        scope.$broadcast("fileProgress", {
          total: event.total,
          loaded: event.loaded
        });
      };
    };

    var getReader = function(deferred, scope) {
      var reader = new FileReader();
      reader.onload = onLoad(reader, deferred, scope);
      reader.onerror = onError(reader, deferred, scope);
      reader.onprogress = onProgress(reader, scope);
      return reader;
    };

    var readAsDataURL = function(file, scope) {
      var deferred = $q.defer();

      var reader = getReader(deferred, scope);
      reader.readAsDataURL(file);

      return deferred.promise;
    };

    return {
      readAsDataUrl: readAsDataURL
    };
  })
  .constant('appConfig', appConfig)
  .config(route)
  .config(['$httpProvider', 'appConfig', 'jwtInterceptorProvider', 
    function ($httpProvider, appConfig, jwtInterceptorProvider) {
      jwtInterceptorProvider.authPrefix = 'JWT ';
      jwtInterceptorProvider.tokenGetter = function () {
        return window.localStorage.getItem('token');
      }

      $httpProvider.interceptors.push('jwtInterceptor');
      // $httpProvider.interceptors.push('WebsocketInterceptor');
    }
  ])
  .run(['$rootScope', '$window', '$state', 'appConfig',
    function ($rootScope, $window, $state, appConfig) {
      $rootScope.global = {};

      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $window.scrollTo(0, 0);
      });

      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (!$rootScope.isLoggedIn && toState.name != "Login") {
          event.preventDefault();
          $state.go(appConfig.states.LOGIN);
        }
      });
    }
  ]);

angular.element(document).ready(function () {
  angular.bootstrap(document, ['goretailr']);
});