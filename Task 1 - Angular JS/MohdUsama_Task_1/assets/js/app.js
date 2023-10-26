const app = angular.module("ECommerceApp", ["ui.router", "ngMessages"]);
app.config([
  "$httpProvider",
  function ($httpProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");
    $httpProvider.interceptors.push("AdminAuthInterceptor");
  },
]);
