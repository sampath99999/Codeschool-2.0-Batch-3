inventoryManagementApp.service("getPartiesService", [
  "$http",
  function ($http) {
    this.getParties = function () {
      return $http({
        method: "GET",
        url: "./api/getParties.php",
      }).then(function (response) {
        return response.data;
      });
    };
  },
]);
