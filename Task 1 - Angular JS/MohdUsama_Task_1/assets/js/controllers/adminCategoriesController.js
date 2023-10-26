app.controller("adminCategoriesController", [
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
    $scope.curPage = "Categories";
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
    const editingCategory = [];
    $scope.loader = true;
    function loadCategories() {
      $http
        .get("./api/getCategories.php")
        .then(function (res) {
          $scope.categories = res.data;
          $scope.loader = false;
        })
        .catch(function (error) {
          console.error("Failed to fetch categories: " + error);
        });
    }
    loadCategories();

    $scope.cancelEdit = function (category, index) {
      $scope.categories[index] = angular.copy(editingCategory[index]);
      category.editing = false;
    };
    $scope.toggleEdit = function (category, index) {
      if (category.editing) {
        $scope.saveCategory(category, index);
      }
      editingCategory[index] = angular.copy(category);
      category.editing = !category.editing;
    };
    $scope.saveCategory = function (category, index) {
      $scope.loader = true;
      $http({
        method: "POST",
        url: "./api/adminEditCategories.php",
        data: category,
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          $scope.loader = false;
          if (response.status) {
            Swal.fire("Successfully Updated Category");
          } else {
            $scope.categories[index] = angular.copy(editingCategory[index]);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Seems like category was not updated successfully... Try again",
            });
          }
        })
        .catch(function (response) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Seems like category updated but caught error... Try Reloading to see changes",
          });
        });
    };
    $scope.removeCategory = function (id, index) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        $scope.loader = true;
        if (result.isConfirmed) {
          $http({
            method: "POST",
            url: "./api/adminDeleteCategories.php",
            data: { id: id },
            headers: { "Content-Type": "application/json" },
          })
            .then(function (response) {
              $scope.loader = false;
              data = response.data;
              if (data.status) {
                $scope.categories.splice(index, 1);
                Swal.fire("Deleted!", "Category has been deleted.", "success");
              } else {
                Swal.fire(
                  "Error After Removing Category... Try Removing the category related Products"
                );
              }
            })
            .catch(function () {
              $scope.loader = false;
              Swal.fire(
                "Error While Removing Category... Try removing related products "
              );
            });
        }
      });
    };
  },
]);
