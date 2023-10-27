financeApp.controller("homeHeaderController", ['$scope', "$location", function ($scope, $location) {
    $scope.logout = function () {
        localStorage.removeItem("access_token")
        $location.path("/login")
    }
}])