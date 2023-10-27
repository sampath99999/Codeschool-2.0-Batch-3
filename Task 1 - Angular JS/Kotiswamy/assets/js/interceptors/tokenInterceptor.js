app.factory("tokenInterceptor", [
  "$window","$state",
  function ($window,$state) {
    return {
      request: function (config) {
        var token = $window.localStorage.getItem("access_token");
        if (token) {
          config.headers.Authorization = "Bearer " + token;
        }
        return config;
      },
      response:function(response){
        if(response.data.message==="Invalid user"){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data['message'],
          });
          $window.localStorage.removeItem("access_token");
          $state.go("login")
          return;
        }
        return response
      }
    };
  },
]);
