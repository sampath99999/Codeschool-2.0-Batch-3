app.controller(
  "cartCtrl",
  function (
    $scope,
    $http,
    $rootScope,
    swalService,
    $cookies,
    $state,
    $cookies
  ) {
    const token = $cookies.get("token");
    if (token) {
      $rootScope.loginStatus = true;
    }

    if (!token) {
      alert("Login to access cart Items");
      $state.go("login");
    }

    function getCardNumberValidation(cardNumber) {
      if (!/^\d{12}$/.test(cardNumber)) {
        return false;
      }
      return true;
    }

    function getCvvValidation(cvv) {
      if (!/^\d{3}$/.test(cvv)) {
        return false;
      }
      return true;
    }

    function getcardDatevalidation(cardDate) {
      if (cardDate === "") {
        return false;
      }
      const [year, month] = cardDate.split("-");
      if (
        !(new Date().getFullYear() <= year && new Date().getMonth() + 1 < month)
      ) {
        return false;
      }
      return true;
    }

    function getTotalPrice() {
      const total = $scope.cartItems.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
      return total;
    }

    function setAndUpdateCartState() {
      $scope.cart = JSON.parse(localStorage.getItem("userCart"));
      $scope.cartItems = $scope.cart !== null ? $scope.cart[$scope.userId] : [];
      $scope.cartLength =
        $scope.cartItems == undefined ? 0 : $scope.cartItems.length;
      $scope.totalPrice = $scope.cartLength !== 0 ? getTotalPrice() : 0;
    }

    $scope.cartItems = [];
    $scope.userId = 0;
    $scope.totalPrice = 0;
    $scope.paymentMode = "";
    setAndUpdateCartState();
    $scope.openPaymentPortal = "null";
    $scope.totalPrice = $scope.cartLength !== 0 ? getTotalPrice() : 0;
    $scope.deliveryFee = 50;
    $scope.paymentModes = [];
    $scope.selectedPaymentType = 0;
    $scope.address = "";

    $scope.changePaymentMode = function (paymentModeId) {
      $scope.selectedPaymentType = paymentModeId;
    };

    $scope.confirmOrder = function () {
      const userCart = { orderDetails: $scope.cartItems };
      const ulrEncodedUserData = jQuery.param(userCart);
      $http
        .post("./api/createOrder.php", ulrEncodedUserData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requires-Token": true,
          },
        })
        .then(
          (response) => {
            if (response.data.status === true) {
              $("#exampleModal").modal("hide");

              swalService.showAlert(
                "Success",
                "Order Placed Successfully",
                "success"
              );
              $scope.cart[$scope.userId] = null;
              localStorage.setItem("userCart", JSON.stringify($scope.cart));
              setAndUpdateCartState();
            } else {
              console.log(response);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    };

    $scope.confirmPayment = function () {
      if ($scope.selectedPaymentType === 0) {
        alert("Choose one of the payment mode below");
        return;
      }

      if ($scope.selectedPaymentType === 3) {
        if (
          getCardNumberValidation(
            document.getElementById("cardNumber").value
          ) &&
          getCvvValidation(document.getElementById("cvv").value) &&
          getcardDatevalidation(document.getElementById("cardDate").value)
        ) {
          $scope.confirmOrder();
        } else {
          alert("Give Right Credentials");
        }
      } else {
        $scope.confirmOrder();
      }
    };

    $scope.increaseQuantity = function (productId) {
      const product = $scope.cartItems.find(
        (product) => parseInt(product.id) == productId
      );
      product.quantity += 1;
      $scope.totalPrice = getTotalPrice();
      localStorage.setItem("userCart", JSON.stringify($scope.cart));
    };
    $scope.decreaseQuantity = function (productId) {
      const product = $scope.cartItems.find(
        (product) => parseInt(product.id) == productId
      );
      product.quantity -= 1;
      $scope.totalPrice = getTotalPrice();
      product.quantity != 0
        ? localStorage.setItem("userCart", JSON.stringify($scope.cart))
        : $scope.removeItem(productId);
    };

    $scope.removeItem = function (productId) {
      $scope.cartItems = $scope.cartItems.filter(
        (product) => parseInt(product.id) != productId
      );
      $scope.totalPrice = getTotalPrice();
      $scope.cart[$scope.userId] = $scope.cartItems;
      $scope.cartLength = $scope.cartItems.length;
      localStorage.setItem("userCart", JSON.stringify($scope.cart));
    };

    $http
      .get("./api/getPaymentAndCartDetails.php/", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Requires-Token": true,
        },
      })
      .then(
        (response) => {
          if (response.data.status === true) {
            $scope.paymentModes = response.data.data;
            $scope.address = response.data.address.address;
            $scope.userId = response.data.address.id;
            setAndUpdateCartState();
          } else {
            console.log(response);
          }
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        $rootScope.showLoader = false;
      });
  }
);
