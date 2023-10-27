myApp.controller("registerContoller",function($scope,$http,$state,$rootScope){
    $rootScope.isLoading=false;
    $scope.userId = window.localStorage.getItem("userId");
    if ($scope.userId) {
      $state.go("home");
    }

    $scope.name="";
    $scope.email="";
    $scope.password="";
    $scope.dob="";
    $scope.phoneNumber="";
   

    $scope.register=function(){
        $rootScope.isLoading=true;

        $scope.nameError="";
        $scope.emailError="";
    
        $scope.passwordError="";
    
        $scope.phoneNumberError="";
       
        if($scope.name==""){
            $scope.nameError="*Name Should not be Empty!";
            return false;
        }
        if ($scope.name.length < 3 || $scope.name.length > 25) {
            $scope.nameError = "Name should be at least 3 characters and at most 25 characters";
            return false;
        }
        if(!(/^[A-Za-z\s]*$/.test($scope.name))){
            $scope.nameError = "*Name should contain only alphabets!";
            return false;
        }
       

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

        //phoneNumber

        if($scope.phoneNumber==""){
            $scope.phoneNumberError="*PhoneNumber Should not be Empty!";
            return false;
        }
        if(!(/^[0-9]+$/.test($scope.phoneNumber))){
            $scope.phoneNumberError = "*PhoneNumber should contain only Numbers!";
            return false;
        }
        if ($scope.phoneNumber.length !=10) {
            $scope.phoneNumberError = "PhoneNumber should be 10 digits!";
            return false;
        }
       
     

        $http({
            
            method: 'POST',
            url: './api/register.php',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {name:$scope.name,
                password:$scope.password,
                email:$scope.email,
                phoneNumber:$scope.phoneNumber,
                dob:$scope.dob

               
            }
        })
            .then(function success(response) {
                $rootScope.isLoading=false;
                console.log(response);
                console.log("success");
                $responseData= response.data;
                console.log($responseData);
                if ($responseData.status) {
                    console.log($responseData.status);
                    $state.go("login");
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
