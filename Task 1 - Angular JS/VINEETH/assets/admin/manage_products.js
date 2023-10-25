myapp.controller('manage_productCtrl',function($scope,$http,$state){

    $http.get('../../api/admin/manage_products.php')
    .then(function(response){
        $scope.products=response.data;
        $scope.edit=(id)=>{
            angular.forEach($scope.products, function (product) {
                if (product.id === id) {
                  $scope.id=id
                  $scope.productname = product.productname;
                  $scope.price = product.price;
                  $scope.name = product.name;
                  $scope.rating = product.rating;
                }
            });
        }

        
    })
    $scope.submit=(id,productname,price,name,rating)=>{
        $http.post('../../api/admin/changes_in_product.php',data={id,productname,price,name,rating})
        .then(function(response){
                if(response.data.status){
                  $state.go('manageProducts')
                }
        })
    }

})