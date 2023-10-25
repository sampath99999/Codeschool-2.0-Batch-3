
app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: 'home',
        url: "/",
        templateUrl: "./dashboard/home.html",
        controller: "homeController"
    })
        .state({
            name: "login",
            url: "/login",
            templateUrl: "./dashboard/login.html",
            controller: "loginController"
        })
        .state({
            name: "register",
            url: "/register",
            templateUrl: "./dashboard/register.html",
            controller: "registerController"
        })
        .state({
            name: "admin",
            url: "/admin",
            templateUrl: "./dashboard/admin.html",
            controller: "adminController"
        })
        .state({
            name: "levelSelection",
            url: "/levelSelection/:subjectId",
            templateUrl: "./dashboard/levelSelection.html",
            controller: "levelController"
        })
        .state({
            name: "detailedView",
            url: "/detailedView/:subjectId/:levelId",
            templateUrl: "./dashboard/detailview.html",
            controller: "detailedViewController"
        })
        .state({
            name: "leaderBoard",
            url: "/leaderBoard",
            templateUrl: "./dashboard/leaderBoard.html",
            controller: "leaderBoardController"
        })
        .state({
            name: "history",
            url: "/history",
            templateUrl: "./dashboard/history.html",
            controller: "historyController"
        })
        .state({
            name: "result",
            url: "/result/:subjectId/:levelId/:score",
            templateUrl: "./dashboard/result.html",
            controller: "resultController"
        })

    $urlRouterProvider.otherwise("/");
})