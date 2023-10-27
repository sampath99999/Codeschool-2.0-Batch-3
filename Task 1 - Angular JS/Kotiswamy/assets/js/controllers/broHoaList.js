app.controller("BroHoaListCtrl", [
  "$scope",
  "$window",
  "$state",
  "$http",
  "$rootScope",
  function ($scope, $window, $state, $http, $rootScope) {
    var token = $window.localStorage.getItem("access_token");
    if (!token) {
      $state.go("login");
      return;
    }

    if (token) {
      $http.get("api/tokenValidation.php").then(function (response) {
        if(response.data.message==="Invalid user"){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data['message'],
          });
          $window.localStorage.removeItem("access_token");
          $state.go("login")
          return;
        }
      });  
    }

    $scope.convertToDate = function (date) {
      return new Date(date);
    };
    $rootScope.showLoader = true;

    $http({ method: "GET", url: "api/getHoaList.php" })
      .then(function (response) {
        if (response["status"]) {
          $rootScope.hoaList = response.data["data"];
        }
      })
      .finally(function () {
        $rootScope.showLoader = false;
      });
  },
]);
