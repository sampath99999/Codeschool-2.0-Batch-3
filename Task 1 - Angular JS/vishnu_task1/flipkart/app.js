const app = angular.module("flipkart", ["ui.router", "ngCookies"]);

app.directive("navHeader", function () {
  return {
    templateUrl: "./common/header.html",
  };
});

app.directive("loader", function () {
  return {
    templateUrl: "./common/loader.html",
  };
});

app.controller(
  "appCtrl",
  function ($scope, $location, $cookies, $rootScope, $state) {
    $rootScope.showLoader = true;
    $rootScope.adminPortalVisible=true;
    $scope.logout = function () {
      $cookies.remove("token");
      $location.path("login").replace();
    };

    $scope.searchProduct = function () {
      const searchName = $scope.searchName;
      $state.go("search", { searchName });
    };
  }
);
