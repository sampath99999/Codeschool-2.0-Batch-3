app.service("GetSingleProductService", function ($http) {
  this.getProduct = function (id) {
    return $http.post("./api/getProduct.php", { id: id });
  };
});
