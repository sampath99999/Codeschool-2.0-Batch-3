app.controller("productDetailsController", [
  "$scope",
  "$stateParams",
  "GetSingleProductService",
  "AuthService",
  "cart",
  function ($scope, $stateParams, GetSingleProductService, AuthService, cart) {
    $scope.id = $stateParams.id;
    $scope.addToCart = () => {
      $scope.loader = false
      $scope.tokenExists = AuthService.checkTokenExists();
      if ($scope.tokenExists) {
        cart.addToCart($scope.product);
        Swal.fire("Product Added To Cart");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Seems like you need to login",
          footer: '<a href="#!/login">Please Login and try again</a>',
        });
        return;
      }
    };
    const getProd = () => {
      $scope.loader = true;
      GetSingleProductService.getProduct($scope.id).then(function (response) {
        $scope.loader = false;
        $scope.product = response.data;
      });
    };
    getProd();
  },
]);
