myApp.controller('mainCtrl', function ($scope, $http) {
    $http.get('./../api/getCategories.php').then(function(response) {
        $scope.categories = response.data;
        console.log($scope.categories);
    }).catch(function(error) {
        console.error("Error fetching categories:", error);
    });
})