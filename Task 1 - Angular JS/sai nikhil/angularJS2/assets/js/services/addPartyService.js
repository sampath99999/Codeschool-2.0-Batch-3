inventoryManagementApp.service("addPartyService", [
  "$http",
  function ($http) {
    this.addParty = function (partyData) {
      return $http({
        method: "POST",
        url: "./api/addParty.php",
        data: partyData,
        headers: { "Content-Type": "application/json" },
      }).then(function (response) {
        return response.data;
      });
    };
  },
]);
