myApp.controller('loginController',function($scope,$http,$state,$rootScope){
    $rootScope.isLoading=false;
    $scope.userId = localStorage.getItem("userId");
    if ($scope.userId) {
        $state.go("home");
      }
   
  
        $scope.email="";
        $scope.password="";
       
      
    
        $scope.login=function(){
            $rootScope.isLoading=true;
            $scope.emailError="";
        
            $scope.passwordError="";
    
            //email
            emailFormat = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
            if($scope.email==""){
                $scope.emailError="*Email Should not be Empty!";
                return false;
            }
            if(!emailFormat.test($scope.email)){
                $scope.emailError="*Email format is not matched!";
                return false;
            }
            if($scope.email.length > 50){
                $scope.emailError="*Email should be less than 50 characters!";
                return false;
            }
            //password
            if($scope.password==""){
                $scope.passwordError="*Password Should not be Empty!";
                return false;
            }
            if ($scope.password.length < 8 || $scope.password.length > 30) {
                $scope.passwordError = "Password should be at least 8 characters and at most 30 characters";
                return false;
            }
            if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test($scope.password))){
                $scope.passwordError = "*Password not matched!";
                return false;
            }
    
           
    
            $http({
                method: 'POST',
                url: './api/login.php',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    email:$scope.email,
                    password:$scope.password
                  
                   
                }
            })
                .then(function success(response) {
                    $rootScope.isLoading=false;
                    console.log(response);
                    console.log("success");
                    $scope.responseData= response.data;
                    console.log($scope.responseData.data);
                 
                    if (response.data.status) {
                        console.log("hi"+response.data.data)
                        $scope.userId = response.data.data;
                        localStorage.setItem("userId", $scope.userId);
                        
                        
                          $state.go("home");
                      }
                    else {
                        alert($responseData.message);
                    }
                   
            
                  }, function failure(err) {
                    return err;
                  })
                  .catch(function (error) {
                    return error;
                  })
                  .finally(function(){
                    $rootScope.isLoading=false;
                  });
    
    
    
    
        
        }
    
   
    
})