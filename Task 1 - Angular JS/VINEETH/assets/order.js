myApp.controller('orderCtrl', function ($scope, $window,$rootScope,$http) {
    var user_id=$window.localStorage.getItem('User_id')
    $http.post('../api/order.php',data={id:user_id})
    .then(function(response){
        $scope.results=response.data;
    })
})