app.controller(
  "adminCtrl",
  function ($scope, $http, $rootScope, $location, $cookies, $location) {
    const token = $cookies.get("token");
    $rootScope.adminPortalVisible = true;
    if (token) {
      $rootScope.loginStatus = true;
    }
    $scope.email = "raj@gmail.com";
    $scope.password = "asdW#3";
    $rootScope.loginStatus = false;
    $scope.login = function () {
      const userCredentials = {
        userEmail: $scope.email,
        userPassword: $scope.password,
      };
      const ulrEncodedUserData = jQuery.param(userCredentials);
      $http
        .post("./api/adminLogin.php", ulrEncodedUserData, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then(
          (response) => {
            if (response.data.status === true) {
              const userId = response.data.data;
              $cookies.put("token", userId, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
              });
              $location.path("/admin/home").replace();
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
