app.controller("navbarController", [
  "$scope",
  "AuthService",
  "cart",
  function ($scope, AuthService, cart) {
    $scope.tokenExists = AuthService.checkTokenExists();
    $scope.isLoggedIn = false;
    $scope.items = cart.totalCartItems();
    if ($scope.tokenExists) {
      $scope.isLoggedIn = true;
    } else {
      $scope.isLoggedIn = false;
    }

    $scope.logout = function () {
      localStorage.removeItem("token");
      $scope.isLoggedIn = false;
    };
    $scope.$watch(
      function () {
        return cart.totalCartItems();
      },
      function (newVal, oldVal) {
        $scope.items = newVal;
      }
    );
    $scope.$watch(
      function () {
        return AuthService.checkTokenExists();
      },
      function (newVal, oldVal) {
        $scope.isLoggedIn = newVal;
      }
    );
  },
]);
