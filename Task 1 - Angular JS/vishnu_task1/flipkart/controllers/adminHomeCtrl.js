app.controller(
  "adminHomeCtrl",
  function ($rootScope, $scope, $http, swalService) {
    $scope.productId = "";
    $scope.editMode = false;
    $rootScope.adminPortalVisible = false;
    $scope.productData = {};
    ($scope.name = ""), ($scope.price = ""), ($scope.offer = "");
    $rootScope.loginStatus = true;

    console.log($scope.loginStatus);

    $scope.search = function () {
      const product = $scope.productId;
      $http
        .get(`./api/getProductInfo.php/${product}`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requires-Token": false,
          },
        })
        .then(
          (response) => {
            if (response.data.status === true) {
              $scope.productData = response.data.data[0];
              $scope.name = $scope.productData.name;
              $scope.price = $scope.productData.price;
              $scope.offer = $scope.productData.offer;
            } else {
              console.log(response);
              clearData();
            }
          },
          (error) => {
            console.log(error);
            clearData();
          }
        )
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          $rootScope.showLoader = false;
        });

      $scope.edit = function () {
        $scope.editMode = true;
      };

      $scope.close = function () {
        $scope.editMode = false;
      };

      function clearData() {
        console.log("entered");
        $scope.productData = {};
        $scope.name = "";
        $scope.price = "";
        $scope.offer = "";
      }

      $scope.update = function () {
        const data = {
          name: $scope.name,
          price: $scope.price,
          offer: $scope.offer,
          id: product,
        };
        const ulrEncodedUserData = jQuery.param(data);
        $http
          .post("./api/updateProduct.php", ulrEncodedUserData, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "X-Requires-Token": true,
            },
          })
          .then(
            (response) => {
              if (response.data.status === true) {
                console.log(response);
                swalService.showAlert(
                  "Success",
                  "Updated Successfully",
                  "success"
                );
              } else {
                console.log(response);
                clearData();
              }
            },
            (error) => {
              clearData();
            }
          );
      };
    };
  }
);
