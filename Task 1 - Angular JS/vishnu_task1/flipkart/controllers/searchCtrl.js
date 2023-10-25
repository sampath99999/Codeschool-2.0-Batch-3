app.controller(
  "searchCtrl",
  function ($scope, $state, $http, $rootScope, $cookies) {
    const token = $cookies.get("token");
    if (token) {
      $rootScope.loginStatus = true;
    }
    const { searchName } = $state.params;
    $scope.product = [];
    $http
      .get(`./api/getProductSearch.php/${searchName}`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Requires-Token": false,
        },
      })
      .then(
        (response) => {
          if (response.data.status === true) {
            $scope.product = response.data.data;
          } else {
            console.log(response);
          }
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        $rootScope.showLoader = false;
      });

    $scope.goToProductDescription = function (productId) {
      $state.go("product", { productId });
    };
  }
);
