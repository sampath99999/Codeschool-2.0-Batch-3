app.controller("levelController", function ($scope, $http, $stateParams,$state) {
  $scope.subject_id = $stateParams.subjectId;
  $scope.spinner = false;
  $scope.logout = function () {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_type");
    $state.go("login");
  };
  $http
    .get(`./api/levels.php`)
    .then(
      function success(response) {
        $scope.spinner = true;
        $scope.levels = response.data.data;
        return true;
      },
      function error(error) {
        console.log(error);
      }
    )
    .catch(function (error) {
      console.log(error);
      console.log("error in api .....");
    });
});
