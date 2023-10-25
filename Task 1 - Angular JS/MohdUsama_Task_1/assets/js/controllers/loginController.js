app.controller("loginController", [
  "$scope",
  "$http",
  "$state",
  "AuthService",
  function ($scope, $http, $state, AuthService) {
    $scope.loader = false
    $scope.tokenExists = AuthService.checkTokenExists();
    if ($scope.tokenExists) {
      $state.go("categories");
      return;
    }
    $scope.valid = false;
    $scope.email = "";
    $scope.password = "";
    function loginUser() {
      $scope.loader = true;
      $http
        .post("./api/login.php", {
          email: $scope.email,
          password: $scope.password,
        })
        .then(function (response) {
          $scope.loader = false;
          var result = response.data;
          if (!result.status) {
            $scope.valid = true;
            $scope.email = "";
            $scope.password = "";
          } else {
            if (
              response.data.admin === null ||
              response.data.admin === undefined
            ) {
              Swal.fire({
                title: `User Successfully Logged in`,
                showClass: {
                  popup: "animate__animated animate__fadeInDown",
                },
                hideClass: {
                  popup: "animate__animated animate__fadeOutUp",
                },
              });
              $state.go("categories");
            }
            $scope.valid = false;
            localStorage.setItem("token", result.data);
          }
        })
        .catch(function (error) {
          console.error("Error during login:", error);
        });
    }
    $scope.login = loginUser;
  },
]);
