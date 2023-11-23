app.controller(
  "leaderBoardController",
  function ($scope, $http, $rootScope,$state) {

    $scope.spinner = false;
    $scope.logout = function () {
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_type");
      $state.go("login");
    };

    $scope.getDetails = function () {
      $http
        .get(`./api/leaderBoard.php?subject_id=${$scope.subject}&level_id=${$scope.level}`)
        .then(
          function success(response) {
            $scope.spinner = true;
            $scope.leaders = response.data.data;
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
    }
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
