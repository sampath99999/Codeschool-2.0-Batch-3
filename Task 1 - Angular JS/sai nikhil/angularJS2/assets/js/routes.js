inventoryManagementApp.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state({
      name: "dashBoard",
      url: "/",
      templateUrl: "templates/dashBoard.html",
      controller: "DashBoardCtrl",
    })
    .state({
      name: "addParties",
      url: "/addParties",
      templateUrl: "templates/addParties.html",
      controller: "AddPartiesCtrl",
    })
    .state({
      name: "addProducts",
      url: "/addProducts",
      templateUrl: "templates/addProducts.html",
      controller: "AddProductsCtrl",
    })
    .state({
      name: "transactions",
      url: "/transactions",
      templateUrl: "templates/transactions.html",
      controller: "TransactionsCtrl",
    })
    .state({
      name: "login",
      url: "/login",
      templateUrl: "templates/login.html",
      controller: "LoginCtrl",
    });

  $urlRouterProvider.otherwise("/");
});
