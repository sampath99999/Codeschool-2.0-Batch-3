inventoryManagementApp.controller("TransactionsCtrl", [
  "$scope",
  "$http",
  "$state",
  "getPartiesService",
  "getProductsService",
  "inwardTransactionService",
  "outwardTransactionService",
  "getProductsService",
  "getTransactionsService",
  function (
    $scope,
    $http,
    $state,
    getPartiesService,
    getProductsService,
    inwardTransactionService,
    outwardTransactionService,
    getProductsService,
    getTransactionsService
  ) {
    $scope.selectedTransactionType = "";
    $scope.transactionTypeErrMsg = "";
    $scope.selectedParty = "";
    $scope.quantity = "";
    $scope.filteredParties = [];
    $scope.productsArray = [];
    $scope.showSpinner = false;
    $scope.selectionDisabled = false;
    $scope.showSpinner = false;
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
    $scope.transactions = [
      { value: "Seller", field: "Inward" },
      { value: "Client", field: "Outward" },
    ];

    $scope.validateTransactionType = function () {
      $scope.transactionTypeErrMsg = "";

      if (!$scope.selectedTransactionType) {
        $scope.transactionTypeErrMsg = "*Select the Transaction Type";
        return false;
      }
      return true;
    };
    $scope.validateParty = function () {
      $scope.partyErrMsg = "";
      $scope.validateTransactionType();
      if (!$scope.selectedParty) {
        $scope.partyErrMsg = "*Select Party";
        return false;
      }

      return true;
    };
    $scope.alertTransaction = function () {
      if ($scope.selectedTransactionType === "") {
        Swal.fire("Transaction Type", "Select Transaction Type First", "info");
      }
    };
    $scope.validateProduct = function () {
      $scope.productErrMsg = "";
      $scope.validateTransactionType();
      if (!$scope.selectedProduct) {
        $scope.productErrMsg = "*Select Product";
        return false;
      }
      return true;
    };
    $scope.validateQuantity = function () {
      $scope.quantityErrMsg = "";
      if (typeof $scope.quantity === "string") {
        $scope.quantity = $scope.quantity.replace(/[^0-9]/g, "");
      }
      if (!$scope.quantity) {
        $scope.quantityErrMsg = "*Quantity Cannot be Empty";
        return false;
      }
      if (!$scope.quantity === 0) {
        $scope.quantityErrMsg = "*Quantity Should be Greater than Zero";
        return false;
      }

      return true;
    };

    $scope.showSpinner = true;
    getPartiesService
      .getParties()
      .then(function (data) {
        $scope.parties = data.data;
      })
      .finally(function () {
        $scope.showSpinner = false;
      });

    $scope.populateParties = function () {
      $scope.filteredParties = $scope.parties.filter(function (party) {
        return party.party_type === $scope.selectedTransactionType;
      });
      $scope.populateProducts();
    };

    getProductsService.getProducts().then(function (data) {
      $scope.products = data.data;
    });

    $scope.populateProducts = function () {
      if ($scope.selectedTransactionType === "Seller") {
        $scope.filteredProducts = $scope.products;
      } else if ($scope.selectedTransactionType === "Client") {
        $scope.filteredProducts = $scope.products.filter(function (product) {
          return product.stock > 0;
        });
      }
    };

    $scope.addProduct = function () {
      $scope.validateParty();
      $scope.validateProduct();
      $scope.validateQuantity();

      if (
        $scope.selectedTransactionType &&
        $scope.selectedParty &&
        $scope.quantity &&
        $scope.selectedProduct
      ) {
        var newProduct = {
          party: $scope.selectedParty,
          product_id: $scope.selectedProduct,
          quantity: $scope.quantity,
        };
        $scope.productsArray.push(newProduct);
        Swal.fire(
          "Product Added",
          "Submit After Adding All Products",
          "success"
        );
        if (!$scope.selectionDisabled) {
          $scope.selectionDisabled = true;
        }
      }
    };
    // Function to get product name by product_id
    $scope.getProductById = function (product_id) {
      if ($scope.products && $scope.products.length) {
        for (let i = 0; i < $scope.products.length; i++) {
          if ($scope.products[i].id == product_id) {
            return { name: $scope.products[i].product_name };
          }
        }
      }
      return { name: "Product Not Found" };
    };
    $scope.removeProduct = function (index) {
      $scope.productsArray.splice(index, 1);
    };

    $scope.submitTransaction = function () {
      if (!$scope.productsArray.length > 0) {
        Swal.fire(
          "Error",
          "Please Add At least One Product To Submit Transaction!",
          "error"
        );
        return false;
      }
      if ($scope.selectedTransactionType === "Seller") {
        var dataToSubmit = {
          party: $scope.selectedParty,
          products: $scope.productsArray,
          token: userId,
        };
        $scope.showSpinner = true;
        inwardTransactionService
          .inwardTransaction(dataToSubmit)
          .then(function (data) {
            if (!data.status) {
              Swal.fire("error", data.message, "warning");
              return false;
            }
            if (data.status) {
              Swal.fire("success", data.message, "success");
              $scope.displayProducts();
              // $scope.inwardTransaction();
            }
          })
          .finally(function () {
            $scope.selectedParty = "";
            $scope.productsArray = [];
            $scope.selectionDisabled = false;
            $scope.quantity = "";
            $scope.selectedProduct = "";
            $scope.selectedTransactionType = "";
            $scope.showSpinner = false;
          });
      } else if ($scope.selectedTransactionType === "Client") {
        var dataToSubmit = {
          party: $scope.selectedParty,
          products: $scope.productsArray,
          token: userId,
        };
        $scope.showSpinner = true;
        outwardTransactionService
          .outwardTransaction(dataToSubmit)
          .then(function (data) {
            if (!data.status) {
              Swal.fire("error", data.message, "warning");
              return false;
            }
            if (data.status) {
              Swal.fire("success", data.message, "success");
              $scope.displayProducts();
            }
          })
          .finally(function () {
            $scope.selectedParty = "";
            $scope.productsArray = [];
            $scope.selectionDisabled = false;
            $scope.quantity = "";
            $scope.selectedProduct = "";
            $scope.selectedTransactionType = "";
            $scope.showSpinner = false;
          });
      }
    };
    $scope.displayProducts = function () {
      $scope.showSpinner = true;
      getProductsService
        .getProducts()
        .then(function (data) {
          $scope.inventoryToDisplay = data.data;
        })
        .finally(function () {
          $scope.showSpinner = false;
        });
    };
    $scope.displayProducts();

    $scope.showSpinner = true;
    getTransactionsService
      .getTransactions()
      .then(function (data) {
        if (data.status) {
          $scope.transactionDetails = data.data;
        }
        // console.log(data);
      })
      .finally(function () {
        $scope.showSpinner = false;
      });
    // $scope.inwardTransaction = function () {
    //   for (var i = 0; i < $scope.productsArray.length; i++) {
    //     var product = $scope.productsArray[i];
    //     var inventoryItem = $scope.inventoryToDisplay.find(
    //       (item) => item.id == product.product_id
    //     );
    //     console.log(inventoryItem);
    //     if (inventoryItem) {
    //       var productStock = Number(product.stock);
    //       var inventoryStock = Number(inventoryItem.stock);

    //       if (!isNaN(productStock) && !isNaN(inventoryStock)) {
    //         inventoryItem.stock += productStock;
    //       }
    //     }
    //   }
    // };
  },
]);
