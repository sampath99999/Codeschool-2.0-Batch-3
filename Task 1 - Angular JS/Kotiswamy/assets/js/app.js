const app = angular.module("IfmisApp", ["ui.router"]);

app.config([
  "$httpProvider",
  function ($httpProvider) {
    $httpProvider.interceptors.push("tokenInterceptor");
  },
]);
