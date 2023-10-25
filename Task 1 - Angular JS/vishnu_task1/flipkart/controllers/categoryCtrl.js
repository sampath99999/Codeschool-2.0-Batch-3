app.controller(
  "categoryCtrl",
  function ($scope, $state, $http, $rootScope, $cookies) {
    const token = $cookies.get("token");
    if (token) {
      $rootScope.loginStatus = true;
    }

    $scope.products = [];
    const { categoryId } = $state.params;
    $scope.companies = [];
    $scope.minPrice = "";
    $scope.maxPrice = "";
    $scope.selectedRating = "";
    $scope.selectedItems = [];
    $scope.ratings = [
      { id: 1, rating: 1 },
      { id: 2, rating: 2 },
      { id: 3, rating: 3 },
      { id: 4, rating: 4 },
      { id: 5, rating: 5 },
    ];
    $scope.ratings = $scope.ratings.reverse();

    $scope.applyFilters = function () {
      let checkedCompanies = [];
      for (let itemId in $scope.selectedItems) {
        if ($scope.selectedItems[itemId]) {
          checkedCompanies.push(parseInt(itemId));
        }
      }
      const checkedCompaniesParams = checkedCompanies.join(",");
      const queryParams = {
        minimum: $scope.minPrice === "" ? 0 : $scope.minPrice,
        maximum: $scope.maxPrice === "" ? 1000 : $scope.maxPrice,
        rating: $scope.selectedRating === "" ? 1 : $scope.selectedRating,
        companies: checkedCompaniesParams,
      };

      let queryParameters = Object.keys(queryParams).map(
        (key) => `${key}=${encodeURIComponent(queryParams[key])}`
      );
      queryParameters = queryParameters.join("&");

      $http
        .get(`./api/getFilteredProducts.php/${categoryId}?${queryParameters}`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requires-Token": false,
          },
        })
        .then(
          (response) => {
            if (response.data.status === true) {
              $scope.products = response.data.data;
            } else {
              $scope.products = [];
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
    };

    $scope.clearFilters = function () {
      $scope.minPrice = "";
      $scope.maxPrice = "";
      $scope.selectedRating = "";
      for (let itemId in $scope.selectedItems) {
        $scope.selectedItems[itemId] = false;
      }
      $scope.applyFilters();
    };

    $http
      .get(`./api/getCategoryProducts.php/${categoryId}`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Requires-Token": false,
        },
      })
      .then(
        (response) => {
          if (response.data.status === true) {
            $scope.products = response.data.data;
            $scope.companies = response.data.companies;
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

    $scope.productDetails = function (productId) {
      $state.go("product", { productId });
    };
  }
);
