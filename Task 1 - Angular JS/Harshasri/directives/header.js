myApp.directive(
    'headerDirective', [function () {
        return {
            restrict: 'E',
            controller: 'headerController',
            templateUrl: './templates/header.html'
        }
}]);