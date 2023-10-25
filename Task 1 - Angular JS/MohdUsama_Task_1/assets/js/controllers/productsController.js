app.controller("productsController", [
  "$scope",
  "$stateParams",
  "GetProductsService",
  function ($scope, $stateParams, GetProductsService) {
    $scope.loader = false
    $scope.products = [];

    const getPage = () => {
      $scope.loader = false;
      $scope.category = $stateParams.category;
      $scope.selectedCategory = $scope.category || 0;
    };

    const getData = () => {
      $scope.loader = true;
      GetProductsService.getProducts().then(function (response) {
        $scope.products = response.data;
        getPage();
      });
    };
    getData();
  },
]);
