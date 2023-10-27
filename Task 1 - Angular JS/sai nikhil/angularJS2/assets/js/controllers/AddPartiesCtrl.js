inventoryManagementApp.controller("AddPartiesCtrl", [
  "$scope",
  "addPartyService",
  "getPartiesService",
  "$http",
  "$state",
  function ($scope, addPartyService, getPartiesService, $http, $state) {
    $scope.partyName = "";
    $scope.partyType = ["Client", "Seller"];
    $scope.selectedPartyType = "";
    $scope.partyNameErrMsg = "";
    $scope.partyTypeErrMsg = "";
    $scope.loadPartyDetails = false;
    $scope.loadPartyDetailsPromise = null;
    $scope.showSpinner = false;
    var userId = localStorage.getItem("token");
    if (!userId) {
      $state.go("login");
    }
    $scope.logout = function () {
      $http
        .post("./api/logout.php", { token: userId })
        .then(function (response) {
          if (response.data.status) {
            localStorage.removeItem("token");
            alert(response.data.message);
            $state.go("login");
          }
        });
    };

    $scope.validatePartyName = function () {
      $scope.partyNameErrMsg = "";

      if (!$scope.partyName) {
        $scope.partyNameErrMsg = "*Please Enter Party Name";
        return false;
      }
      return true;
    };

    $scope.validatePartyType = function () {
      $scope.partyTypeErrMsg = "";

      if (!$scope.selectedPartyType) {
        $scope.partyTypeErrMsg = "*Select Party Type";
        return false;
      }
      return true;
    };

    $scope.addParty = function () {
      $scope.validatePartyName();
      $scope.validatePartyType();
      if ($scope.validatePartyName() && $scope.validatePartyType()) {
        let partyDetails = {
          partyName: $scope.partyName,
          partyType: $scope.selectedPartyType,
        };
        $scope.showSpinner = true;
        addPartyService
          .addParty(partyDetails)
          .then(function (data) {
            if (!data.status) {
              Swal.fire(data.message);
              return false;
            }
            $scope.partyDetails.push({
              party_name: $scope.partyName,
              party_type: $scope.selectedPartyType,
            });
            $scope.partyName = "";
            $scope.selectedPartyType = "";
            Swal.fire(data.message);
          })
          .finally(function () {
            $scope.showSpinner = false;
          });
      }
    };
    $scope.showSpinner = true;
    $scope.getParties = function () {
      getPartiesService
        .getParties()
        .then(function (data) {
          if (data.status) {
            $scope.partyDetails = data.data;
            $scope.loadPartyDetails = true;
          }
        })
        .finally(function () {
          $scope.showSpinner = false;
        });
    };

    $scope.getParties();
  },
]);
