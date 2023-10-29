app.controller("authController", function($scope, $rootScope, $timeout, $window){

    if($window.localStorage.getItem("token")){
        $location.path("/home").replace();
    }

    // Display Loader.
    $timeout(()=>{
        $rootScope.displayLoader = false;
        $rootScope.loginAuth = true;
        $rootScope.registerName = false;
        $rootScope.registerChoice = false;
        $rootScope.registerUser = false;
    }, 2000);

    // On Login show directive.
    $scope.loginControl = function (){
        
        $rootScope.loginAuth = true;
        $rootScope.registerName = false;
        $rootScope.registerChoice = false;
        $rootScope.registerUser = false;

        // JSON Register Data.
        $rootScope.registerData = {
            "first_name": '',
            "last_name": '',
            "interests": {}
        }
    }

    // On Register show directive.
    $scope.registerControl = function (){

        $rootScope.loginAuth = false;
        $rootScope.registerName = true;
        $rootScope.registerChoice = false;
        $rootScope.registerUser = false;

        // JSON Register Data.
        $rootScope.registerData = {
            "first_name": '',
            "last_name": '',
            "interests": {}
        }
    }    

})