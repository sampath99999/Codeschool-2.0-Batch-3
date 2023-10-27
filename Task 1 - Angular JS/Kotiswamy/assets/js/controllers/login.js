app.controller("LoginCtrl", [
  "$scope",
  "$http",
  "$window",
  "$state",
  "$rootScope",
  function ($scope, $http, $window, $state, $rootScope) {
    var token = $window.localStorage.getItem("access_token");
    if (token) {
      $state.go("home");
      return;
    }
    // login validation
    $scope.email = null;
    $scope.emailErrMsg = null;
    $scope.emailValidation = function () {
      if ($scope.email === null || $scope.email === "") {
        $scope.emailErrMsg = "Email is required";
        return false;
      }
      // else if (!$scope.email.match(/^[A-z 0-9]+@[A-z]+\.[A-z]{2,}$/)) {
      //   $scope.emailErrMsg = "Please provide valid email";
      //   return false;
      // }
      else {
        $scope.emailErrMsg = null;
        return true;
      }
    };

    // password validation
    $scope.password = null;
    $scope.passwordErrMsg = null;
    $scope.passwordValidation = function () {
      if ($scope.password === null || $scope.password === "") {
        $scope.passwordErrMsg = "Password is required";
        return false;
      }
      // else if ($scope.password.length < 8) {
      //   $scope.passwordErrMsg = "Password must contain 8 characters";
      //   return false;
      // } else if (
      //   !(
      //     $scope.password.match(/[A-Z]/) &&
      //     $scope.password.match(/[a-z]/) &&
      //     $scope.password.match(/[0-9]/) &&
      //     $scope.password.match(/\W/)
      //   )
      // ) {
      //   $scope.passwordErrMsg =
      //     "Password must contain alpha-numeric & special-characters";
      //   return false;
      // }
      else {
        $scope.passwordErrMsg = null;
        return true;
      }
    };

    // Sign Btn
    $rootScope.showLoader = false;
    $scope.signInBtn = function () {
      $scope.emailValidation();
      $scope.passwordValidation();
      if (!($scope.emailErrMsg && $scope.passwordErrMsg)) {
        $http({
          method: "POST",
          url: "api/login.php",
          data: { email: $scope.email, password: $scope.password },
        })
          .then(
            function (response) {
              $rootScope.showLoader = true;
              if (response.data["status"]) {
                $window.localStorage.setItem(
                  "access_token",
                  response.data["token"]
                );
                $state.go("home");
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
          )
          .finally(function () {
            $rootScope.showLoader = false;
          });
      }
    };
  },
]);
