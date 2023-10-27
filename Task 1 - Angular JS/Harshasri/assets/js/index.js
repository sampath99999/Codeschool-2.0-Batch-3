const myApp = angular.module("myApp", ['ui.router']);

myApp.run(function($rootScope) {
    $rootScope.isLoading = false;
});