app.controller(
  "orderCtrl",
  function ($scope, $rootScope, $cookies, $state, $http) {
    const token = $cookies.get("token");
    if (token) {
      $rootScope.loginStatus = true;
    }

    if (!token) {
      alert("Login to access cart Items");
      $state.go("login");
    }

    $scope.orders = [];
    $scope.orderDetails = [];

    $http
      .get("./api/viewOrder.php", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Requires-Token": true,
        },
      })
      .then(
        (response) => {
          if (response.data.status === true) {
            $scope.orders = response.data.data;
          } else {
            console.log(response);
          }
        },
        (error) => {
          console.log(error);
        }
      );

    $scope.viewMore = function (id) {
      $http
        .get(`./api/getOrderDetails.php/${id}`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requires-Token": true,
          },
        })
        .then(
          (response) => {
            if (response.data.status === true) {
              $scope.orderDetails = response.data.data;
              console.log(response);
            } else {
              console.log(response);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    };
  }
);
