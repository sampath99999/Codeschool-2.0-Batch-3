app.controller("adminChangeUserRoleController", [
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
    $scope.curPage = "Change User Role";
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
    $scope.loader = false;
    $scope.roles = [];
    function getRoles() {
      $scope.loader = true;
      $http({
        method: "GET",
        url: "./api/adminGetRoles.php",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          data = response.data;
          $scope.loader = false;
          if (data.status) {
            $scope.roles = data.data;
          }
        })
        .catch(function (response) {
          Swal.fire("Failed To get roles");
        });
    }
    getRoles();
    function findUserRole(role) {
      $scope.roles.forEach((r) => {
        if (r.id == role) {
          $scope.curRole = r.role;
        }
      });
    }

    $scope.updateRole = function () {
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Update it!",
      }).then((result) => {
        if (result.isConfirmed) {
          $scope.loader = true;
          $http({
            method: "POST",
            url: "./api/adminUpdateUserRole.php",
            data: { user_id: $scope.userId, role: $scope.newRole },
            headers: { "Content-Type": "application/json" },
          })
            .then(function (response) {
              data = response.data;
              $scope.searchUser = "";
              $scope.changeRole = false;
              $scope.loader = false;
              if (data.status) {
                Swal.fire("Updated!", "Role has been Successfully Updated.", "success");
              } else {
                Swal.fire("Unauthorized Access");
              }
            })
            .catch(function (response) {
              $scope.searchUser = "";
              $scope.changeRole = false;
              $scope.loader = false;
              Swal.fire("Error While Changing User Role");
            });

        }
      });
    };
    $scope.findUser = function () {
      $scope.loader = true;
      const email = $scope.searchUser;
      $http({
        method: "POST",
        url: "./api/adminFindUser.php",
        data: { email: email },
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          $scope.loader = false;
          data = response.data;
          if (data.status) {
            const user = data.data[0];
            $scope.userRole = user.role;
            $scope.userId = user.user_id;
            findUserRole($scope.userRole);
            $scope.changeRole = true;
          } else {
            Swal.fire("Error While Finding User");
          }
        })
        .catch(function (response) {
          $scope.loader = false;
          Swal.fire("Unauthorized Access");
        });
    };
  },
]);
