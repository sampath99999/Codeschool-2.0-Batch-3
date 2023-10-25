app.controller("HOAListController", [
  "$scope",
  "$http",
  "$rootScope",
  "$filter",
  function ($scope, $http, $rootScope, $filter) {
    $rootScope.loader = true;
    $http({
      method: "GET",
      url: "./api/getHOAList.php",
    })
      .then(
        function (response) {
          if (response.data.status == true) {
            $scope.records = response.data.data;
          } else if (response.data.status == false) {
            Swal.fire("Oops!", response.data.message, "error");
          }
        },
        function (reject) {
          Swal.fire(reject.status, reject.statusText, "error");
        }
      )
      .finally(function () {
        $rootScope.loader = false;
      });
    $scope.convertToDate = function (date) {
      return new Date(date);
    };
    $scope.view = function (record) {
      $scope.record = record;
      console.log(record);
      $scope.MJH = record.hoa.slice(0, 4);
      $scope.SMJH = record.hoa.slice(5, 7);
      $scope.MH = record.hoa.slice(8, 11);
      $scope.GSH = record.hoa.slice(12, 14);
      $scope.SH = record.hoa.slice(15, 17);
      $scope.DH = record.hoa.slice(18, 21);
      $scope.SDH = record.hoa.slice(22, 25);
      $scope.filterAmount = $filter("convertToWords")(parseInt(record.amount));
    };
  },
]);
