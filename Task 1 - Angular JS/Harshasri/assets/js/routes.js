myApp.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
    .state({
        name: "home",
        url: "/",
        templateUrl: "templates/home.html",
        controller:"homeController"  
    })
   
    .state({
        name: "register",
        url: "/register",
        templateUrl: "templates/register.html"
        // controller:"registerController"
        
    })
    .state({
        name: "login",
        url: "/login",
        templateUrl: "templates/login.html"
        // controller:"registerController"
        
    })
    .state({
        name: "logout",
        url: "/logout",
        templateUrl: "templates/login.html",
        
    })
    $urlRouterProvider.otherwise("/"); 
});