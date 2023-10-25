app.controller("homeController", function ($scope, $http, $state, $rootScope) {
  $scope.userId = localStorage.getItem("user_id");
  $scope.userType = localStorage.getItem("user_type");

  if (!$scope.userId) {
    $state.go("login");
  }

  $scope.spinner = false;
  if($scope.userType=="null" || $scope.userType == null){
    $state.go("home");
  }

  if ($scope.userType == "admin") {
    $state.go("admin");
  }

  $rootScope.ticketHistory = function () {
    $state.go("history");
  };



  $rootScope.logout = function () {
    $rootScope.type = null;
    $rootScope.id = null;
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_type");
    $state.go("login");
  };

  $http
    .get("./api/subjects.php")
    .then(
      function (response) {
        $scope.spinner = true;
        $scope.subjectNames = response.data["data"];
        console.log(response.data["data"]);
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
