app.controller(
  "homeCtrl",
  function ($scope, $rootScope, $cookies, $state, $http, $location) {
    const token = $cookies.get("token");
    $rootScope.adminPortalVisible = false;
    console.log($rootScope.loginStatus);
    $scope.categories = [];
    $scope.groceryAndFashion = [];
    $scope.mobilesAndFashion = [];
    $rootScope.cartVisible = true;

    if (token) {
      $rootScope.loginStatus = true;
    }

    $http
      .get("./api/getHomePageDetails.php", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Requires-Token": false,
        },
      })
      .then(
        (response) => {
          if (response.data.status === true) {
            $scope.categories = response.data.data;
            $scope.groceryAndFashion = response.data.groceryAndFashion;
            $scope.mobilesAndFashion = response.data.mobilesAndFashion;
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

    $scope.categoryRelatedProducts = function (categoryId) {
      $state.go("category", { categoryId });
    };

    $scope.goToProductDescription = function (productId) {
      $state.go("product", { productId });
    };
  }
);
