app.controller("checkoutController", [
  "$scope",
  "$state",
  "$timeout",
  "AuthService",
  "cart",
  "$http",
  function ($scope, $state, $timeout, AuthService, cart, $http) {
    $scope.tokenExists = AuthService.checkTokenExists();
    $scope.loader = false

    if (!$scope.tokenExists) {
      $state.go("login");
      return;
    } else {
      $scope.cart = cart.getCartItems();
      $scope.total = cart.getTotalCartPrice();

      $scope.checkout = function () {
        $scope.loader = true;
        const token = localStorage.getItem("token");
        $scope.items = [];
        $scope.cart.forEach((element) => {
          const item = {
            id: element.id,
            quantity: element.quantity,
            price: parseInt(element.price, 10),
          };
          $scope.items.push(item);
        });
        const postData = {
          token: token,
          total_amount: $scope.total,
          items: $scope.items,
        };

        $http({
          method: "POST",
          url: "./api/placeOrder.php",
          data: postData,
          headers: { "Content-Type": "application/json" },
        })
          .then(function (response) {
            $scope.loader = false;
            if (response.status == 200) {
              cart.clearCart();
              $scope.total = cart.getTotalCartPrice();
              Swal.fire(response.data.message);
              $timeout(function () {
                $state.go("orders");
              }, 3000);
            } else {
              console.log(response);
            }
          })
          .catch(function (error) {
            console.error("Error:", error);
          });
      };
    }
  },
]);
