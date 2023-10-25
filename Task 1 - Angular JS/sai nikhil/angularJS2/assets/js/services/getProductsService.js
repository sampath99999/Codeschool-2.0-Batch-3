inventoryManagementApp.service("getProductsService", [
  "$http",
  function ($http) {
    this.getProducts = function () {
      return $http({
        method: "GET",
        url: "./api/getProducts.php",
      }).then(function (response) {
        return response.data;
      });
    };
  },
]);
