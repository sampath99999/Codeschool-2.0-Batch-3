app.controller("levelController", function ($scope, $http, $stateParams) {
  $scope.subject_id = $stateParams.subjectId;
  $scope.spinner = false;
  $http
    .get(`./api/levels.php`)
    .then(
      function success(response) {
        $scope.spinner = true;
        $scope.levels = response.data.data;
        console.log($scope.levels);
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
