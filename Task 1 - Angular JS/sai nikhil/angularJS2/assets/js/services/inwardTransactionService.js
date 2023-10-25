inventoryManagementApp.service("inwardTransactionService", [
  "$http",
  function ($http) {
    this.inwardTransaction = function (productData) {
      return $http({
        method: "POST",
        url: "./api/inwardTransaction.php",
        data: productData,
        headers: { "Content-Type": "application/json" },
      }).then(function (response) {
        return response.data;
      });
    };
  },
]);
