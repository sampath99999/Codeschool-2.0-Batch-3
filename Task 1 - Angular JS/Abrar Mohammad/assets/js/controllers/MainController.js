financeApp.controller("MainController", ["$scope", '$location', '$rootScope', function ($scope, $location, $rootScope) {
    $scope.name = "financeApp"
    $scope.newDate = new Date();
    var access_token = localStorage.getItem("access_token");
    if (!access_token) {
        $location.path("/login")
        return
    }

    $rootScope.showLoader = false

    $rootScope.logout = function () {
        localStorage.removeItem("access_token")
        $location.path("/login")
    }

}])