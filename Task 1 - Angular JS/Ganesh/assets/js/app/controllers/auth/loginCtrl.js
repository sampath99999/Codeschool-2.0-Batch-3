app.controller("loginCtrl", function($scope, $http, $window, $location, $rootScope, $timeout){
    // Authentication scope data.

    // Login data.
    $scope.loginUsername = '';
    $scope.loginPassword = '';

    // Validatory Scope.
    $scope.validData = false;
    $scope.serverMessage = '';

    // Login Validation functions...

    // Validate Username.
    $scope.validateUserName = function(){
        let username = $scope.loginUsername;
        $scope.loginUsernameError = true;

        // Validating Conditions.
        if(username == ''){
            $scope.loginUserNameFeedback = "Username is required !";
            return $scope.loginUsernameError;
        } else {
            $scope.loginUsernameError = false;
            return $scope.loginUsernameError;
        }
    }

    // Validate Password.
    $scope.validatePassword = function(){

        let password = $scope.loginPassword;
        $scope.loginPasswordError = true;

        // Validating Conditions.
        if(password == ''){
            $scope.loginPasswordFeedback = "Password is required !";
            return $scope.loginPasswordError;
        } else {
            $scope.loginPasswordError = false;
            return $scope.loginPasswordError;
        }
    }

    // On login click validate and call API.
    $scope.userLoginAuth = function(){

        let validations = [];
        let count = 0;

        validations.push($scope.validateUserName());
        validations.push($scope.validatePassword());
    
        validations.forEach(bool => {
            if(!bool){
                count++;
            }
        });
        
        if(validations.length == count){
    
            $http.post("./api/login.php", {
                "username": $scope.loginUsername,
                "password": $scope.loginPassword
            }).then(function successCallback(response){

                let jsonData = response.data;
                if(!(jsonData["status"])){
                    $scope.serverMessage = jsonData['message'];
                    $scope.validData = false;

                } else {
                    $scope.serverMessage = jsonData['message'];
                    $scope.validData = false;
                    $window.localStorage.setItem("token", jsonData['data'][0]);
                    $window.localStorage.setItem("name",  jsonData['data'][1]);

                    if(jsonData['data'][2] != 1){

                        $timeout(()=>{
                            $location.path("/home").replace();
                        }, 2000);
                        return true;

                    }

                    $timeout(()=>{
                        $location.path("/admin").replace();    
                    }, 1000);

                }

            }, function errorCallback(error){
                console.log(error);
            }).catch(function (exception){
                console.log(exception);
            })          
    
        }

    }
});