inventoryManagementApp.service("addProductService", [
  "$http",
  function ($http) {
    this.addProduct = function (productData) {
      return $http({
        method: "POST",
        url: "./api/addProduct.php",
        data: productData,
        headers: { "Content-Type": "application/json" },
      }).then(function (response) {
        return response.data;
      });
    };
  },
]);
