myApp.controller("loginController",function($scope,$http,$state,ValidationService){
  $scope.username = "";
  $scope.usernameError = "";
  $scope.password = "";
  $scope.passwordError = "";
  $usernameStatus=false;
  $passwordStatus=false;
  
  $scope.validateUsername=function(){
   
    if ($scope.username.length < 3 || $scope.username.length > 25) {
        $scope.usernameError = "Username should be between 3 and 25 characters.";
        $usernameStatus=false; 
    }

    else{
        $scope.usernameError="";
        $usernameStatus=true;
    }
}
$scope.validatePassword=function(){
    if ($scope.password.length < 3 || $scope.password.length > 25) {
        $scope.passwordError = "Password should be between 3 and 25 characters.";
        $passwordStatus=false;
      
    }
    
    else{
        $scope.passwordError="";
        $passwordStatus=true;
    }
}



    $scope.login = function (event) {
        console.log("Hi");
        event.preventDefault();
        console.log($usernameStatus);
        console.log($passwordStatus);
   
    if($usernameStatus && $passwordStatus){
        
    $http({
        method: 'POST',
        url: './api/login.php',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {username:$scope.username,
            password:$scope.password
           
        }
    })
        .then(function success(response) {
            console.log("success");
            $responseData= response.data;
            console.log($responseData);
            if ($responseData.status) {
                window.localStorage.setItem("user_id", $responseData.data);
                $state.go("home");
            } else {
                alert($responseData.message);
                $scope.usernameError = response.data.message;
            }
           
           
    
          }, function failure(err) {
            return err;
          })
          .catch(function (error) {
            return error;
          });
    
        }


}
})