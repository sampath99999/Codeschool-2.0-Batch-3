app.service("AuthService", function () {
  let admin = false;
  this.checkTokenExists = function () {
    const token = localStorage.getItem("token");
    return !!token;
  };
  this.setAdmin = function () {
    admin = true;
  };
  this.getAdmin = function () {
    return admin;
  };

});
