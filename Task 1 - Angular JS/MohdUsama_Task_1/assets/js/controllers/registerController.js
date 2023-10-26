app.controller("registerController", [
  "$scope",
  "$http",
  "$window",
  "$state",
  "AuthService",
  function ($scope, $http, $window, $state, AuthService) {
    $scope.loader = false
    $scope.tokenExists = AuthService.checkTokenExists();
    if ($scope.tokenExists) {
      $state.go("categories");
      return;
    }
    $scope.user = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      phone: "",
    };

    $scope.validateName = function (name) {
      return /^[A-Za-z]+$/.test(name);
    };

    $scope.validateUsername = function (username) {
      return username.length >= 5 && /^[A-Za-z0-9_]+$/.test(username);
    };

    $scope.validateEmail = function (email) {
      return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
    };

    $scope.validatePassword = function (password, confirmPassword) {
      return password === confirmPassword && password.length >= 8;
    };

    $scope.validFields = true;
    $scope.registered = true;
    $scope.message = "";
    $scope.register = function () {
      if ($scope.userForm.$valid) {
        if (
          !$scope.validateName($scope.user.firstName) ||
          !$scope.validateName($scope.user.lastName) ||
          !$scope.validateUsername($scope.user.username) ||
          !$scope.validateEmail($scope.user.email) ||
          !$scope.validatePassword(
            $scope.user.password,
            $scope.user.confirmPassword
          )
        ) {
          $scope.validFields = false;
          return;
        } else {
          $scope.validFields = true;
          $scope.loader = true;
          $http
            .post("./api/register.php", {
              email: $scope.user.email,
              password: $scope.user.password,
              firstName: $scope.user.firstName,
              lastName: $scope.user.lastName,
              username: $scope.user.username,
              address: $scope.user.address,
              phone: $scope.user.phone,
              confirmPassword: $scope.user.confirmPassword,
            })
            .then(
              function (response) {
                $scope.loader = false;
                if (response.data.status === true) {
                  $scope.message = "";
                  Swal.fire({
                    title: `${$scope.user.firstName} ${$scope.user.lastName} has been Successfully Registered, Please Login`,
                    showClass: {
                      popup: "animate__animated animate__fadeInDown",
                    },
                    hideClass: {
                      popup: "animate__animated animate__fadeOutUp",
                    },
                  });
                  $state.go("login");
                } else {
                  $scope.message = response.data.message;
                }
              },
              function (error) {
                console.log(error);
              }
            );
        }
      } else {
        $scope.validFields = false;
        return;
      }
    };
  },
]);
