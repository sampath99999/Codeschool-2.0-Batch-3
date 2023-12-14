myApp.controller('LoginController', function ($scope, $http, $window, $state,$location) {
    $scope.check = function () {
      var name = $scope.name;
      var password = $scope.password;
      $http.post('../api/login.php', { name: name, password: password })
        .then(function (response) {
          console.log(response)
          try{
            response.data.forEach(function (user) {
              $window.localStorage.setItem('User_id', user.id);
              $window.localStorage.setItem('user_name', user.name);
            });
            $state.go('Home');
            $window.location.replace('#/Home')
            $window.location.reload();
  
          }catch(e) {
            console.log(response.data.message)
            $scope.errorMessage=response.data.message
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  
      
    };
    
});
