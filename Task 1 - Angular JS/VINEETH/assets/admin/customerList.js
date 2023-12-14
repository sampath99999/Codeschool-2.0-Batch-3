myapp.controller('customerListCtrl',function($scope,$http){
    $http.get('../../api/admin/adminCustomerList.php')
    .then(function(response){
        $scope.customers = response.data;
    })

})