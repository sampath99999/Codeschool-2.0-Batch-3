app.service("GetUser", function ($http) {
  this.getUserStatus = function () {
    token = localStorage.getItem("token");
    return $http.post("./api/authUser.php", { token: token });
  };
});
