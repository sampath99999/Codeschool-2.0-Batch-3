financeApp.controller("MainController", ["$scope", '$location', function ($scope, $location) {
    $scope.name = "financeApp"
    $scope.newDate = new Date();
    var access_token = localStorage.getItem("access_token");
    if (!access_token) {
        $location.path("/login")
        return
    }
}])