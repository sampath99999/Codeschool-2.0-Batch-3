const myApp=angular.module("myapp",['ui.router']);  
myApp.controller('productlistCtrl',function($scope,$http,$state,$window,$rootScope){
    $scope.getProducts = function(id) {
        $window.localStorage.setItem("cate_id",id)
      var data = {
          id:id
      };
      $http.post('./../api/categories.php', data)
          .then(function(response) {
              $scope.products = response.data;
              $state.go('product');
          })
         
          .catch(function(error) {
              console.error("Error fetching data:", error);
          });      
    }
    if(!$scope.products){
        $state.go('Home')
    }    
   $scope.getSingleProduct = function (id, name, image, price, rating) {
         $window.localStorage.setItem('product_id',id)
         $window.localStorage.setItem('name',name)
         $window.localStorage.setItem('image',image)
         $window.localStorage.setItem('price',price)
         $window.localStorage.setItem('rating',rating)
         $state.go('individual')
    }
    l=[]
    $scope.AddToCart=function(){
        console.log($scope.id)
    }
    $scope.order=function(){
        var storedId = $window.localStorage.getItem('User_id');
        if(storedId!=0){
            console.log(storedId)
        }
        else{
            $window.alert('YOU HAVE TO LOGIN FIRST');
        }
        
    }
    $scope.logins=()=>{

        user=$window.localStorage.getItem('Used_id');
        if(user){
            $scope.Login=$window.localStorage.getItem('user_name')
            $state.go('Home');
            $scope.auth='LOGOUT'
            console.log(user)
        }
        else{
            $scope.auth='LOGIN'
            $state.go('login');
            console.log(user)
        }    
    }
    if($window.localStorage.getItem('User_id')!=0){
        $scope.Login=''
        $scope.Logout='LOGOUT'
    }
    else{
        $scope.Logout=""
        $scope.Login='LOGIN'
    }
    $scope.logout=()=>{
        if($window.localStorage.getItem('User_id')!=0){
            $window.localStorage.setItem('User_id',0)
            $scope.Login='LOGOUT'
            $scope.Logout=''
            $state.go('login')
        }
        else{
            $state.go('login')
        }

    }  
    $rootScope.count = JSON.parse($window.localStorage.getItem('cart')).length;
})

