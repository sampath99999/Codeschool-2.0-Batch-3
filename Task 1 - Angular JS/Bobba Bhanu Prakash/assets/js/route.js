app.config([
  "$stateProvider",
  "$urlRouterProvider",
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("login", {
        url: "/login",
        templateUrl: "./templates/login.html",
        controller: "LoginController",
      })
      .state("budget", {
        url: "/budget",
        templateUrl: "./templates/budget.html",
        controller: "BudgetController",
      })
      .state("home", {
        url: "/home",
        templateUrl: "./templates/home.html",
        controller: "HomeController",
      })
      .state("addHOA", {
        url: "/addHOA",
        templateUrl: "./templates/addHOA.html",
        controller: "AddHOAController",
      })
      .state("HOAList", {
        url: "/HOAlist",
        templateUrl: "./templates/hoaList.html",
        controller: "HOAListController",
      });
    $urlRouterProvider.otherwise("/login");
  },
]);
