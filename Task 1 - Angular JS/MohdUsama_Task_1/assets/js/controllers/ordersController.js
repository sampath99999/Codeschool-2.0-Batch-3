app.controller("ordersController", [
  "$scope",
  "$http",
  "$state",
  function ($scope, $http, $state) {
    $scope.loader = false
    token = localStorage.getItem("token");
    if (token) {
      $scope.loader = true;
      $http
        .post("api/getOrders.php", { token: token })
        .then(function (response) {
          $scope.orders = JSON.stringify(response.data);
          $scope.orders = JSON.parse($scope.orders);
          $scope.loader = false;
        });
    } else {
      $state.go("login");
      return;
    }
  },
]);
