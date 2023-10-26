app.controller(
  "productCtrl",
  function ($scope, $state, $rootScope, $http, $cookies) {
    $scope.productDetails = {};
    const { productId } = $state.params;
    $scope.quantity = 0;
    $scope.userId = "";
    $scope.address = "Login to access address";
    const token = $cookies.get("token");
    if (token) {
      $http
        .get(`./api/getProductDetails.php/${productId}`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requires-Token": true,
          },
        })
        .then(
          (response) => {
            if (response.data.status === true) {
              $scope.productDetails = response.data.data[0];
              $scope.address = response.data.address.address;
              $scope.userId = response.data.address.id;
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
    } else {
      $http
        .get(`./api/getProductDetails.php/${productId}`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requires-Token": false,
          },
        })
        .then(
          (response) => {
            if (response.data.status === true) {
              $scope.productDetails = response.data.data[0];
              $scope.address = "Login to access your address";
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

    $scope.setQuantity = (type) => {
      if (type === "+") {
        $scope.quantity =
          $scope.quantity >= 0 ? $scope.quantity + 1 : $scope.quantity;
        return;
      }
      if (type === "-") {
        $scope.quantity =
          $scope.quantity > 0 ? $scope.quantity - 1 : $scope.quantity;
        return;
      }
    };

    function addItem(data) {
      let userCart = JSON.parse(localStorage.getItem("userCart"));

      if (!userCart[$scope.userId]) {
        userCart[$scope.userId] = [];
      }

      const existingProduct = userCart[$scope.userId].find(
        (product) => product.id === productId
      );

      if (existingProduct) {
        existingProduct.quantity += $scope.quantity;
      } else {
        userCart[$scope.userId].push({
          id: productId,
          image: data.product_link,
          quantity: $scope.quantity,
          price: data.current_price,
          name: data.name,
        });
      }

      localStorage.setItem("userCart", JSON.stringify(userCart));
    }

    $scope.cart = function (data) {
      if (!token) {
        alert("Kindly login to add items to cart");
        $state.go("login");
      }
      if (localStorage.getItem("userCart")) {
        $scope.quantity > 0 ? addItem(data) : null;
      } else {
        const initialCart = {};
        localStorage.setItem("userCart", JSON.stringify(initialCart));
        if ($scope.quantity > 0 && $scope.userId !== "") {
          addItem(data);
        }
      }
    };
  }
);
