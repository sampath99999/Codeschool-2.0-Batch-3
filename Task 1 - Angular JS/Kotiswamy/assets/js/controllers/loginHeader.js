app.controller("LoginHeaderCtrl", [
  "$scope",
  function ($scope) {
    $scope.showChallansList = false;
    $scope.challanListMouseEnter = function () {
      $scope.showChallansList = true;
    };
    $scope.challanListMouseLeave = function () {
      $scope.showChallansList = false;
    };

    $scope.showCyberList = false;

    $scope.cyberListMouseEnter = function () {
      $scope.showCyberList = true;
    };
    $scope.cyberListMouseLeave = function () {
      $scope.showCyberList = false;
    };
  },
]);
