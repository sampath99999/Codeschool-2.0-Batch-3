myApp.controller("login", function ($scope, $http, $state) {
  $scope.email = "";
  $scope.password = "";
  $scope.invalidCredentials = "";
  $scope.loader = true;

  $scope.login = () => {
    const userData = {
      email: $scope.email,
      password: $scope.password,
    };
    $scope.loader = false;

    $http.post("./api/login.php", userData).then(
      (response) => {
        const responseData = response.data;
        const status = responseData.status;

        if (status) {
          const token = responseData.token;
          console.log(response);
          localStorage.setItem("token", token);
          localStorage.setItem("id", responseData.data[0].id);
          $scope.loader = true;

          $state.go("dashboard");
        } else {
          $scope.loader = true;
          $scope.invalidCredentials = "Incorrect username or password";
        }
      },
      (error) => {
        console.log(error);
        console.log("errored out");
        $scope.loader = false;
      }
    )
  };
});
