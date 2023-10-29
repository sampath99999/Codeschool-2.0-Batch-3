const app = angular.module("quizApp", ['ui.router']);

app.run(function($rootScope){
    // Elements scope.
    $rootScope.displayLoader = true;
    $rootScope.loginAuth = false;
    $rootScope.registerName = false;
    $rootScope.registerChoice = false;
    $rootScope.registerUser = false;

    // JSON Register Data.
    $rootScope.registerData = {
        "first_name": '',
        "last_name": '',
        "interests": {}
    }
});

// app.config(function($httpProvider){
//     $httpProvider.interceptors.push(function($q){
//         return{
//             request: function (config) {
//                 console.log(config);
//             }, 
//             requestError: function (rejection) {
//                 return $q.reject(rejection);
//             },
//             response: function (result) {
//                 console.log(result);
//             },
//             responseError: function (response) {
//                 return $q.reject(response); 
//             }
//         }   
//     })
// });