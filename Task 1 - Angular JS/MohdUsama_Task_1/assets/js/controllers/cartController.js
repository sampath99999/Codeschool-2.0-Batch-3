app.controller("cartController", [
  "$scope",
  "$state",
  "AuthService",
  "cart",
  function ($scope, $state, AuthService, cart) {
    $scope.loader = false
    $scope.tokenExists = AuthService.checkTokenExists();
    $scope.total = cart.getTotalCartPrice();
    if (!$scope.tokenExists) {
      $state.go("login");
      return;
    }
    $scope.cart = cart.getCartItems();
    $scope.removeFromCart = (index) => {
      cart.removeCartItem(index);
    };
    $scope.decrementQuantity = function (index) {
      cart.decreaseQuantity(index);
    };
    $scope.incrementQuantity = function (index) {
      cart.increaseQuantity(index);
    };
    $scope.$watch(
      function () {
        return cart.getTotalCartPrice();
      },
      function (newVal, oldVal) {
        $scope.total = newVal;
      }
    );
  },
]);
