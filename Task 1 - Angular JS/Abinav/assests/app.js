const myApp = angular.module("myApp", ["ui.router"]);

myApp.config([
  "$httpProvider",
  function ($httpProvider) {
    $httpProvider.interceptors.push("tokenInterceptor");
  },
]);

myApp.factory("tokenInterceptor", [
  "$window",
  "$state",
  function ($window, $state) {
    console.log("interceptor invoked");
    return {
      request: function (config) {
        var token = $window.localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = "Bearer " + token;
        }
        return config;
      },
      response: function (response) {
        console.log(response);
        if (response.data.status === 401) {
          console.log("check");
          $state.go("login");
        }
        return response;
      },
    };
  },
]);

myApp.directive("loader", function () {
  return {
    template: `
        <div  ng-class={"d-none":loader}>
          <div class="spinner-grow text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow text-success" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow text-warning" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow text-info" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          
        </div>
      `,
  };
});
