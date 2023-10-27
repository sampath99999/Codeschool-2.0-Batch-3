app.controller("HomeCtrl", [
  "$scope",
  "$window",
  "$state",
  '$http',
  function ($scope, $window, $state,$http) {
    var token = $window.localStorage.getItem("access_token");
    if (!token) {
      $state.go("login");
    }
    if (token) {
      $http.get("api/tokenValidation.php").then(function (response) {
        if(response.data.message==="Invalid user"){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data['message'],
          });
          $window.localStorage.removeItem("access_token");
          $state.go("login")
          return;
        }
      });
      
    }
  },
]);
