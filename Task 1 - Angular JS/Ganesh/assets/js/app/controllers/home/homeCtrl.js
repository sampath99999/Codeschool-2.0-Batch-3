app.controller("homeController", function($scope, $window, $rootScope, $location, $timeout, $http, $state){

    // If user is not present goto login.
    if(!($window.localStorage.getItem("token"))){
        $location.path("/authentication").replace();
    }

    // Home ctrl scope.
    $scope.home = true;
    $scope.quiz = false;
    $scope.finalScore = false;
    $scope.fullScreen = false;
    $scope.leaderBoard = false;
    $scope.userQuizAnswers = {
        "question_id": [],
        "answer": []
    };
    $scope.score = 0;
    $scope.scoreBoard = [];
    $scope.inBoard = false;

    $scope.username = $window.localStorage.getItem("name");

    // Rootscope.
    $rootScope.displayLoader = true;   
    
    
    // Check user.
    $http.post("./api/user.php", {
        "token" : $window.localStorage.getItem("token")
    }).then(function successCallback(response){

        let jsonData = response.data;

        if(!(jsonData["status"])){

            $rootScope.displayLoader = false;
            $scope.home = true;
            $scope.quiz = false;
            $scope.finalScore = false;
            $scope.leaderBoard = false;
            $scope.fullScreen = false;

            alert(jsonData['message']);

        } else {

            // console.log(jsonData['data'])
            if(jsonData['data'][0]['role_id'] == 1){
                $state.go("admin");
            }

            $rootScope.displayLoader = false;
            $scope.home = true;
            $scope.quiz = false;
            $scope.finalScore = false;
            $scope.leaderBoard = false;
            $scope.fullScreen = false;

        }

    }, function errorCallback(error){
        console.log(error);
    }).catch(function (exception){
        console.log(exception);
    })


    // OFF the loader.
    $timeout(()=>{
        $rootScope.displayLoader = false;
    }, 1000);


    // Submit the answers and call API.
    function submitQuiz(){

        $rootScope.displayLoader = true;

        console.log($scope.userQuizAnswers);

        $http.post("./api/result.php", { 
            "quiz_data" : $scope.userQuizAnswers,
            "token" : $window.localStorage.getItem("token")
        }).then(function successCallback(response){

            let jsonData = response.data;

            if(!(jsonData["status"])){

                $rootScope.displayLoader = false;
                $scope.home = true;
                $scope.quiz = false;
                $scope.finalScore = false;
                $scope.leaderBoard = false;
                $scope.fullScreen = false;

                alert(jsonData['message'] );

            } else {

                $scope.score = jsonData['data'];

                $rootScope.displayLoader = false;
                $scope.home = false;
                $scope.quiz = false;
                $scope.finalScore = true;
                $scope.leaderBoard = false;
                $scope.fullScreen = true;

            }

        }, function errorCallback(error){
            console.log(error);
        }).catch(function (exception){
            console.log(exception);
        });
    }

    // On user click the option.
    $scope.userAnswer = function (question_id, answer){

        $("#nextQuestion").removeAttr("disabled");

        if(($scope.userQuizAnswers['question_id']).includes(question_id)){

            $scope.userQuizAnswers['question_id'].splice(-1, 1);
            $scope.userQuizAnswers['answer'].pop();

        }

        $scope.userQuizAnswers['question_id'].push(question_id);
        $scope.userQuizAnswers['answer'].push(answer);

    }

    // working......................................
    async function loadPanel (questions, answers){

        const keys = Object.keys(questions);
        let currentIndex = 0;

        function nextCallback(result) {
            if (result === true) {

                $("#nextQuestion").attr("disabled", "");

                currentIndex++;

                if(currentIndex == 9){
                    $("#nextQuestion").text("Submit");
                    $("#nextQuestion").off("click"); // Remove the click event handler to prevent further clicks
                    $("#nextQuestion").click(() => {
                      submitQuiz();
                    });
                }
                
                
                if (currentIndex < keys.length) {

                    $scope.questions = questions[keys[currentIndex]];
                    $scope.answers = answers[keys[currentIndex]];

                } 

            }
        }

        $scope.next = nextCallback;

        $scope.questions = questions[keys[currentIndex]];
        $scope.answers = answers[keys[currentIndex]];

        while (currentIndex < keys.length) {
            await new Promise((resolve) => {
            // This will be resolved when nextCallback is called.
            // You may also add a timeout or other handling for non-responding cases.
            });
        }

        // Reset $scope.next to avoid further callbacks if needed.
        $scope.next = null;

    }

    // ON starting the game
    $scope.getQuizzes =  function () {

        let token = $window.localStorage.getItem("token");

        $rootScope.displayLoader = true;

        $http.post("./api/quiz.php", { token })
        .then(function successCallback(response){

            let jsonData = response.data;
            // console.log(jsonData);
            if(!(jsonData["status"])){

                $rootScope.displayLoader = false;
                $scope.home = true;
                $scope.quiz = false;
                $scope.finalScore = false;
                $scope.leaderBoard = false;
                $scope.fullScreen = false;

                alert(jsonData['message']);

            } else {

                let questions = jsonData['data'][0];
                let answers = jsonData['data'][1];

                $rootScope.displayLoader = false;
                $scope.home = false;
                $scope.quiz = true;
                $scope.finalScore = false;
                $scope.leaderBoard = false;
                $scope.fullScreen = true;

                loadPanel(questions, answers); 

            }

        }, function errorCallback(error){
            console.log(error);
        }).catch(function (exception){
            console.log(exception);
        });
    }

    // On click of leaderboard.
    $scope.getLeaderboard = function () {

        let token = $window.localStorage.getItem("token");

        $rootScope.displayLoader = true;

        $http.post("./api/leaderboard.php", { token })
        .then(function successCallback(response){

            let jsonData = response.data;

            if(!(jsonData["status"])){

                $rootScope.displayLoader = false;
                $scope.home = true;
                $scope.quiz = false;
                $scope.finalScore = false;
                $scope.leaderBoard = false;
                $scope.fullScreen = false;

                alert(jsonData['message']);

            } else {

                $scope.scoreBoard = jsonData['data'];

                $rootScope.displayLoader = false;
                $scope.home = false;
                $scope.quiz = false;
                $scope.finalScore = false;
                $scope.leaderBoard = true;
                $scope.fullScreen = false;
                $scope.inBoard = true;


            }

        }, function errorCallback(error){
            console.log(error);
        }).catch(function (exception){
            console.log(exception);
        });


    }

    // On user logout.
    $scope.removeCredentials = function () {
        
        let token = $window.localStorage.getItem("token");

        $http({
            method: "POST",
            url: "./api/logout.php",
            data: { token }
        }).then(function successCallback(response) {

            let logData = response.data;

            if (logData['status']) {

                $rootScope.displayLoader = true;

                $window.localStorage.removeItem("token");
                $window.localStorage.removeItem("name");

                if ($window.localStorage.getItem("token")) {
                    console.log("Unable to logout!" + logData['message']);
                }

                $location.path("/authentication").replace();

            } else {

                console.log("Unable to logout. Please try again.");

            }

        },
            function errorCallback(error) {

                console.log(error);

            }).catch(function (exception) {

                console.log(exception);

            });
    }
    


})