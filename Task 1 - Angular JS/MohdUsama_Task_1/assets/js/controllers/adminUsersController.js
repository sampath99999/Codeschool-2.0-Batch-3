app.controller("adminUsersController", [
  "$scope",
  "$http",
  "$state",
  "WindowControlService",
  "GetUser",
  "AuthService",
  function ($scope, $http, $state, WindowControlService, GetUser, AuthService) {
    $scope.tokenExists = AuthService.checkTokenExists();
    $scope.loader = false;

    if (!$scope.tokenExists) {
      $state.go("login");
      return;
    }
    GetUser.getUserStatus().then(function (response) {
      if (!response.data.admin) {
        $state.go("categories");
        return;
      }
    });
    $scope.curPage = "Users";
    $scope.width = "me-3 size-half";
    $scope.size = WindowControlService.getValue();
    $scope.$watch(
      function () {
        return WindowControlService.getValue();
      },
      function (newVal, oldVal) {
        $scope.width = $scope.width == "me-3 size-half" ? "" : "me-3 size-half";
      }
    );

    const editingUser = [];
    $scope.loader = true;
    $http({
      method: "GET",
      url: "./api/adminGetUsers.php",
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        $scope.loader = false;
        data = response.data;
        $scope.loader = false;
        if (data.status) {
          $scope.users = data.data;
        } else {
          Swal.fire("Got Users.. Got Error on browser");
        }
      })
      .catch(function () {
        $scope.loader = false;
        Swal.fire("Unauthorized Access");
      });

    $scope.removeUser = function (id, index) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          $http({
            method: "POST",
            url: "./api/adminRemoveUser.php",
            data: { id: id },
            headers: { "Content-Type": "application/json" },
          })
            .then(function (response) {
              if (response.data.status) {
                $scope.users.splice(index, 1);
                Swal.fire(
                  "Deleted!",
                  "User has been successfully deleted.",
                  "success"
                );
              } else {
                Swal.fire(
                  "Error While Removing User... Try Removing all the current user Orders first"
                );
              }
            })
            .catch(function (error) {
              Swal.fire("Error", error.data.message, "error");
            });
        }
        
      });
    };
    $scope.cancelEdit = function (user, index) {
      $scope.users[index] = angular.copy(editingUser[index]);
      user.editing = false;
    };
    $scope.toggleEdit = function (user, index) {
      if (user.editing) {
        $scope.saveUser(user, index);
      }
      editingUser[index] = angular.copy(user);
      user.editing = !user.editing;
    };
    $scope.saveUser = function (user, index) {
      $scope.loader = true;
      user.is_active = user.is_active === "true";
      $http({
        method: "POST",
        url: "./api/adminEditUsers.php",
        data: user,
        headers: { "Content-Type": "application/json" },
      }).then(function (response) {
        console.log(response);
        $scope.loader = false;
        if (response.status) {
          Swal.fire("Successfully Updated user");
        } else {
          $scope.users[index] = angular.copy(editingUser[index]);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Seems like user was not updated successfully... Try again",
          });
        }
      });
    };
  },
]);
