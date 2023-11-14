myApp.controller("register", function ($scope, $state, $http) {
  $scope.firstName = "";
  $scope.firstNameError = "";
  $scope.lastName = "";
  $scope.lastNameError = "";
  $scope.email = "";
  $scope.emailError = "";
  $scope.password = "";
  $scope.passwordError = "";
  $scope.userData = "";
  $scope.registerDivison = false;
  $scope.registrationStatus = "";
  $scope.loader = true;

  $scope.firstNameValidation = function () {
    $scope.firstName = $scope.firstName.replace(/[^A-Za-z]+/g, "");

    if ($scope.firstName.length < 3) {
      $scope.firstNameError = "First name should be minimum three characters";
      return false;
    } else {
      $scope.firstNameError = "";
      return true;
    }
  };

  $scope.lastNameValidation = function () {
    const lastNameRegex = /^[A-Za-z]+$/;
    if (!$scope.lastName.match(lastNameRegex)) {
      $scope.lastName = $scope.lastName.replace(/[^A-Za-z]+/g, "");
    }
    if ($scope.lastName.length < 3) {
      $scope.lastNameError = "Last name should be minimum three characters";
      return false;
    } else {
      $scope.lastNameError = "";
      return true;
    }
  };

  $scope.emailValidation = function () {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!pattern.test($scope.email)) {
      $scope.emailError = "Invalid email address.ex:gunda@gmail.com";
      return false;
    } else {
      $scope.emailError = "";
      return true;
    }
  };

  $scope.passwordValidation = function () {
    if ($scope.password.length < 8) {
      console.log($scope.password.length)
      $scope.passwordError = "Password should be minimum 8 characters";
      return false;
    } else {
      $scope.passwordError = "";
      return true;
    }
  };
  $scope.register = function () {
    $scope.firstNameValidation();
    $scope.lastNameValidation();
    $scope.emailValidation();
    const isPasswordValid = $scope.passwordValidation(); // Call it only once

    console.log(
      $scope.firstNameValidation() &&
        $scope.lastNameValidation() &&
        $scope.emailValidation() &&
        $scope.passwordValidation()
    );

    $scope.userData = {
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      email: $scope.email,
      password: $scope.password,
    };

    if (
      $scope.firstNameValidation() &&
      $scope.lastNameValidation() &&
      $scope.emailValidation() &&
      isPasswordValid
    ) {
      $scope.loader = false;

      $http({
        method: "POST",
        url: "./api/register.php",
        data: $scope.userData,
      }).then(
        function mySuccess(response) {
          if (response.data.status === false) {
            $scope.successfulRegistration = "";
            $scope.registrationFailed = "Email already taken!";
          } else {
            $scope.registrationFailed = "";
            $scope.successfulRegistration = "User registered successfully";
            $scope.firstName = "";
            $scope.lastName = "";
            $scope.email = "";
            $scope.password = "";
          }
          $scope.loader = true;
        },
        function myError(response) {
          $scope.myWelcome = response.statusText;
        }
      );
    }
  };
});
