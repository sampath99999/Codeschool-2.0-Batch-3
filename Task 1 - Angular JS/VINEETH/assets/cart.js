myApp.controller('CartCtrl', function ($scope, $window,$http,$rootScope) {
    $scope.cartItems = JSON.parse($window.localStorage.getItem("cart")) || [];
    $scope.incrementQuantity = function (item) {
        item.quantity += 1;
        $scope.calculateTotalAmount();
        $window.localStorage.setItem("cart", JSON.stringify($scope.cartItems));
    };
    $scope.decrementQuantity = function (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
            $scope.calculateTotalAmount();
            $window.localStorage.setItem("cart", JSON.stringify($scope.cartItems));
        }
    };
    $scope.removeItem = function (item) {
        $rootScope.count = JSON.parse($window.localStorage.getItem('cart')).length-1; 
        console.log($rootScope.count)
        var index = $scope.cartItems.indexOf(item);
        if (index !== -1) {
            $scope.cartItems.splice(index, 1);
            $scope.calculateTotalAmount();
            $window.localStorage.setItem("cart", JSON.stringify($scope.cartItems));
             
        }     
    };
    $scope.calculateTotalAmount = function () {
        $scope.totalAmount = 0;
        for (var i = 0; i < $scope.cartItems.length; i++) {
            $scope.totalAmount += $scope.cartItems[i].price * $scope.cartItems[i].quantity;
        }
    };
    $scope.calculateTotalAmount();
    $scope.placeOrder = function () {
        var storedId = $window.localStorage.getItem('User_id');
        if (storedId !== null && storedId !== '0') {
            var cartItems = JSON.parse($window.localStorage.getItem("cart"));
            try{
                if (cartItems.length) {
                    $http.post('../api/orders.php', { user_id: storedId, cart: cartItems })
                        .then(function(response) {
                            console.log(response.data);
                            $window.alert('ORDER PLACED SUCCESSFULLY');
                            $state.go('cart')
                        })
                        // .catch(function(error) {
                        //     $window.alert('An error occurred while placing the order');
                        // });
                }
            }
            catch(e){
                $window.alert('YOUR CART IS EMPTY');
            }
        } else {
            $window.alert('YOU HAVE TO LOGIN FIRST');
        }
    };
});
