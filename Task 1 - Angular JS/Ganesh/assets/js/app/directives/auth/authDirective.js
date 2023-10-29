app.directive("loginAuth", function(){
    return {
        restrict: "EAC",
        templateUrl: './templates/auth/login.html'
    };
});

app.directive("registerName", function(){
    return {
        restrict: "EAC",
        templateUrl: './templates/auth/registerName.html'
    };
});

app.directive("registerChoice", function(){
    return {
        restrict: "EAC",
        templateUrl: './templates/auth/registerChoices.html'
    };
});

app.directive("registerUser", function(){
    return {
        restrict: "EAC",
        templateUrl: './templates/auth/registerUserPass.html'
    };
});