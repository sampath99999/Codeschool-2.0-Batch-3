myApp.controller("logoutController",function($scope){
    $scope.onClickLogout=function(){
        window.localStorage.removeItem("user_id");
    }
})