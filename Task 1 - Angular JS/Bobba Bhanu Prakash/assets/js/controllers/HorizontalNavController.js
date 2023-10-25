app.controller("HorizontalNavController", [
  "$scope",
  "$http",
  "$state",
  "$timeout",
  function ($scope, $http, $state, $timeout) {
    $scope.currentDate = new Date();
    $scope.flag = "";
    var userId = localStorage.getItem("token");
    $scope.removeToken = async function () {
      $scope.flag = false;
      await $http({
        method: "POST",
        url: "./api/logout.php",
        data: { token: userId },
      }).then(
        function (response) {
          if (response.data.status == false) {
            Swal.fire("!Sorry", response.data.message, "error");
          } else {
            $scope.flag = true;
            localStorage.removeItem("token");
            Swal.fire("Logout successfully!", "Please login again", "success");
            $state.go("login");
          }
        },
        function (reject) {
          Swal.fire(reject.status, reject.statusText, "error");
        }
      );
      return $scope.flag;
    };
    $timeout(function () {
      if ($scope.removeToken()) {
        localStorage.removeItem("token");
        Swal.fire("Session Expired!", "Please login again", "success");
        $state.go("login");
      }
    }, 600000);
  },
]);
