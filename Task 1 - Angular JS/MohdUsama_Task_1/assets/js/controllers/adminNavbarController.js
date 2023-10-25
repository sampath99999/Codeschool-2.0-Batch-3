app.controller("adminNavbarController", [
  "$scope",
  "$state",
  "WindowControlService",
  "GetUser",
  "AuthService",
  function ($scope, $state, WindowControlService, GetUser, AuthService) {
    $scope.tokenExists = AuthService.checkTokenExists();
    $scope.loader = false;

    if (!$scope.tokenExists) {
      $state.go("login");
      return;
    }
    GetUser.getUserStatus().then(function (response) {
      if (!response.data.admin) {
        $state.go("categories");
        return;
      }
    });
    $scope.logout = function () {
      localStorage.removeItem("token");
      $scope.isLoggedIn = false;
    };
    $scope.resize = function () {
      WindowControlService.resize();
    };
    if (!$scope.tokenExists) {
      $state.go("login");
      return;
    }
    $scope.admin = AuthService.getAdmin();
    if ($scope.admin === false) {
      try {
        $scope.loader = true;
        GetUser.getUserStatus().then(function (response) {
          $scope.loader = false;
          $scope.admin = response.data.admin;
          if ($scope.admin === false) {
            $state.go("categories");
            return;
          }
        });
      } catch (e) {
        console.error(e);
      }
    }
  },
]);
