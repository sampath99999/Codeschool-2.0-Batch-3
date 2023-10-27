myApp.config(function($stateProvider, $urlRouterProvider){
    $stateProvider.state({
        name:'profile',
        url:'/profile',
        templateUrl:'templates/profile.html'
    })
    .state({
        name: "home",
        url: "/",
        templateUrl: "templates/home.html",
        controller:"validationController"
    })
    .state({
        name: "logout",
        url: "/logout",
        templateUrl: "templates/login.html",
        
    })
    .state({
        name: "login",
        url: "/login",
        templateUrl: "templates/login.html",
        constroller:"loginController"
        
    })
    .state({
        name: "register",
        url: "/register",
        templateUrl: "templates/register.html",
        controller:"registerController"
        
    })
    $urlRouterProvider.otherwise("/"); 
});