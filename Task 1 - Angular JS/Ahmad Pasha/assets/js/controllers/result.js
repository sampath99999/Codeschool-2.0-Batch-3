app.controller(
  "resultController",
  function ($scope, $stateParams, $httpParamSerializerJQLike) {
    $scope.subjectId = $stateParams.subjectId;
    $scope.levelId = $stateParams.levelId;
    $scope.score = $stateParams.score;
    $scope.userId = localStorage.getItem('user_id');
    console.log($scope.levelId, $scope.subjectId);
    $scope.spinner = false;

  }
);
