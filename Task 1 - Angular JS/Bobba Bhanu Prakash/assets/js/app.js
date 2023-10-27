var app = angular.module("IFMIS", ["ui.router"]);
app.run([
  "$rootScope",
  function ($rootScope) {
    $rootScope.loader = false;
  },
]);
