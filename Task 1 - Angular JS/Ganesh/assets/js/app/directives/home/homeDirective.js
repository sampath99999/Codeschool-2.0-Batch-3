app.directive("mainContainer", function(){
    return {
        restrict: "EAC",
        templateUrl: './templates/home/homeContainer.html'
    };
});

app.directive("quizContainer", function(){
    return {
        restrict: "EAC",
        templateUrl: './templates/home/qaPanel.html'
    };
});

app.directive("finalScoreContainer", function(){
    return {
        restrict: "EAC",
        templateUrl: './templates/home/finalScore.html'
    };
});

app.directive("leaderContainer", function(){
    return {
        restrict: "EAC",
        templateUrl: './templates/home/leaderboard.html'
    }
})
