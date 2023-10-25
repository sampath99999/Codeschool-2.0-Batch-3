app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state("login", {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: "LoginCtrl",
    })
    .state("home", {
      url: "/",
      templateUrl: "templates/home.html",
      controller: "HomeCtrl",
    })
    .state("broHome", {
      url: "/bro/home",
      templateUrl: "templates/broHome.html",
    })
    .state("Add HOA",{
      url:"/bro/Add-HOA",
      templateUrl:"templates/broAddHoa.html",
      controller:"BroAddHoaCtrl"
    })
  $urlRouterProvider.otherwise("/");
});
