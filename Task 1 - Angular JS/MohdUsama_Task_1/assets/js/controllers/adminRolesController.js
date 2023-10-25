app.controller("adminRolesController", [
  "$scope",
  "$http",
  "$state",
  "$timeout",
  "WindowControlService",
  "GetUser",
  "AuthService",
  function (
    $scope,
    $http,
    $state,
    $timeout,
    WindowControlService,
    GetUser,
    AuthService
  ) {
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
    $scope.curPage = "Roles";
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

    $scope.showRoleModal = async function () {
      const inputValue = "";
      const { value: role } = await Swal.fire({
        title: "Enter New Role",
        input: "text",
        inputLabel: "New Role?",
        inputValue: inputValue,
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to write a Role!";
          }
        },
      });

      if (role) {
        $scope.loader = true;
        $http({
          method: "POST",
          url: "./api/adminAddRoles.php",
          data: { role: role },
          headers: { "Content-Type": "application/json" },
        })
          .then(function (response) {
            $scope.loader = false;
            const status = response.data.status;
            if (status === true) {
              $scope.roles.push({
                id: response.data.id.id,
                role: role,
              });
              Swal.fire("Successfully Added Role");
            } else {
              console.log("else");
              Swal.fire("Couldn't Add Role.. Please Try Again");
            }
          })
          .catch(function (response) {
            Swal.fire("Couldn't Add Role.. Please Try Again");
          });
      }
    };

    $scope.removeRole = function (id, index) {
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
            url: "./api/adminRemoveRole.php",
            data: { id: id },
            headers: { "Content-Type": "application/json" },
          })
            .then(function (response) {
              if (response.data.status) {
                $scope.roles.splice(index, 1);
                Swal.fire("Deleted!", "Role has been deleted.", "success");
              } else {
                Swal.fire(
                  "Failed To remove Role please Check if there are users associated with the role"
                );
              }
            })
            .catch(function (error) {
              Swal.fire("Error", error.data.message, "error");
            });
        }
      });
    };

    $scope.addRole = function (role) {
      $http({
        method: "POST",
        url: "./api/adminAddRoles.php",
        data: role,
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          if (response.data.status) {
            $scope.roles.append({
              id: response.data.data,
              role: role,
            });
            Swal.fire("Successfully Added Role");
          } else {
            Swal.fire("Couldn't Add Role.. Please Try Again");
          }
        })
        .catch(function (response) {
          Swal.fire("Couldn't Add Role.. Please Try Again");
        });
    };
  },
]);
