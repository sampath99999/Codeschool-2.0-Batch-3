financeApp.controller("HomePageController", ['$scope', '$location', function ($scope, $location) {
    $scope.newDate = new Date();
    var access_token = localStorage.getItem("access_token");
    if (!access_token) {
        $location.path("/login")
        return
    }
}])