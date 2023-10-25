app.controller("adminOrdersController", [
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
    $scope.curPage = "Orders";
    $scope.loader = true;
    $scope.width = "me-3 size-half";
    $scope.size = WindowControlService.getValue();
    $scope.orderStatusOptions = [
      "Pending",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];
    $scope.$watch(
      function () {
        return WindowControlService.getValue();
      },
      function (newVal, oldVal) {
        $scope.width = $scope.width == "me-3 size-half" ? "" : "me-3 size-half";
      }
    );

    $scope.editStatus = function (order) {
      order.editingStatus = !order.editingStatus;
      if (order.editingStatus) {
        order.originalStatus = order.order_status;
      }
    };

    $scope.saveStatus = function (order) {
      order.editingStatus = false;
      $http({
        method: "POST",
        url: "./api/adminEditOrderStatus.php",
        data: { order_id: order.id, order_status: order.order_status },
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          if (response.data.status) {
            Swal.fire("Successfully Updated Order Status");
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Seems like order was not updated successfully... Try again",
            });
          }
        })
        .catch(function (error) {
          order.order_status = order.originalStatus;
        });
    };

    $http({
      method: "GET",
      url: "./api/adminGetOrders.php",
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        data = response.data;
        if (data.status) {
          $scope.orders = data.data;
          $scope.loader = false;
        } else {
          $scope.loader = false;
        }
      })
      .catch(function (response) {
        $scope.loader = false;
        console.error(response);
      });
    $scope.removeOrder = function (order_id, index) {
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
            url: "./api/adminRemoveOrder.php",
            data: order_id,
            headers: { "Content-Type": "application/json" },
          }).then(function (response) {
            if (response.data.status === true) {
              Swal.fire("Deleted!", "Order has been deleted.", "success");
              $scope.orders.splice(index, 1);
            }
          });
        }
      });
    };
  },
]);
