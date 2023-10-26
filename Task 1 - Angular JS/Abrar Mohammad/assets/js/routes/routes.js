financeApp.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state("login", {
        url: "/login",
        templateUrl: 'templates/login.html',
        controller: "LoginController"
    }).state("home", {
        url: "/",
        templateUrl: "templates/homePage.html",
        controller: "MainController"
    }).state("budgetRelease", {
        url: "/budgetRelease",
        templateUrl: "templates/budgetReleaseOrder.html",
        controller: "BudgetReleaseOrderController"
    }).state("Add HOA", {
        url: "/addHOA",
        templateUrl: "templates/addHOA.html",
        controller: "AddHOAController"
    }).state("HOAList", {
        url: "/HOAList",
        templateUrl: "templates/HOAList.html",
        controller: "HOAListController"
    })

    $urlRouterProvider.otherwise("/")
}])