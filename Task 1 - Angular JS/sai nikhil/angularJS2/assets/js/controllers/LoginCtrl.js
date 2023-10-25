inventoryManagementApp.controller("LoginCtrl", [
  "$scope",
  "$http",
  "$state",
  "$location",
  function ($scope, $http, $state, $location) {
    var userId = localStorage.getItem("token");
    if (userId) {
      $state.go("dashBoard");
    }
    $scope.adminId = "";
    $scope.password = "";
    $scope.login = function () {
      if ($scope.adminId === "") {
        alert("Admin Id Cannot Be Empty");
        return false;
      }
      if ($scope.password === "") {
        alert("Password Cannot Be Empty");
        return false;
      }
      $http
        .post("./api/login.php", {
          adminId: $scope.adminId,
          password: $scope.password,
        })
        .then((result) => {
          if (result.data.status) {
            Swal.fire(result.data.message, "success", "success");
            localStorage.setItem("token", result.data.data);
            $state.go("dashBoard");
          } else {
            Swal.fire(result.data.message, "error", "error");
          }
        });
    };
  },
]);
