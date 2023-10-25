app.factory("AdminAuthInterceptor", [
  "$q",
  "$window",
  function ($q, $window) {
    return {
      request: function (config) {
        if (config.url.startsWith("./api/admin")) {
          const token = $window.localStorage.getItem("token");
          if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
          } else {
            return;
          }
        }
        return config;
      },

      response: function (response) {
        return response;
      },

      responseError: function (rejection) {
        return $q.reject(rejection);
      },
    };
  },
]);
