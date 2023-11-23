app.controller(
  "loginController",
  function ($scope, $http, $state, $httpParamSerializerJQLike,$rootScope) {
    $scope.userId = localStorage.getItem("user_id");
    $scope.userType = localStorage.getItem("user_type");
    if ($scope.userType == "admin") {
      $state.go("admin");
    }
    if ($scope.userId) {
      $state.go("home");
    }

    $scope.usernameError = "";
    $scope.passwordError = "";
    $scope.userNotFoundErr = "";

    $scope.login = function () {
      if ($scope.username == null || $scope.username == "") {
        $scope.usernameError = "Username should not be empty";
        return false;
      }

      if ($scope.username.length < 3 || $scope.username.length > 25) {
        $scope.usernameError =
          "Username should be at least 3 Characters and at most 25 Characters";
        return false;
      }

      if ($scope.password == null || $scope.password == "") {
        $scope.passwordError = "Password should not be empty";
        return false;
      }
      if ($scope.password.length < 3 || $scope.password.length > 25) {
        $scope.passwordError =
          "Password should be at least 3 Characters and at most 25 Characters";
        return false;
      }

      if (
        $scope.password !== null ||
        ($scope.password !== "" && $scope.username !== null) ||
        $scope.username !== ""
      ) {
        const data = {
          username: $scope.username,
          password: $scope.password,
        };

        $http
          .post("./api/login.php", JSON.stringify(data))
          .then(
            function success(response) {
              if (response.data.status) {
                $scope.type = response.data.data.type;
                $scope.id = response.data.data.id;
                localStorage.setItem("user_id", $scope.id);
                localStorage.setItem("user_type", $scope.type);
                if ($rootScope.type == "admin") {
                  $state.go("admin");
                  return
                } else {
                  $state.go("home");
                  return
                }
              } else {
                $scope.userNotFoundErr = data.data.message;
                return
              }
              return true;
            },
            function error(error) {
              $scope.userNotFoundErr = "Please Provide Vaild Details";
              console.log(error);
            }
          )
          .catch(function (error) {
            $scope.userNotFoundErr = "Please Provide Vaild Details";
            console.log("error in api .....");
          });
      }
    };
  }
);
