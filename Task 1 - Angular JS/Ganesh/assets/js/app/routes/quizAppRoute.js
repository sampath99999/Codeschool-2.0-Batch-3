app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider.state({
        name: 'home',
        url: "/home",
        templateUrl: "./templates/home/home.html",
        controller : "homeController"
    })
    .state({
        name: 'authentication',
        url: "/authentication",
        templateUrl: "./templates/auth/auth.html",
        controller : "authController"
    })
    .state({
        name: 'admin',
        url: "/admin",
        templateUrl: "./templates/admin/admin.html",
        controller : "adminController"
    })

    $urlRouterProvider.otherwise("/authentication"); 

})