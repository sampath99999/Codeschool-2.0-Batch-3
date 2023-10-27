inventoryManagementApp.service("getTopTrendService", function ($http) {
  this.fetchData = function (partyType) {
    return $http
      .get(`./api/getTopTrends${partyType}.php`)
      .then(function (response) {
        return response.data.data;
      });
  };
});
