app.controller("adminProductsController", [
  "$scope",
  "$http",
  "$state",
  "GetProductsService",
  "WindowControlService",
  "GetUser",
  "AuthService",
  function (
    $scope,
    $http,
    $state,
    GetProductsService,
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
    $scope.curPage = "Products";
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
    $scope.products = [];
    const editingProduct = [];
    $scope.editingProductImage = [];
    $scope.editingProductImageName = [];
    const getData = () => {
      GetProductsService.getProducts().then(function (response) {
        $scope.products = response.data;
        $scope.loader = false;
        loadCategories();
      });
    };
    getData();
    function loadCategories() {
      $http
        .get("./api/getCategories.php")
        .then(function (res) {
          $scope.categories = res.data;
        })
        .catch(function (error) {
          console.error("Failed to fetch categories: " + error);
        });
    }

    $scope.cancelEdit = function (product, index) {
      $scope.products[index] = angular.copy(editingProduct[index]);
      product.imageName = "";
      product.editing = false;
    };
    $scope.toggleEdit = function (product, index) {
      if (product.editing) {
        $scope.saveProduct(product, index);
      }
      editingProduct[index] = angular.copy(product);
      product.editing = !product.editing;
    };

    $scope.saveProduct = function (product, index) {
      $scope.loader = true;
      product.category_id = getCategoryNameById(product.name);
      product.price = parseInt(product.price, 10);
      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("price", product.price);
      formData.append("description", product.description);
      formData.append("category_id", product.category_id);
      formData.append("image", $scope.editingProductImage[index]);
      formData.append("id", product.id);

      $http({
        method: "POST",
        url: "./api/adminEditProducts.php",
        data: formData,
        headers: {
          "Content-Type": undefined,
        },
        transformRequest: angular.identity,
      })
        .then(function (response) {
          $scope.loader = false;
          if (response.data.status) {
            $scope.products[index].image =
              response.data.data != ""
                ? response.data.data
                : $scope.products[index].image;
            Swal.fire("Updated!", "Successfully Updated Product", "success");
          } else {
            $scope.products[index] = angular.copy(editingProduct[index]);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Seems like product was not updated successfully... Try again",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    $scope.removeProduct = function (product_id, index) {
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
            url: "./api/adminRemoveProduct.php",
            data: product_id,
            headers: { "Content-Type": "application/json" },
          })
            .then(function (response) {
              if (response.data.status === true) {
                Swal.fire("Deleted!", "Product has been deleted.", "success");
                $scope.products.splice(index, 1);
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Please Fulfill all the previous orders related to this Product to remove it",
                });
              }
            })
            .catch(function () {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Fulfill all the previous orders related to this Product to remove it",
              });
            });
        }
      });
    };
    $scope.replaceImage = function (index) {
      new Swal({
        title: "Select a file",
        showCancelButton: true,
        confirmButtonText: "Upload",
        input: "file",
      }).then(function (file) {
        if (file.isConfirmed) {
          $scope.editingProductImage[index] = file.value;
          $scope.$apply(function () {
            $scope.products[index].image = file.value.name;
          });
          Swal.fire("Please Save the changes");
        } else {
          Swal.fire("You did not Choose any file");
        }
      });
    };
    function getCategoryNameById(categoryName) {
      for (let i = 0; i < $scope.categories.length; i++) {
        if ($scope.categories[i].name === categoryName) {
          return $scope.categories[i].id;
        }
      }
      return "";
    }
  },
]);
