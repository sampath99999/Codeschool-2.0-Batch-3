app.service("GetProductsService", function ($http) {
  this.getProducts = function () {
    return $http.get("./api/getProducts.php");
  };
});
