myapp.controller("manageOrdersCtrl",function($scope,$http){
    $http.get('../../api/admin/manageOrder.php')
    .then(function(response){
        $scope.Orders=response.data;
        
    })
    $scope.update=(id,status)=>{
        console.log(id,status)
        $http.post('../../api/admin/updateOrders.php',data={id,status})
        .then(function(response){
            console.log(response)
        })
       
    }
})