inventoryManagementApp.service("outwardTransactionService", [
  "$http",
  function ($http) {
    this.outwardTransaction = function (productData) {
      return $http({
        method: "POST",
        url: "./api/outwardTransaction.php",
        data: productData,
        headers: { "Content-Type": "application/json" },
      }).then(function (response) {
        return response.data;
      });
    };
  },
]);
