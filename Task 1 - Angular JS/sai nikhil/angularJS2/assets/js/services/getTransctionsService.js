inventoryManagementApp.service("getTransactionsService", function ($http) {
  this.getTransactions = function (partyType) {
    return $http.get("./api/getTransactions.php").then(function (response) {
      return response.data;
    });
  };
});
