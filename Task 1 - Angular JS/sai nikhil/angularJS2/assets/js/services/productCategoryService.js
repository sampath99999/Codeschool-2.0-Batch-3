inventoryManagementApp.service("productCategoryService", function ($http) {
  this.fetchData = function () {
    return $http
      .get("./api/getProductsCountByCategory.php")
      .then(function (response) {
        return response.data.data;
      });
  };
});
