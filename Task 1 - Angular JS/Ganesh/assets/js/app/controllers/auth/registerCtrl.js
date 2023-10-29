app.controller("registerCtrl", function($scope, $rootScope, $http, $timeout){

    // Controller Scope.
    $scope.firstName = '';
    $scope.lastName = ''; 
    $scope.hintMessage = "";
    $scope.userName = '';
    $scope.password = '';
    $scope.validData = false;
    $scope.serverMessage = '';


    // User Interest scope.
    $scope.interestMath = false;
    $scope.interestPhysics = false;
    $scope.interestChemistry = false;
    // Error Scope.
    $scope.interestsError = false;


    // *********************************************************************
    // Register User First and Last Name Validation functions...
    // Validate First Name.
    $scope.validateFirstName = function(){
        let name = $scope.firstName;
        $scope.firstNameError = true;

        // Validating Conditions.
        if(name == ''){
            $scope.firstNameFeedback = "First Name is required !";
            return $scope.firstNameError;
        } else {
            $rootScope.registerData['first_name'] = name;
            $scope.firstNameError = false;
            return $scope.firstNameError;
        }
    }

    // Validate Last Name.
    $scope.validateLastName = function(){

        let name = $scope.lastName;
        $scope.lastNameError = true;

        // Validating Conditions.
        if(name == ''){
            $scope.lastNameFeedback = "Last Name is required !";
            return $scope.lastNameError;
        } else {
            $rootScope.registerData['last_name'] = name;
            $scope.lastNameError = false;
            return $scope.lastNameError;
        }
    }

    // On login click validate name.
    $scope.validateName = function(){

        let validations = [];
        let count = 0;

        validations.push($scope.validateFirstName());
        validations.push($scope.validateLastName());
    
        validations.forEach(bool => {
            if(!bool){
                count++;
            }
        });
        
        if(validations.length == count){

            $rootScope.user = $rootScope.registerData['first_name'] + " " + $rootScope.registerData['last_name']

            $rootScope.registerName = false;   
            $rootScope.registerChoice = true;
            
        }

    }

    // *********************************************************************
    // Register User Interests Validation functions...
    // Validate Username.
    $scope.validateInterests = function(){
        let math = $scope.interestMath;
        let physics = $scope.interestPhysics;
        let chemistry = $scope.interestChemistry ;

        // Validating Conditions.
        if(math || physics || chemistry){
            $rootScope.registerData['interests'] = {
                "math" : math,
                "physics" : physics,
                "chemistry" : chemistry
            };
            $rootScope.registerChoice = false;
            $rootScope.registerUser = true;

        } else {         
            $scope.interestsError = true;
            $scope.interestsErrorFeedback = "Please select some of your interests !"
        }
    }


    // *********************************************************************
    // Register username and password Validation functions...
    // Validate Username.
    $scope.validateUserName = function(){
        $scope.serverMessage = '';
        $scope.hintMessage = '';
        let email = $scope.userName;
        $scope.usernameError = true;

        // Validating Conditions.
        if(email == ''){       
            $scope.userNameFeedback = "Email is required !";
            return $scope.usernameError;
        } 
        else if((email.match(/\.\./))){   
            $scope.userNameFeedback = "Consecutive dots are not allowed !";
            return $scope.usernameError;
        }
        else if((email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]{2,})\.([a-zA-Z]{2,5})$/))){
            $scope.usernameError = false;
            return $scope.usernameError;
        }
        else {
            $scope.userNameFeedback = "Domain is invalid !";
            return $scope.usernameError;
        }
    }

    // Validate Password.
    $scope.validatePassword = function(){

        $scope.serverMessage = '';
        let strongPassRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
        let password = $scope.password;
        $scope.passwordError = true;

        // Validating Conditions.
        if(password == ''){

            $scope.passwordFeedback = "Please add the password !";
            return $scope.passwordError;
        }
        else if(!(password.match(strongPassRegex))){

            $scope.passwordFeedback = "Password should contain one A-Z, one a-z, one 0-9 and one special character (e.g., !, @, #, $, %, etc.) !";
            return $scope.passwordError;
        }
        else {
            $scope.passwordError = false;
            return $scope.passwordError;
        }

        
    }

    // Show Hint.
    $scope.showHint = function() {
        $scope.hintMessage = "❕Enter a valid Email address as your username";
    }

    // Hide Hint.
    $scope.hideHint = function() {
        $scope.hintMessage = "";
    }

    // On login click validate name.
    $scope.validateRegisterUser = function(){

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

            $scope.validData = true;
            $scope.registerValidData = $rootScope.registerData;

            $scope.registerValidData.username = $scope.userName;
            $scope.registerValidData.password = $scope.password;


            $http.post("./api/register.php", $scope.registerValidData)
            .then(function successCallback(response){

                let jsonData = response.data;

                if(!(jsonData["status"])){
                    $scope.serverMessage = jsonData['message'];
                    $scope.validData = false;

                } else {
                    $scope.validData = false;
                    $scope.serverMessage = jsonData['message'];
                    $timeout(()=>{
                        $rootScope.loginAuth = true;
                        $rootScope.registerName = false;
                        $rootScope.registerChoice = false;
                        $rootScope.registerUser = false;
                    }, 2000);
                    $("#registerUser").removeAttr("checked");
                    $("#loginUser").attr("checked", "");

                }

            }, function errorCallback(error){
                console.log(error);
            }).catch(function (exception){
                console.log(exception);
            })    
            
        }

    }
   
})