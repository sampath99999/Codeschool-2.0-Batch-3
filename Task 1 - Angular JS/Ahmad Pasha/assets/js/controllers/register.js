app.controller(
  "registerController",
  function ($scope, $state, $http, $httpParamSerializerJQLike) {
    let userId = window.localStorage.getItem("user_id");
    if (userId) {
      $state.go("home");
    }

    $scope.register = () => {
      $scope.userNameErr = "";
      $scope.passwordErr = "";
      $scope.mailErr = "";
      $scope.personNameErr = "";

      if (
        $scope.personName == null ||
        $scope.personName.length < 3 ||
        $scope.personName.length > 25
      ) {
        $scope.personNameErr =
          "Name should be at least 3 charecters and most 25 charecters";

        return false;
      }
      if (
        $scope.userName == null ||
        $scope.userName.length < 3 ||
        $scope.userName.length > 25
      ) {
        $scope.userNameErr =
          "Username should be at least 3 Characters and at most 25 Characters";
        return false;
      }

      if (
        $scope.password == null ||
        $scope.password.length < 3 ||
        $scope.password.length > 25
      ) {
        $scope.passwordErr =
          "Password should be at least 3 Characters and at most 25 Characters";
        return false;
      }
      if (
        $scope.mail == null ||
        $scope.mail.length < 3 ||
        $scope.mail.length > 25
      ) {
        $scope.mailErr =
          "Mail should be at least 3 Characters and at most 25 Characters";
        return false;
      }

      const data = {
        name: $scope.personName,
        mail: $scope.mail,
        userName: $scope.userName,
        password: $scope.password,
      };

      $http
        .post("./api/register.php", $httpParamSerializerJQLike(data), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then(
          function (response) {
            let data = response;
            if (data.status) {
              $state.go("login");
            } else {
              $("#usernameErr").text(data.message);
            }

            return true;
          },
          function (error) {
            console.log(error);
          }
        )
        .catch(function (error) {
          console.log(error);
          console.log("error in api .....");
        });
    };
  }
);
