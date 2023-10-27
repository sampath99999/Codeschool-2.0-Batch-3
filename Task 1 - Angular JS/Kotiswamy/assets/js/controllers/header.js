app.controller("HeaderCtrl", [
  "$scope",
  "$window",
  "$state",
  "$http",
  function ($scope, $window, $state, $http) {
    $scope.currentDate = new Date();
    $scope.logoutBtn = function () {
      var token = $window.localStorage.getItem("access_token");
      if (token) {
        $http({
          method: "POST",
          url: "api/logout.php",
        }).then(
          function (response) {
            if (response.data["status"]) {
              $window.localStorage.removeItem("access_token");
              $state.go("login");
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.data["message"],
              });
            }
          },
          function (response) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.status + " " + response.statusText,
            });
          }
        );
      } else {
        $state.go("login");
      }
    };
  },
]);
