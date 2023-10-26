app.factory("AuthInterceptor", [
  "$q",
  "$state",
  "AuthService",
  function ($q, $state, AuthService) {
    return {
      response: function (response) {
        if (response.config.url === "./api/login.php") {
          if (response.data.admin) {
            AuthService.setAdmin();
            $state.go("admin");
          }
        }
        return response;
      },
      responseError: function (response) {
        return $q.reject(response);
      },
    };
  },
]);
