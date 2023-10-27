inventoryManagementApp.controller("AddProductsCtrl", [
  "$scope",
  "addProductService",
  "getProductsService",
  "$state",
  "$http",

  function ($scope, addProductService, getProductsService, $state, $http) {
    $scope.productName = "";
    $scope.categories = [
      "Electronics",
      "Mobiles",
      "Laptops",
      "Home and Decor",
      "Others",
    ];
    $scope.selectedCategory = "";
    $scope.productNameErrMsg = "";
    $scope.categoryErrMsg = "";
    $scope.productPriceErrMsg = "";
    $scope.productDetails = "";
    $scope.showSpinner = false;
    $scope.partyName = "";
    $scope.partyType = ["Client", "Seller"];
    $scope.selectedPartyType = "";
    $scope.partyNameErrMsg = "";
    $scope.partyTypeErrMsg = "";

    $scope.loadPartyDetails = false;
    $scope.loadPartyDetailsPromise = null;

    var userId = localStorage.getItem("token");
    if (!userId) {
      $state.go("login");
    }
    $scope.logout = function () {
      $http
        .post("./api/logout.php", { token: userId })
        .then(function (response) {
          if (response.data.status) {
            localStorage.removeItem("token");
            alert(response.data.message);
            $state.go("login");
          }
        });
    };
    $scope.validateProductName = function () {
      $scope.productNameErrMsg = "";

      if (!$scope.productName) {
        $scope.productNameErrMsg = "*Please Enter Product Name";
        return false;
      }
      return true;
    };

    $scope.validateProductPrice = function () {
      $scope.productPriceErrMsg = "";
      if (typeof $scope.productPrice === "string") {
        $scope.productPrice = $scope.productPrice.replace(/[^0-9]/g, "");
      }
      if (!$scope.productPrice) {
        $scope.productPriceErrMsg = "*Enter Product Price";
        return false;
      }
      return true;
    };
    $scope.validateCategory = function () {
      $scope.categoryErrMsg = "";

      if (!$scope.selectedCategory) {
        $scope.categoryErrMsg = "*Select Category";
        return false;
      }
      return true;
    };

    $scope.addProduct = function () {
      $scope.validateProductName();
      $scope.validateCategory();
      $scope.validateProductPrice();
      if (
        $scope.validateProductName() &&
        $scope.validateCategory() &&
        $scope.validateProductPrice()
      ) {
        let productDetails = {
          productName: $scope.productName,
          productCategory: $scope.selectedCategory,
          productPrice: $scope.productPrice,
        };
        $scope.showSpinner = true;
        addProductService
          .addProduct(productDetails)
          .then(function (data) {
            if (!data.status) {
              Swal.fire(data.message);
              return false;
            }
            $scope.productDetails.push({
              product_name: $scope.productName,
              product_price: $scope.productPrice,
              product_category: $scope.selectedCategory,
            });
            $scope.productName = "";
            $scope.selectedCategory = "";
            $scope.productPrice = "";
            Swal.fire(data.message);
          })
          .finally(function () {
            $scope.showSpinner = false;
          });
      }
    };

    $scope.getProducts = function () {
      $scope.showSpinner = true;
      getProductsService
        .getProducts()
        .then(function (data) {
          if (data.status) {
            $scope.productDetails = data.data;
          }
        })
        .finally(function () {
          $scope.showSpinner = false;
        });
    };

    $scope.getProducts();
  },
]);
