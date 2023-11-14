myApp.config([
  "$stateProvider",
  "$urlRouterProvider",
  function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
      .state("login", {
        url: "/login",
        templateUrl: "./templates/login.html",
        controller: "login",
      })
      .state("main", {
        url: "/main",
        templateUrl: "./templates/main.html",
        controller: "main",
      })
      .state({
        name: "register",
        url: "/register",
        templateUrl: "./templates/register.html",
        controller: "register",
      })
      .state("dashboard", {
        url: "/dashboard",
        templateUrl: "./templates/dashboard.html",
        controller: "login",
      })
      .state("sentMails", {
        url: "/sentMails",
        templateUrl: "./templates/sentMails.html",
        controller: "dashboard",
      });
    $urlRouterProvider.otherwise("/main");
  },
]);
