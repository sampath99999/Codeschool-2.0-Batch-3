app.controller("AppCtrl", [
  "$window",
  "$state",
  "$rootScope",
  '$http',
  function ($window, $state, $rootScope,$http) {
    var token = $window.localStorage.getItem("access_token");
    if (!token) {
      $state.go("login");
      return;
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
    $.noConflict();
    $rootScope.showLoader = false;
  },
  
]);
