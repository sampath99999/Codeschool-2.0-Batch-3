app.controller("adminAddProductController", [
  "$scope",
  "$http",
  "$state",
  "WindowControlService",
  "GetUser",
  "AuthService",
  function ($scope, $http,$state, WindowControlService, GetUser, AuthService) {
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
    $scope.curPage = "Add Products";
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
    $scope.filesChanged = function (ele) {
      $scope.file = ele.files[0];
      $scope.$apply();
    };

    $scope.addProduct = function () {
      if ($scope.productForm.$valid) {
        $scope.loader = true;
        const formData = new FormData();
        formData.append("title", $scope.title);
        formData.append("price", $scope.price);
        formData.append("description", $scope.description);
        formData.append("category_id", $scope.selectCategory);
        formData.append("image", $scope.file);

        $http({
          method: "POST",
          url: "./api/adminAddProduct.php",
          data: formData,
          headers: {
            "Content-Type": undefined,
          },
          transformRequest: angular.identity,
        })
          .then(function (response) {
            $scope.loader = false;
            if (response.data.status) {
              Swal.fire("Added!","Product Added Successfully","success");
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Seems like product was not added... Try again",
              });
            }
          })
          .catch(function (response) {
            $scope.loader = false;
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Seems like product was not updated successfully... Try again",
            });
          });
      }
    };
  },
]);
