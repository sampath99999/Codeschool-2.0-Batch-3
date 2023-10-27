myApp.controller("registerController",function($scope,$http,$state,ValidationService){
var userId = localStorage.getItem("user_id");
if (userId) {
    $state.go("home");
}

  $scope.username = "";
  $scope.usernameError = "";
  $scope.password = "";
  $scope.passwordError = "";
  $usernameStatus=false;
  $passwordStatus=false;

  $scope.validateUsername = function () {
    if ($scope.username == "") {
        $scope.usernameError = 'Username is required';
        $usernameStatus=false;
      
    }else if(ValidationService.isValidName($scope.username)){
        $scope.usernameError = '';
        $usernameStatus=true;
    } 
    else {
        $scope.usernameError = 'Invalid Username format';;
        $usernameStatus=false;
    }
};
  $scope.validatePassword = function () {
   
    
    if ($scope.password=="") {
        $scope.passwordError = 'Password is required';
        $passwordStatus=false;
        
    }
    
    else if(!/[a-z]/.test($scope.password)){
        $scope.passwordError = "*Password should conatin one lowercase character";
        $passwordStatus=false;
    
    }
    else if(!/[A-Z]/.test($scope.password)){
        $scope.passwordError = "*Password should conatin one uppercase character";
        $passwordStatus=false;
    }
    else if(!/[0-9]/.test($scope.password)){
        $scope.passwordError = "*Password should conatin one digit";
        $passwordStatus=false;
    }
    else if(!/[!@#$%^&*()_+{}:;<>,.?~]/.test($scope.password)){
        $scope.passwordError = "*Password should conatin one special character!"
        $passwordStatus=false;
    }
    else if (/\s/.test($scope.password)) {
        $scope.passwordError = "*Password should conatin Spaces.!";
        $passwordStatus=false;
    }
     else {
        
        $scope.passwordError = '';
        $passwordStatus=true;
    }
};




$scope.register = function(event){
    event.preventDefault();
    console.log("reg clicked");
    console.log($usernameStatus);
        console.log($passwordStatus);

  
    if($usernameStatus && $passwordStatus){

    $http({
        method: 'POST',
        url: './api/register.php',
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
                $state.go("login");
            } else {
                alert($responseData.message);
            }
           
    
          }, function failure(err) {
            return err;
          })
          .catch(function (error) {
            return error;
          });

        // $http({
        //     method:"POST",
        //     url:"./api/register.php",
        //     data:{
        //         username:$scope.username,
        //         password:$scope.password
        //     }
        // }).success(function(response){
        //         $responseData= response.data;
        //         console.log($responseData);
        //         if ($responseData.status) {
        //             $location.replace("./login.html");
        //         } else {
        //             alert($responseData.message);
        //         }
        //     })
        //     .error(function(error){
        //         confirm.log(error);
        //     })
            // .then(function (response) {
               
            //     $responseData= response.data;
            //     console.log($responseData);
            //     if ($responseData.status) {
            //         $location.replace("./login.html");
            //     } else {
            //         alert($responseData.message);
            //     }
            //   },function (error){
            //     console.log(error);
            //   })
        
            
    
}

}
});