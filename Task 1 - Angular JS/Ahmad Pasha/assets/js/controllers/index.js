app.controller("homeController", function ($scope, $http, $state,$location) {
  $scope.userId = localStorage.getItem("user_id");
  $scope.userType = localStorage.getItem("user_type");

  if (!$scope.userId) {
    $location.path("/login");
    return
  }

  $scope.spinner = false;
  if (!$scope.userType) {
    $state.go("home");
    return;
  }

  if ($scope.userType == "admin") {
    $state.go("admin");
    return
  }



  $scope.logout = function () {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_type");
    $state.go("login");
    return
  };

  $http
    .get("./api/subjects.php")
    .then(
      function (response) {
        $scope.spinner = true;
        $scope.subjectNames = response.data["data"];
      },
      function (error) {
        console.log(error);
      }
    )
    .catch(function (error) {
      console.log(error);
      console.log("error in api .....");
    });
});
