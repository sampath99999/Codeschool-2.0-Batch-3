app.controller(
  "historyController",
  function ($scope, $http, $stateParams) {
    $scope.userId = localStorage.getItem('user_id');
    $scope.subject_id = $stateParams.subjectId;
    $scope.spinner = false;
    $http
      .get(`./api/history.php?id=${$scope.userId}`)
      .then(
        function success(response) {
          $scope.spinner = true;
          console.log(response);
          $scope.histories = response.data.data;
          console.log($scope.histories);
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

      $scope.getDate = function (e) {
        if (e) {
          var date = new Date(e);
          var day = date.getDate().toString().padStart(2, '0');
          var month = (date.getMonth() + 1).toString().padStart(2, '0');
          var year = date.getFullYear();
          var hours = date.getHours().toString().padStart(2, '0');
          var minutes = date.getMinutes().toString().padStart(2, '0');
          var seconds = date.getSeconds().toString().padStart(2, '0');
  
          return (day + '-' + month + '-' + year + ' ' + hours + ':' + minutes + ':' + seconds);
        }
        return '';
  
      }



  }
);
