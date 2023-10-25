myApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: 'Home',
        url: "/",
        templateUrl: "../Templates/home.html",
        controller: "mainCtrl"
        
    })
    .state({
        name:'login',
        url:"/login",
        templateUrl:"../Templates/login.html",
        controller:"LoginController"
        
    })
    .state({
        name:'registration',
        url:"/registration",
        templateUrl:"../Templates/registration.html",
        controller:"RegistrationController"
        
    })
    .state({
        name:'product',
        url:"/product",
        templateUrl:"../Templates/productDisplay.html",
        controller: "productlistCtrl"
    })

    .state({
        name:'Cart',
        url:"/cart",
        templateUrl:"../Templates/cart.html",
        controller:"CartCtrl"
        
    })
    .state({
        name:'Cartitems',
        url:"/cartitem",
        templateUrl:"../Templates/cartitems.html",
        controller:"CartCtrl"
        
    })
    .state({
        name:'individual',
        url:"/individualProduct",
        templateUrl:"../Templates/individualProduct.html",
        controller: "individualCtrl"
    })
    .state({
        name:'orders',
        url:"/orders",
        templateUrl:"../Templates/orders.html",
        controller: "orderCtrl"
    })
 
    $urlRouterProvider.otherwise("/");
});
