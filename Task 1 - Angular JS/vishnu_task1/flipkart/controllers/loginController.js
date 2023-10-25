app.controller(
  "loginCtrl",
  function ($scope, $http, $rootScope, $location, $cookies, $location) {
    const token = $cookies.get("token");
    if (token) {
      $rootScope.loginStatus = true;
      $location.path("/").replace();
    }
    $scope.email = "rahul@gmail.com";
    $scope.password = "asdW#3";
    $rootScope.loginStatus = false;
    $scope.login = function () {
      const userCredentials = {
        userEmail: $scope.email,
        userPassword: $scope.password,
      };
      const ulrEncodedUserData = jQuery.param(userCredentials);
      $http
        .post("./api/userAuthentication.php", ulrEncodedUserData, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then(
          (response) => {
            if (response.data.status === true) {
              const userId = response.data.data;
              console.log(userId);
              $cookies.put("token", userId, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
              });
              $location.path("/").replace();
            } else {
              console.log(response);
            }
          },
          (error) => {
            console.log(error);
          }
        )
        .catch((error) => {
          console.log(error);
        });
    };
  }
);
