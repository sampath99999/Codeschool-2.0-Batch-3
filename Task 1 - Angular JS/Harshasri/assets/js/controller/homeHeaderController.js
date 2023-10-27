myApp.controller("homeHeaderController",function($scope,$state){
  
    $scope.logout=function(){
        console.log("clicked");
    localStorage.removeItem("userId");
    $state.go("login");
}
})