app.controller("adminController", function($scope, $rootScope, $timeout, $window, $location, $http){

    // If user is not present goto login.
    if(!($window.localStorage.getItem("token"))){
        $location.path("/authentication").replace();
    }

    $rootScope.displayLoader = true;


    // username.
    $scope.username = $window.localStorage.getItem("name");

    // admin controller scope.
    $scope.topic = null;
    $scope.question = '';
    $scope.optionA = '';
    $scope.optionB = '';
    $scope.optionC = '';
    $scope.optionD = '';
    $scope.correct = '';
    $scope.answers = [];
    
    $scope.adminData = {}
   
    // OFF the loader.
    $timeout(()=>{
        $rootScope.displayLoader = false;
    }, 1000);


    // *********************************************************************
    // Topic name Validation function...
    $scope.validateTopic = function(){

        let topic = $scope.topic;
        $scope.topicError = true;

        // Validating Conditions.
        if(topic == null){
            $scope.topicFeedback = "Please select the option !";
            return $scope.topicError;
        } else {
            $scope.topicError = false;
            return $scope.topicError;
        }
    }

    // Question Validation function...
    $scope.validateQuestion = function(){

        let question = $scope.question;
        $scope.questionError = true;

        // Validating Conditions.
        if(question == ''){
            $scope.questionFeedback = "Please add a question !";
            return $scope.questionError;
        } else {
            $scope.questionError = false;
            return $scope.questionError;
        }
    }

    // Option A Validation function...
    $scope.optionAValidate = function(){

        let optA = $scope.optionA;
        $scope.optionAError = true;

        // Validating Conditions.
        if(optA == ''){
            $scope.optionAFeedback = "Please add an option A!";
            return $scope.optionAError;
        } else {
            $scope.optionAError = false;
            return $scope.optionAError;
        }
    }

    // Option B Validation function...
    $scope.optionBValidate = function(){

        let optB = $scope.optionB;
        $scope.optionBError = true;

        // Validating Conditions.
        if(optB == ''){
            $scope.optionBFeedback = "Please add an option B!";
            return $scope.optionBError;
        } else {
            $scope.optionBError = false;
            return $scope.optionBError;
        }
    }

    // Option C Validation function...
    $scope.optionCValidate = function(){

        let optC = $scope.optionC;
        $scope.optionCError = true;

        // Validating Conditions.
        if(optC == ''){
            $scope.optionCFeedback = "Please add an option C!";
            return $scope.optionCError;
        } else {
            $scope.optionCError = false;
            return $scope.optionCError;
        }
    }

    // Option D Validation function...
    $scope.optionDValidate = function(){

        let optD = $scope.optionD;
        $scope.optionDError = true;

        // Validating Conditions.
        if(optD == ''){
            $scope.optionDFeedback = "Please add an option D!";
            return $scope.optionDError;
        } else {
            $scope.optionDError = false;
            return $scope.optionDError;
        }
    }

    // Answer Validation function...
    $scope.answerValidate = function(){

        let answer = $scope.correct;
        $scope.answerError = true;
        $scope.answerFeedback = '';

        // Validating Conditions.
        if(answer == ''){
            $scope.answerFeedback = "Please select an answer !";
            return $scope.answerError;
        } else {

            const option = ['A', 'B', 'C', 'D'];
            $scope.answers = [];

            option.forEach(element => {
                if(answer == element){
                    $scope.answers.push(true);
                } else {
                    $scope.answers.push(false);
                }
            });

            $scope.answerError = false;
            return $scope.answerError;
        }
    }

    // Validate submit the details and call API.
    $scope.validateSubmit = function () {

        let validations = [];
        let count = 0;

        validations.push($scope.validateTopic());
        validations.push($scope.validateQuestion());
        validations.push($scope.optionAValidate());
        validations.push($scope.optionBValidate());
        validations.push($scope.optionCValidate());
        validations.push($scope.optionDValidate());
        validations.push($scope.answerValidate());

    
        validations.forEach(bool => {
            if(!bool){
                count++;
            }
        });
        
        if(validations.length == count){

            $scope.adminData = {
                "topic" : $scope.topic,
                "question" : $scope.question,
                "option" : [
                    $scope.optionA,
                    $scope.optionB,
                    $scope.optionC,
                    $scope.optionD
                ],
                "correct" : $scope.answers
            }
            
            $rootScope.displayLoader = true;

            $http.post("./api/admin.php", $scope.adminData)
            .then(function successCallback(response){

                let jsonData = response.data;

                if(!(jsonData["status"])){
                    $rootScope.displayLoader = false;

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                    });
                    
                } else {
                    $rootScope.displayLoader = false;

                    Swal.fire(
                        'Good job!',
                        'Your Question added successfully!',
                        'success'
                    );

                    $scope.topic = null;
                    $scope.question = '';
                    $scope.optionA = '';
                    $scope.optionB = '';
                    $scope.optionC = '';
                    $scope.optionD = '';
                    $scope.correct = '';

                }

            }, function errorCallback(error){
                console.log(error);
            }).catch(function (exception){
                console.log(exception);
            })    


        }
    }

});