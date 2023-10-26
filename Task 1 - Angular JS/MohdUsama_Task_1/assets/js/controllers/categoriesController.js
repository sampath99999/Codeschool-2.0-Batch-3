app.controller("categoriesController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    $scope.loader = false;
    $scope.categories = [];
    function loadCategories() {
      $scope.loader = true;
      $http
        .get("./api/getCategories.php")
        .then(function (res) {
          $scope.categories = res.data;
          $scope.loader = false;
        })
        .catch(function (error) {
          console.error("Failed to fetch categories: " + error);
        });
    }
    loadCategories();
  },
]);
