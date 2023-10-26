app.controller("adminAddCategoriesController", [
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
    $scope.curPage = "Add Categories";
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
    $scope.filesChanged = function (ele) {
      $scope.file = ele.files[0];
      $scope.$apply();
    };
    $scope.addCategory = function () {
      $scope.loader = true;
      const formData = new FormData();
      formData.append("name", $scope.name);
      formData.append("image", $scope.file);
      Swal.fire({
        title: "Please Wait !",
        html: "Adding Category...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      $http({
        method: "POST",
        url: "./api/adminAddCategories.php",
        data: formData,
        headers: {
          "Content-Type": undefined,
        },
        transformRequest: angular.identity,
      })
        .then(function (response) {
          Swal.close();
          $scope.name = "";
          $scope.image = null;
          $scope.loader = false;
          if (response.data.status) {
            Swal.fire("Category Added Successfully");
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Seems like Category was added, but something went wrong... Try Reloading to See Changes",
            });
          }
        })
        .catch(function (response) {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Seems like Category was not updated successfully... Try again",
          });
        });
    };
  },
]);
